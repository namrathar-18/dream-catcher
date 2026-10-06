import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

export async function getDreamInterpretation(dreamText) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is missing');
  }

  const model = process.env.GEMINI_MODEL || 'gemini-3.8-flash';

  try {
    const response = await ai.models.generateContent({
      model,
      contents: `Dream: ${dreamText}`,
      config: {
        systemInstruction:
          'You are a thoughtful dream interpreter. Be insightful but gentle, and consider common dream symbolism. Keep your interpretation to 2-3 paragraphs.'
      }
    });

    return response.text.trim();

  } catch (error) {
    console.error('Gemini API error:', error);
    throw error;
  }
}