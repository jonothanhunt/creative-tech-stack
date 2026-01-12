import { tools } from "@/app/data/tools";

export interface Link {
    title: string;
    url: string;
}

export interface Tool {
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
    tools: Tool[];
}

export interface Category {
    name: string;
    subcategories: Subcategory[];
}

export async function getAllTools(): Promise<Tool[]> {
    // Return all tools from the local file
    return tools.map(tool => ({
        ...tool,
        image: tool.image || "",
    }));
}

export async function getFilters() {
    const categories = Array.from(new Set(tools.flatMap(t => t.categories))).sort();
    const types = Array.from(new Set(tools.map(t => t.type))).sort();
    const stacks = Array.from(new Set(tools.flatMap(t => t.stacks))).sort();

    return {
        categories,
        types,
        stacks,
    };
}
