'use server';

import { updateItem, insertItem, deleteItem } from './db';
import { del } from '@vercel/blob';

export async function updateItemAction(id: number, name: string, description: string, imageUrl: string, oldImageUrl: string, type: string, categories: string[], stacks: string[], links: { title: string; url: string }[]) {
    if (imageUrl !== oldImageUrl && oldImageUrl) {
        // Delete old image
        try {
            const url = new URL(oldImageUrl);
            await del(url.pathname.slice(1)); // Remove leading /
        } catch (e) {
            console.error('Failed to delete old image', e);
        }
    }

    await updateItem(id, name, description, imageUrl, type, categories, stacks, links);
}

export async function insertItemAction(name: string, description: string, imageUrl: string, type: string, categories: string[], stacks: string[], links: { title: string; url: string }[]) {
    return await insertItem(name, description, imageUrl, type, categories, stacks, links);
}

export async function deleteItemAction(id: number, imageUrl: string) {
    if (imageUrl) {
        try {
            const url = new URL(imageUrl);
            await del(url.pathname.slice(1));
        } catch (e) {
            console.error('Failed to delete image', e);
        }
    }

    await deleteItem(id);
}