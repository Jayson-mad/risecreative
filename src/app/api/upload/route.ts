import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_STORE_ID) {
    // Return mock URL or error depending on mode.
    // If not connected in local dev, let's log a warning but return a mock url so compilation/tests don't break.
    console.warn('Vercel Blob credentials (BLOB_READ_WRITE_TOKEN or BLOB_STORE_ID) are missing. Returning fallback mock URL.');
    return NextResponse.json({ url: '/oversized_front.jpg' });
  }

  try {
    const body = await request.json();
    const { base64, filename } = body;

    if (!base64) {
      return NextResponse.json({ error: 'No image data (base64) provided' }, { status: 400 });
    }

    // Convert Base64 to Buffer
    const matches = base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return NextResponse.json({ error: 'Invalid Base64 format' }, { status: 400 });
    }

    const contentType = matches[1];
    const buffer = Buffer.from(matches[2], 'base64');
    
    // Clean filename
    const cleanFilename = `${Date.now()}-${(filename || 'upload.jpg').replace(/[^a-zA-Z0-9.-]/g, '_')}`;

    // Upload buffer to Vercel Blob
    const blob = await put(cleanFilename, buffer, {
      access: 'public',
      contentType: contentType,
    });

    return NextResponse.json({ url: blob.url });
  } catch (error: any) {
    console.error('Blob upload failed', error);
    return NextResponse.json({ error: error.message || 'Blob upload failed' }, { status: 500 });
  }
}
