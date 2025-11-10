import { sendMessage } from './aiService';

export class VoiceCallService {
  constructor() {
    this.recognition = null;
    this.synthesis = window.speechSynthesis;
    this.isActive = false;
    this.isListening = false;
    this.isSpeaking = false;
    this.onStatusChange = null;
    this.onMessageCallback = null;
    this.finalTranscript = '';
    this.silenceTimer = null;
    this.conversationHistory = [];
  }

  async initiateCall() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.isActive = true;
        this.updateStatus('connected');
        resolve(true);
      }, 5000);
    });
  }

  startListening(conversationHistory = [], onMessage = null) {
    this.conversationHistory = conversationHistory;
    this.onMessageCallback = onMessage;

    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      throw new Error('Speech recognition not supported in this browser');
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.onstart = () => {
      console.log('Speech recognition started');
      this.isListening = true;
      this.updateStatus('listening');
    };

    this.recognition.onresult = async (event) => {
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          this.finalTranscript += transcript + ' ';
          console.log('Final transcript:', this.finalTranscript);

          clearTimeout(this.silenceTimer);
          this.silenceTimer = setTimeout(async () => {
            if (this.finalTranscript.trim()) {
              const userMessage = this.finalTranscript.trim();
              this.finalTranscript = '';

              this.recognition.stop();
              await this.processAndRespond(userMessage);
            }
          }, 1500);
        } else {
          interimTranscript += transcript;
        }
      }
    };

    this.recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        this.updateStatus('ended');
        throw new Error('Microphone permission denied. Please allow microphone access.');
      }
    };

    this.recognition.onend = () => {
      console.log('Speech recognition ended, isActive:', this.isActive, 'isSpeaking:', this.isSpeaking);
      if (this.isActive && !this.isSpeaking) {
        try {
          this.recognition.start();
        } catch (error) {
          console.error('Failed to restart recognition:', error);
        }
      }
    };

    try {
      this.recognition.start();
    } catch (error) {
      console.error('Failed to start recognition:', error);
      throw error;
    }
  }

  async processAndRespond(userMessage) {
    try {
      this.updateStatus('thinking');

      console.log('Processing message:', userMessage);
      console.log('Conversation history:', this.conversationHistory);

      const { response } = await sendMessage(userMessage, this.conversationHistory);

      console.log('AI response:', response);

      if (this.onMessageCallback) {
        this.onMessageCallback(userMessage, response);
      }

      this.conversationHistory.push(
        { text: userMessage, sender: 'user', timestamp: new Date().toISOString() },
        { text: response, sender: 'ai', timestamp: new Date().toISOString() }
      );

      await this.speak(response);

      return { userMessage, aiResponse: response };
    } catch (error) {
      console.error('Error processing message:', error);
      const fallbackResponse = "I'm having trouble right now. Could you repeat that?";

      if (this.onMessageCallback) {
        this.onMessageCallback(userMessage, fallbackResponse);
      }

      await this.speak(fallbackResponse);
      return { userMessage, aiResponse: fallbackResponse };
    }
  }

  speak(text) {
    return new Promise((resolve) => {
      this.synthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.1;
      utterance.volume = 1;

      const loadVoices = () => {
        const voices = this.synthesis.getVoices();
        console.log('Available voices:', voices.length);

        const femaleVoice = voices.find(voice =>
          voice.name.includes('Female') ||
          voice.name.includes('Samantha') ||
          voice.name.includes('Karen') ||
          voice.name.includes('Zira') ||
          (voice.name.includes('Google') && voice.name.includes('US'))
        );

        if (femaleVoice) {
          utterance.voice = femaleVoice;
          console.log('Using voice:', femaleVoice.name);
        }
      };

      if (this.synthesis.getVoices().length > 0) {
        loadVoices();
      } else {
        this.synthesis.addEventListener('voiceschanged', loadVoices, { once: true });
      }

      utterance.onstart = () => {
        console.log('Speech started');
        this.isSpeaking = true;
        this.updateStatus('speaking');
      };

      utterance.onend = () => {
        console.log('Speech ended');
        this.isSpeaking = false;
        if (this.isActive) {
          this.updateStatus('listening');
        }
        resolve();
      };

      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        this.isSpeaking = false;
        resolve();
      };

      console.log('Speaking:', text);
      this.synthesis.speak(utterance);
    });
  }

  endCall() {
    if (!this.isActive) {
      return;
    }

    this.isActive = false;

    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        console.log('Recognition already stopped');
      }
      this.recognition = null;
    }

    this.synthesis.cancel();
    clearTimeout(this.silenceTimer);

    this.updateStatus('ended');
  }

  updateStatus(status) {
    console.log('Updating status to:', status);
    if (this.onStatusChange) {
      this.onStatusChange(status);
    }
  }
}
