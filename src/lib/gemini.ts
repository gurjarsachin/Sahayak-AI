import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
});

export async function generateTeachingContent(message: string, grade: string) {
  try {
    const config = {
      responseMimeType: 'text/plain' as const,
    };
    
    const model = 'gemma-3n-e4b-it';
    
    const prompt = grade 
      ? `You are Sahayak AI, a helpful teaching assistant for ${grade} students. Please help with: ${message}`
      : `You are Sahayak AI, a helpful teaching assistant. Please help with: ${message}`;
    
    const contents = [
      {
        role: 'user' as const,
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ];

    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    let fullResponse = '';
    for await (const chunk of response) {
      fullResponse += chunk.text || '';
    }
    
    return { success: true, content: fullResponse };
  } catch (error) {
    console.error('Error generating content:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to generate content' 
    };
  }
}