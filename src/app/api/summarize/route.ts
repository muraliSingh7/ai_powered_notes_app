// app/api/summarize/route.ts
import { NextResponse } from 'next/server';
import { summarizeText } from '@/lib/groq';

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Valid text is required' },
        { status: 400 }
      );
    }

    const summary = await summarizeText(text);
    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Summarization error:', error);
    return NextResponse.json(
      { error: 'Failed to summarize text' },
      { status: 500 }
    );
  }
}