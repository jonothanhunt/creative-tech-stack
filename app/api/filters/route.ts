import { getFilters } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const filters = await getFilters();
        return NextResponse.json(filters);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch filters' }, { status: 500 });
    }
}