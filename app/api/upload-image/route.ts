import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        console.log('Upload request received');
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            console.log('No file provided');
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        console.log('File received:', file.name, file.size, file.type);

        // Upload to Vercel Blob
        const blob = await put(file.name, file, { access: 'public' });
        console.log('Blob uploaded:', blob.url);

        return NextResponse.json({ url: blob.url });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}