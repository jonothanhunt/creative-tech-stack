import { neon } from '@neondatabase/serverless';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function migrate() {
    // Drop old tables if exist
    await sql`DROP TABLE IF EXISTS links CASCADE`;
    await sql`DROP TABLE IF EXISTS items CASCADE`;
    await sql`DROP TABLE IF EXISTS item_categories CASCADE`;
    await sql`DROP TABLE IF EXISTS item_stacks CASCADE`;
    await sql`DROP TABLE IF EXISTS subcategories CASCADE`;
    await sql`DROP TABLE IF EXISTS categories CASCADE`;
    await sql`DROP TABLE IF EXISTS types CASCADE`;
    await sql`DROP TABLE IF EXISTS stacks CASCADE`;

    // Create new tables
    await sql`
        CREATE TABLE categories (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL UNIQUE
        );
    `;

    await sql`
        CREATE TABLE types (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL UNIQUE
        );
    `;

    await sql`
        CREATE TABLE stacks (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL UNIQUE
        );
    `;

    await sql`
        CREATE TABLE items (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT,
            image_url TEXT,
            type_id INTEGER REFERENCES types(id)
        );
    `;

    await sql`
        CREATE TABLE item_categories (
            item_id INTEGER REFERENCES items(id),
            category_id INTEGER REFERENCES categories(id),
            PRIMARY KEY (item_id, category_id)
        );
    `;

    await sql`
        CREATE TABLE item_stacks (
            item_id INTEGER REFERENCES items(id),
            stack_id INTEGER REFERENCES stacks(id),
            PRIMARY KEY (item_id, stack_id)
        );
    `;

    await sql`
        CREATE TABLE links (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            url TEXT NOT NULL,
            item_id INTEGER REFERENCES items(id)
        );
    `;

    // Insert types
    await sql`INSERT INTO types (name) VALUES ('Tool'), ('Resource')`;

    // Insert some default stacks
    await sql`INSERT INTO stacks (name) VALUES ('webAR'), ('native AR'), ('vector design'), ('raster design')`;

    // Load data
    const dataPath = path.join(process.cwd(), 'app', 'data.archive', 'data.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    // Insert data
    for (const category of data) {
        const [catResult] = await sql`
            INSERT INTO categories (name) VALUES (${category.name})
            ON CONFLICT (name) DO NOTHING
            RETURNING id;
        `;
        let catId;
        if (catResult) {
            catId = catResult.id;
        } else {
            const [existing] = await sql`SELECT id FROM categories WHERE name = ${category.name}`;
            catId = existing.id;
        }

        for (const subcategory of category.subcategories) {
            // Map subcategory name to type
            const typeName = subcategory.name === 'Tools' ? 'Tool' : 'Resource';
            const [typeResult] = await sql`SELECT id FROM types WHERE name = ${typeName}`;
            const typeId = typeResult.id;

            for (const item of subcategory.items) {
                const [itemResult] = await sql`
                    INSERT INTO items (name, description, image_url, type_id)
                    VALUES (${item.name}, ${item.description}, ${item.image}, ${typeId})
                    RETURNING id;
                `;
                const itemId = itemResult.id;

                // Link to category
                await sql`INSERT INTO item_categories (item_id, category_id) VALUES (${itemId}, ${catId})`;

                for (const link of item.links) {
                    await sql`
                        INSERT INTO links (title, url, item_id)
                        VALUES (${link.title}, ${link.url}, ${itemId});
                    `;
                }
            }
        }
    }

    console.log('Migration completed');
}

migrate().catch(console.error);