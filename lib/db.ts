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
