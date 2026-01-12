import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const toolsDir = path.join(process.cwd(), 'public/images/tools');

async function processImages() {
    if (!fs.existsSync(toolsDir)) {
        console.error(`Directory not found: ${toolsDir}`);
        return;
    }

    const files = fs.readdirSync(toolsDir);

    console.log(`Found ${files.length} files in ${toolsDir}`);

    for (const file of files) {
        // Skip system files
        if (file.startsWith('.')) continue;

        const filePath = path.join(toolsDir, file);
        const { name, ext } = path.parse(file);

        if (!['.png', '.jpg', '.jpeg', '.webp', '.gif'].includes(ext.toLowerCase())) {
            continue;
        }

        try {
            const outputPath = path.join(toolsDir, `${name}.webp`);

            const buffer = await sharp(filePath)
                .resize({
                    width: 1024,
                    withoutEnlargement: true,
                    fit: 'contain',
                })
                .webp({ nearLossless: true })
                .toBuffer();

            // Write the new file
            fs.writeFileSync(outputPath, buffer);
            console.log(`Converted/Resized: ${file} -> ${name}.webp`);

            // If the original was not webp, delete it
            if (ext.toLowerCase() !== '.webp') {
                fs.unlinkSync(filePath);
                console.log(`Deleted original: ${file}`);
            }
        } catch (error) {
            console.error(`Error processing ${file}:`, error);
        }
    }
}

processImages().catch(console.error);
