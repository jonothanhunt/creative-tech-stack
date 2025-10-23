import { getAllItems } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const items = await getAllItems();
        return NextResponse.json(items);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
    }
}