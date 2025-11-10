import { useEffect, useState } from 'react';
import { Mic, MicOff } from 'lucide-react';

export default function VoiceNavigation({ onNavigate }) {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();

      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript.toLowerCase();
        setTranscript(transcriptText);

        if (event.results[current].isFinal) {
          handleVoiceCommand(transcriptText);
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        if (isListening) {
          recognitionInstance.start();
        }
      };

      setRecognition(recognitionInstance);
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const handleVoiceCommand = (command) => {
    const lowerCommand = command.toLowerCase().trim();

    if (lowerCommand.includes('chat') ||
        lowerCommand.includes('start chatting') ||
        lowerCommand.includes('get started') ||
        lowerCommand.includes('begin') ||
        lowerCommand.includes('talk to therapist')) {
      onNavigate('chat');
      speak('Starting chat interface');
    } else if (lowerCommand.includes('home') || lowerCommand.includes('top')) {
      onNavigate('hero');
      speak('Going to home');
    } else if (lowerCommand.includes('solution') || lowerCommand.includes('feature')) {
      onNavigate('solutions');
      speak('Showing solutions');
    } else if (lowerCommand.includes('partner')) {
      onNavigate('partners');
      speak('Showing partners');
    } else if (lowerCommand.includes('faq') || lowerCommand.includes('question') || lowerCommand.includes('help')) {
      onNavigate('faq');
      speak('Showing frequently asked questions');
    } else if (lowerCommand.includes('contact') || lowerCommand.includes('reach') || lowerCommand.includes('email')) {
      onNavigate('contact');
      speak('Showing contact information');
    }

    setTranscript('');
  };

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleListening = () => {
    if (!recognition) {
      alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
      speak('Voice navigation stopped');
    } else {
      recognition.start();
      setIsListening(true);
      speak('Voice navigation activated. Say commands like: take me to chat, show solutions, or contact us');
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleListening}
        className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isListening
            ? 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500 animate-pulse'
            : 'bg-purple-500 hover:bg-purple-600 text-white focus:ring-purple-500'
        }`}
        aria-label={isListening ? 'Stop voice navigation' : 'Start voice navigation'}
        aria-pressed={isListening}
      >
        {isListening ? (
          <>
            <MicOff className="w-5 h-5" aria-hidden="true" />
            <span className="hidden md:inline">Listening...</span>
          </>
        ) : (
          <>
            <Mic className="w-5 h-5" aria-hidden="true" />
            <span className="hidden md:inline">Voice</span>
          </>
        )}
      </button>

      {isListening && transcript && (
        <div className="absolute top-full mt-2 right-0 bg-white border-2 border-purple-500 rounded-lg shadow-lg px-4 py-2 min-w-[200px] z-50">
          <p className="text-sm text-gray-600">Listening:</p>
          <p className="text-sm font-semibold text-gray-900">{transcript}</p>
        </div>
      )}
    </div>
  );
}
