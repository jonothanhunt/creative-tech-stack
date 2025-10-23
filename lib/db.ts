import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export interface Link {
    title: string;
    url: string;
}

export interface Item {
    name: string;
    description: string;
    image: string;
    links: Link[];
}

export interface Subcategory {
    name: string;
    items: Item[];
}

export interface Category {
    name: string;
    subcategories: Subcategory[];
}

export async function getCategories(): Promise<Category[]> {
    const categories = await sql`
        SELECT c.name as category_name, s.name as subcategory_name, i.name as item_name, i.description, i.image_url, l.title, l.url
        FROM categories c
        LEFT JOIN subcategories s ON c.id = s.category_id
        LEFT JOIN items i ON s.id = i.subcategory_id
        LEFT JOIN links l ON i.id = l.item_id
        ORDER BY c.id, s.id, i.id, l.id
    `;

    const result: Category[] = [];
    const categoryMap = new Map<string, Category>();
    const subcategoryMap = new Map<string, Subcategory>();
    const itemMap = new Map<string, Item>();

    for (const row of categories) {
        let category = categoryMap.get(row.category_name);
        if (!category) {
            category = { name: row.category_name, subcategories: [] };
            categoryMap.set(row.category_name, category);
            result.push(category);
        }

        if (row.subcategory_name) {
            let subcategory = subcategoryMap.get(`${row.category_name}-${row.subcategory_name}`);
            if (!subcategory) {
                subcategory = { name: row.subcategory_name, items: [] };
                subcategoryMap.set(`${row.category_name}-${row.subcategory_name}`, subcategory);
                category.subcategories.push(subcategory);
            }

            if (row.item_name) {
                let item = itemMap.get(`${row.category_name}-${row.subcategory_name}-${row.item_name}`);
                if (!item) {
                    item = { name: row.item_name, description: row.description, image: row.image_url, links: [] };
                    itemMap.set(`${row.category_name}-${row.subcategory_name}-${row.item_name}`, item);
                    subcategory.items.push(item);
                }

                if (row.title && row.url) {
                    item.links.push({ title: row.title, url: row.url });
                }
            }
        }
    }

    return result;
}

export interface ItemWithId extends Item {
    id: number;
    type: string;
    categories: string[];
    stacks: string[];
}

export async function getAllItems(): Promise<ItemWithId[]> {
    const items = await sql`
        SELECT i.id, i.name, i.description, i.image_url, t.name as type_name
        FROM items i
        JOIN types t ON i.type_id = t.id
        ORDER BY i.id
    `;

    const itemCategories = await sql`
        SELECT ic.item_id, c.name as category_name
        FROM item_categories ic
        JOIN categories c ON ic.category_id = c.id
        ORDER BY ic.item_id
    `;

    const itemStacks = await sql`
        SELECT ist.item_id, s.name as stack_name
        FROM item_stacks ist
        JOIN stacks s ON ist.stack_id = s.id
        ORDER BY ist.item_id
    `;

    const links = await sql`
        SELECT l.item_id, l.title, l.url
        FROM links l
        ORDER BY l.item_id, l.id
    `;

    const categoriesMap = new Map<number, string[]>();
    for (const row of itemCategories) {
        if (!categoriesMap.has(row.item_id)) {
            categoriesMap.set(row.item_id, []);
        }
        categoriesMap.get(row.item_id)!.push(row.category_name);
    }

    const stacksMap = new Map<number, string[]>();
    for (const row of itemStacks) {
        if (!stacksMap.has(row.item_id)) {
            stacksMap.set(row.item_id, []);
        }
        stacksMap.get(row.item_id)!.push(row.stack_name);
    }

    const linksMap = new Map<number, Link[]>();
    for (const link of links) {
        if (!linksMap.has(link.item_id)) {
            linksMap.set(link.item_id, []);
        }
        linksMap.get(link.item_id)!.push({ title: link.title, url: link.url });
    }

    return items.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        image: item.image_url,
        type: item.type_name,
        categories: categoriesMap.get(item.id) || [],
        stacks: stacksMap.get(item.id) || [],
        links: linksMap.get(item.id) || [],
    }));
}

