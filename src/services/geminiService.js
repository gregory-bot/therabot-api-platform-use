import { GoogleGenerativeAI } from '@google/generative-ai';

export async function sendGeminiMessage(message, conversationHistory = []) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    throw new Error('Gemini API key not configured');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const systemPrompt = `You are MindAble, a compassionate AI mental health support assistant specifically designed for people with disabilities. You provide emotional support, active listening, and gentle guidance. Always be empathetic, patient, and understanding. Keep responses concise and supportive.`;

  const historyContext = conversationHistory
    .slice(-6)
    .map(msg => `${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.text}`)
    .join('\n');

  const fullPrompt = `${systemPrompt}\n\nConversation history:\n${historyContext}\n\nUser: ${message}\n\nAssistant:`;

  const result = await model.generateContent(fullPrompt);
  const response = await result.response;
  const text = response.text();

  return text || "I'm here to support you. Would you like to talk about what's on your mind?";
}
