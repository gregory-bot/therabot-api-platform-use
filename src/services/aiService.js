import { sendGeminiMessage } from './geminiService';
import { sendTheraMessage } from './theraAPI';

export async function sendMessage(message, conversationHistory = []) {
  try {
    const response = await sendGeminiMessage(message, conversationHistory);
    return { response };
  } catch (error) {
    try {
      const response = await sendTheraMessage(message, conversationHistory);
      return { response };
    } catch (fallbackError) {
      throw new Error('Service temporarily unavailable. Please try again later.');
    }
  }
}
