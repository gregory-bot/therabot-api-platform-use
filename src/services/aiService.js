import { sendGeminiMessage } from './geminiService';
import { sendTheraMessage } from './theraAPI';

export async function sendMessage(message, conversationHistory = []) {
  console.log('Sending message to AI:', message);
  console.log('Conversation history length:', conversationHistory.length);

  try {
    // Try Gemini first
    const response = await sendGeminiMessage(message, conversationHistory);
    console.log('AI Response received:', response);
    return { response };
  } catch (error) {
    console.error('Gemini service failed:', error);
    
    try {
      // Fallback to TheraAPI
      console.log('Trying fallback service...');
      const response = await sendTheraMessage(message, conversationHistory);
      return { response };
    } catch (fallbackError) {
      console.error('All AI services failed:', fallbackError);
      throw new Error('Service temporarily unavailable. Please try again later.');
    }
  }
}