import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data/sampled_wafer_data.json');

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const waferData = JSON.parse(fileContents);

    return NextResponse.json(waferData, { status: 200 });
  } catch (error) {
    console.error('Error reading JSON file:', error);
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}
