import dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function cleanPlaceholders() {
    const blobPrefix = 'https://gks4b3xeraclzmtf.public.blob.vercel-storage.com/';

    // Get ids of items to delete
    const itemsToDelete = await sql`
        SELECT id FROM items WHERE image_url NOT LIKE ${blobPrefix + '%'}
    `;

    for (const item of itemsToDelete) {
        console.log(`Deleting item ${item.id}`);
        await sql`DELETE FROM links WHERE item_id = ${item.id}`;
        await sql`DELETE FROM item_categories WHERE item_id = ${item.id}`;
        await sql`DELETE FROM item_stacks WHERE item_id = ${item.id}`;
        await sql`DELETE FROM items WHERE id = ${item.id}`;
    }

    console.log('Cleanup complete.');
}

cleanPlaceholders().catch(console.error);