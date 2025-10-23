import { getCategories } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const categories = await getCategories();
        return NextResponse.json(categories);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}