export async function getFilters() {
    const categories = await sql`SELECT name FROM categories ORDER BY name`;
    const types = await sql`SELECT name FROM types ORDER BY name`;
    const stacks = await sql`SELECT name FROM stacks ORDER BY name`;

    return {
        categories: categories.map(c => c.name),
        types: types.map(t => t.name),
        stacks: stacks.map(s => s.name),
    };
}

export async function updateItem(id: number, name: string, description: string, imageUrl: string, type: string, categories: string[], stacks: string[], links: Link[]) {
    // Get type_id
    const [typeResult] = await sql`SELECT id FROM types WHERE name = ${type}`;
    const typeId = typeResult.id;

    await sql`UPDATE items SET name = ${name}, description = ${description}, image_url = ${imageUrl}, type_id = ${typeId} WHERE id = ${id}`;

    // Update categories
    await sql`DELETE FROM item_categories WHERE item_id = ${id}`;
    for (const catName of categories) {
        const [catResult] = await sql`SELECT id FROM categories WHERE name = ${catName}`;
        let catId = catResult?.id;
        if (!catId) {
            // Insert new category
            const [newCat] = await sql`INSERT INTO categories (name) VALUES (${catName}) RETURNING id`;
            catId = newCat.id;
        }
        await sql`INSERT INTO item_categories (item_id, category_id) VALUES (${id}, ${catId})`;
    }

    // Update stacks
    await sql`DELETE FROM item_stacks WHERE item_id = ${id}`;
    for (const stackName of stacks) {
        const [stackResult] = await sql`SELECT id FROM stacks WHERE name = ${stackName}`;
        let stackId = stackResult?.id;
        if (!stackId) {
            // Insert new stack
            const [newStack] = await sql`INSERT INTO stacks (name) VALUES (${stackName}) RETURNING id`;
            stackId = newStack.id;
        }
        await sql`INSERT INTO item_stacks (item_id, stack_id) VALUES (${id}, ${stackId})`;
    }

    // Update links
    await sql`DELETE FROM links WHERE item_id = ${id}`;
    for (const link of links) {
        await sql`INSERT INTO links (item_id, title, url) VALUES (${id}, ${link.title}, ${link.url})`;
    }
}

export async function insertItem(name: string, description: string, imageUrl: string, type: string, categories: string[], stacks: string[], links: Link[]) {
    // Get type_id
    const [typeResult] = await sql`SELECT id FROM types WHERE name = ${type}`;
    const typeId = typeResult.id;

    const [itemResult] = await sql`INSERT INTO items (name, description, image_url, type_id) VALUES (${name}, ${description}, ${imageUrl}, ${typeId}) RETURNING id`;
    const itemId = itemResult.id;

    // Insert categories
    for (const catName of categories) {
        const [catResult] = await sql`SELECT id FROM categories WHERE name = ${catName}`;
        let catId = catResult?.id;
        if (!catId) {
            const [newCat] = await sql`INSERT INTO categories (name) VALUES (${catName}) RETURNING id`;
            catId = newCat.id;
        }
        await sql`INSERT INTO item_categories (item_id, category_id) VALUES (${itemId}, ${catId})`;
    }

    // Insert stacks
    for (const stackName of stacks) {
        const [stackResult] = await sql`SELECT id FROM stacks WHERE name = ${stackName}`;
        let stackId = stackResult?.id;
        if (!stackId) {
            const [newStack] = await sql`INSERT INTO stacks (name) VALUES (${stackName}) RETURNING id`;
            stackId = newStack.id;
        }
        await sql`INSERT INTO item_stacks (item_id, stack_id) VALUES (${itemId}, ${stackId})`;
    }

    // Insert links
    for (const link of links) {
        await sql`INSERT INTO links (item_id, title, url) VALUES (${itemId}, ${link.title}, ${link.url})`;
    }

    return itemId;
}

export async function deleteItem(id: number) {
    await sql`DELETE FROM links WHERE item_id = ${id}`;
    await sql`DELETE FROM items WHERE id = ${id}`;
}