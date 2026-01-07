import fs from 'fs';
import path from 'path';
import { items } from '../app/data/items.ts';
// We need to fetch and save images
import https from 'https';
import crypto from 'crypto';

// Setup directories
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'item-images');

if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

function slugify(text: string) {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-')   // Replace multiple - with single -
        .replace(/^-+/, '')       // Trim - from start of text
        .replace(/-+$/, '');      // Trim - from end of text
}

async function fetchOgImage(url) {
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36'
            }
        });
        const html = await response.text();
        const match = html.match(/<meta property="og:image" content="([^"]+)"/i) ||
            html.match(/<meta name="twitter:image" content="([^"]+)"/i);

        if (match && match[1]) {
            let imageUrl = match[1];
            // Handle relative URLs
            if (imageUrl.startsWith('/')) {
                const urlObj = new URL(url);
                imageUrl = `${urlObj.protocol}//${urlObj.host}${imageUrl}`;
            }
            // Handle HTML entities
            imageUrl = imageUrl.replace(/&amp;/g, '&');
            return imageUrl;
        }
        return null;
    } catch (error) {
        console.error(`Error fetching metadata from ${url}:`, error.message);
        return null;
    }
}

async function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                const file = fs.createWriteStream(filepath);
                res.pipe(file);
                file.on('finish', () => {
                    file.close(resolve);
                });
            } else if (res.statusCode === 301 || res.statusCode === 302) {
                // simple redirect handling
                if (res.headers.location) {
                    downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
                } else {
                    reject(new Error(`Redirect with no location header`));
                }
            } else {
                reject(new Error(`StatusCode: ${res.statusCode}`));
            }
        }).on('error', (err) => {
            reject(err);
        });
    });
}

function getExtension(url) {
    const ext = path.extname(url).split('?')[0];
    if (ext && (ext === '.jpg' || ext === '.png' || ext === '.jpeg' || ext === '.webp' || ext === '.gif')) {
        return ext;
    }
    return '.jpg'; // default fallback
}

async function main() {
    const updatedItems = [];

    console.log('Starting image synchronization (rename mode)...');

    for (const item of items) {
        // We explicitly do NOT check if it already has an image, because we want to rename them.
        // But we can check if it already has the CORRECT image path.

        const slug = slugify(item.name);
        const expectedPrefix = `/item-images/${slug}`;

        if (item.image && item.image.startsWith(expectedPrefix)) {
            console.log(`Skipping ${item.name} - already correct.`);
            updatedItems.push(item);
            continue;
        }

        const url = item.links[0]?.url;
        if (!url) {
            updatedItems.push(item);
            continue;
        }

        console.log(`Processing ${item.name}...`);

        // 1. Find the OG Image URL
        const ogImageUrl = await fetchOgImage(url);

        if (ogImageUrl) {
            // 2. Determine filename
            const ext = getExtension(ogImageUrl);
            // Use slug for filenames: "three-js.png", "react-three-fiber.png"
            const filename = `${slug}${ext}`;
            const filepath = path.join(IMAGES_DIR, filename);
            const publicPath = `/item-images/${filename}`;

            try {
                // Check if file already exists locally to save bandwidth
                if (fs.existsSync(filepath)) {
                    console.log(`  Using existing local file -> ${publicPath}`);
                    updatedItems.push({ ...item, image: publicPath });
                    continue;
                }

                // 3. Download the image
                console.log(`  Downloading ${ogImageUrl} -> ${publicPath}`);
                await downloadImage(ogImageUrl, filepath);

                // 4. Update item record
                updatedItems.push({ ...item, image: publicPath });
            } catch (err) {
                console.error(`  Failed to download image: ${err.message}`);
                // Keep the old one if download failed
                updatedItems.push(item);
            }
        } else {
            console.log(`  No OG image found.`);
            // Strip the old ID-based image if it exists? Or keep it?
            // User requested "keep gradients as backup" implicitly if no image found.
            // If we previously found an image (ID-based) but now fail (e.g. network glitch), 
            // should we keep the ID-based one?
            // Let's safe-keep the existing image if we can't find a new one, just in case.
            updatedItems.push(item);
        }
    }

    // Write the updated items.ts file
    const fileContent = `import { ItemWithId } from "@/lib/db";

export const items: ItemWithId[] = ${JSON.stringify(updatedItems, null, 4)};
`;

    fs.writeFileSync(path.join(process.cwd(), 'app/data/items.ts'), fileContent);
    console.log('Done! Updated app/data/items.ts');
}

main();
