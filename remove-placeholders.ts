import dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);

async function removePlaceholders() {
    await sql`UPDATE items SET image_url = NULL WHERE image_url LIKE 'https://www.google.com/search?q=https://placehold.co/%'`;
    console.log('Placeholder images removed from items.');
}

removePlaceholders().catch(console.error);