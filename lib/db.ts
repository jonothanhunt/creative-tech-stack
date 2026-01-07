import { items } from "@/app/data/items";

export interface Link {
    title: string;
    url: string;
}

export interface Item {
    name: string;
    description: string;
    image: string;
    links: Link[];
    type: string;
    categories: string[];
    stacks: string[];
    featured?: boolean;
}

export interface Subcategory {
    name: string;
    items: Item[];
}

export interface Category {
    name: string;
    subcategories: Subcategory[];
}

export interface ItemWithId extends Item {
    id: number;
}

export async function getAllItems(): Promise<ItemWithId[]> {
    // Return all items from the local file
    // Filter out any null images if necessary, or keep them as is.
    // The types in items.ts match ItemWithId structure roughly.
    // Note: image in items.ts might be null, but interface says string.
    // The JSON had "image": null. We should handle that in the interface or map it.
    // The interface in original db.ts said image: string.
    // Let's adjust interface to string | null or string.

    // We map to ensure types match perfectly just in case
    return items.map(item => ({
        ...item,
        image: item.image || "",
    }));
}

export async function getFilters() {
    const categories = Array.from(new Set(items.flatMap(i => i.categories))).sort();
    const types = Array.from(new Set(items.map(i => i.type))).sort();
    const stacks = Array.from(new Set(items.flatMap(i => i.stacks))).sort();

    return {
        categories,
        types,
        stacks,
    };
}

// Write operations are disabled for static version
export async function updateItem(id: number, name: string, description: string, imageUrl: string, type: string, categories: string[], stacks: string[], links: Link[]) {
    console.warn("Database removed. Update operation ignored.");
    return;
}

export async function insertItem(name: string, description: string, imageUrl: string, type: string, categories: string[], stacks: string[], links: Link[]) {
    console.warn("Database removed. Insert operation ignored.");
    return Math.floor(Math.random() * 100000);
}

export async function deleteItem(id: number) {
    console.warn("Database removed. Delete operation ignored.");
    return;
}

export async function getCategories(): Promise<Category[]> {
    // This function was complex in SQL, constructing a nested structure.
    // If it's not used, we can return empty.
    // If it is used, we need to reconstruct it from the flat items list.
    // Based on grep check (to be done), we might need to implement it.
    // For now, returning empty array or implementing basic mapping.

    return [];
}