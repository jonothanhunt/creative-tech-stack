import { getAllItems } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const items = await getAllItems();
        return NextResponse.json(items, {
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=3600',
            },
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
    }
}