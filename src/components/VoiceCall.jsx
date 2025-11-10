import { useState, useEffect, useRef, useCallback } from 'react';
import { Phone, PhoneOff, Mic, Volume2 } from 'lucide-react';
import { VoiceCallService } from '../services/callService';

export default function VoiceCall({ onBack }) {
  const [callStatus, setCallStatus] = useState('idle');
  const [conversationHistory, setConversationHistory] = useState([]);
  const [currentStatus, setCurrentStatus] = useState('');
  const callServiceRef = useRef(null);
  const conversationRef = useRef([]);

  const addToConversation = useCallback((message) => {
    const newMessage = {
      ...message,
      timestamp: new Date().toISOString()
    };
    setConversationHistory(prev => [...prev, newMessage]);
    conversationRef.current = [...conversationRef.current, newMessage];
  }, []);

  const startConversation = async () => {
    try {
      const greeting = "Hello! I'm here to support you. How are you feeling today?";

      addToConversation({ text: greeting, sender: 'ai' });

      await callServiceRef.current.speak(greeting);

      if (callServiceRef.current.isActive) {
        callServiceRef.current.startListening(conversationRef.current, (userMsg, aiMsg) => {
          addToConversation({ text: userMsg, sender: 'user' });
          addToConversation({ text: aiMsg, sender: 'ai' });
        });
      }
    } catch (error) {
      console.error('Error starting conversation:', error);
      setCurrentStatus('Error: ' + error.message);
    }
  };

  const handleStatusChange = (status) => {
    console.log('Status changed to:', status);
    setCallStatus(status);
    switch (status) {
      case 'connected':
        setCurrentStatus('Call connected');
        startConversation();
        break;
      case 'listening':
        setCurrentStatus('Listening...');
        break;
      case 'thinking':
        setCurrentStatus('Thinking...');
        break;
      case 'speaking':
        setCurrentStatus('Speaking...');
        break;
      case 'ended':
        setCurrentStatus('Call ended');
        break;
      default:
        setCurrentStatus('');
    }
  };

  useEffect(() => {
    const service = new VoiceCallService();
    service.onStatusChange = handleStatusChange;
    callServiceRef.current = service;

    return () => {
      if (callServiceRef.current) {
        callServiceRef.current.endCall();
      }
    };
  }, []);

  const initiateCall = async () => {
    setCallStatus('calling');
    setCurrentStatus('Calling...');

    await callServiceRef.current.initiateCall();
  };

  const endCall = () => {
    callServiceRef.current.endCall();
    setTimeout(() => {
      onBack();
    }, 1000);
  };

  const getStatusColor = () => {
    switch (callStatus) {
      case 'calling':
        return 'bg-yellow-500';
      case 'connected':
      case 'listening':
        return 'bg-green-500';
      case 'thinking':
      case 'speaking':
        return 'bg-blue-500';
      case 'ended':
        return 'bg-gray-500';
      default:
        return 'bg-slate-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-8">
          <div className="text-center space-y-4">
            <div className={`w-32 h-32 mx-auto rounded-full ${getStatusColor()} flex items-center justify-center transition-all duration-500 ${
              callStatus === 'listening' || callStatus === 'speaking' ? 'animate-pulse' : ''
            }`}>
              {callStatus === 'idle' || callStatus === 'calling' ? (
                <Phone className="w-16 h-16 text-white" />
              ) : callStatus === 'listening' ? (
                <Mic className="w-16 h-16 text-white" />
              ) : (
                <Volume2 className="w-16 h-16 text-white" />
              )}
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-800">MindAble AI</h2>
              <p className="text-lg text-gray-600 mt-2">{currentStatus || 'Ready to connect'}</p>
            </div>
          </div>

          {callStatus === 'idle' && (
            <button
              onClick={initiateCall}
              className="w-full bg-gradient-to-r from-slate-600 to-blue-600 hover:from-slate-700 hover:to-blue-700 text-white py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Voice Call
            </button>
          )}

          {callStatus === 'calling' && (
            <div className="text-center">
              <div className="inline-flex space-x-2">
                <div className="w-3 h-3 bg-slate-600 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-slate-600 rounded-full animate-bounce delay-100"></div>
                <div className="w-3 h-3 bg-slate-600 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          )}

          {(callStatus === 'connected' || callStatus === 'listening' || callStatus === 'thinking' || callStatus === 'speaking') && (
            <button
              onClick={endCall}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              <PhoneOff className="w-6 h-6" />
              End Call
            </button>
          )}

          {callStatus === 'ended' && (
            <button
              onClick={onBack}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white py-4 rounded-full text-xl font-semibold transition-all duration-300"
            >
              Back to Home
            </button>
          )}
        </div>

        <div className="mt-6 text-center text-sm text-gray-600 space-y-1">
          <p>Speak naturally and pause when done</p>
          <p>AI will respond automatically</p>
          <p className="text-xs mt-2 text-gray-500">Make sure you've allowed microphone access in your browser</p>
        </div>
      </div>
    </div>
  );
}
