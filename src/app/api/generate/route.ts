import { NextRequest, NextResponse } from 'next/server';
import { generateTeachingContent } from '../../../lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { message, grade } = await request.json();
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const result = await generateTeachingContent(message, grade);
    
    if (result.success) {
      return NextResponse.json({ content: result.content });
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}