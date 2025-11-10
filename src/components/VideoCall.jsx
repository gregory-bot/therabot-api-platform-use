import { useState, useEffect, useRef, useCallback } from 'react';
import { Video, Mic, MicOff, PhoneOff, Camera, CameraOff } from 'lucide-react';
import { VoiceCallService } from '../services/callService';

export default function VideoCall({ onBack }) {
  const [callStatus, setCallStatus] = useState('idle');
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [micEnabled, setMicEnabled] = useState(true);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [currentStatus, setCurrentStatus] = useState('');
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const callServiceRef = useRef(null);
  const canvasRef = useRef(null);
  const conversationRef = useRef([]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraEnabled(false);
  }, []);

  const drawAIAvatar = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 150);
    gradient.addColorStop(0, '#475569');
    gradient.addColorStop(1, '#3b82f6');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(centerX, centerY - 30, 60, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.arc(centerX - 20, centerY - 40, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(centerX + 20, centerY - 40, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(centerX, centerY - 20, 15, 0, Math.PI);
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(centerX, centerY + 80, 80, 100, 0, 0, Math.PI * 2);
    ctx.fill();
  };

  const animateAIAvatar = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    drawAIAvatar();

    requestAnimationFrame(() => {
      if (callStatus === 'speaking') {
        setTimeout(() => animateAIAvatar(), 200);
      }
    });
  };

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
      const greeting = "Hello! I can see you're ready to talk. How can I support you today?";

      addToConversation({ text: greeting, sender: 'ai' });

      await callServiceRef.current.speak(greeting);

      if (micEnabled && callServiceRef.current.isActive) {
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
    console.log('Video call status changed to:', status);
    setCallStatus(status);
    switch (status) {
      case 'connected':
        setCurrentStatus('Connected');
        startConversation();
        drawAIAvatar();
        break;
      case 'listening':
        setCurrentStatus('Listening');
        break;
      case 'thinking':
        setCurrentStatus('Thinking');
        break;
      case 'speaking':
        setCurrentStatus('Speaking');
        animateAIAvatar();
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
      stopCamera();
    };
  }, [stopCamera]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraEnabled(true);
    } catch (error) {
      console.error('Camera access denied');
      setCameraEnabled(false);
    }
  };

  const toggleCamera = () => {
    if (cameraEnabled) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  const toggleMic = () => {
    const newMicState = !micEnabled;
    setMicEnabled(newMicState);

    if (newMicState && (callStatus === 'connected' || callStatus === 'listening') && callServiceRef.current.isActive) {
      callServiceRef.current.startListening(conversationRef.current, (userMsg, aiMsg) => {
        addToConversation({ text: userMsg, sender: 'user' });
        addToConversation({ text: aiMsg, sender: 'ai' });
      });
    } else if (!newMicState && callServiceRef.current.recognition) {
      callServiceRef.current.recognition.stop();
    }
  };

  const initiateCall = async () => {
    setCallStatus('calling');
    setCurrentStatus('Calling...');
    await callServiceRef.current.initiateCall();
  };

  const endCall = () => {
    callServiceRef.current.endCall();
    stopCamera();
    setTimeout(() => {
      onBack();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <div className="relative bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
          <canvas
            ref={canvasRef}
            width={640}
            height={480}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 bg-black/70 px-4 py-2 rounded-full">
            <p className="text-white font-semibold">MindAble AI</p>
          </div>
          <div className="absolute top-4 right-4">
            <div className={`px-4 py-2 rounded-full ${
              callStatus === 'listening' ? 'bg-green-500' :
              callStatus === 'speaking' ? 'bg-blue-500' :
              callStatus === 'thinking' ? 'bg-yellow-500' :
              'bg-gray-500'
            }`}>
              <p className="text-white text-sm font-medium">{currentStatus}</p>
            </div>
          </div>
        </div>

        <div className="relative bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
          {cameraEnabled ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-black/70 px-4 py-2 rounded-full">
                <p className="text-white font-semibold">You</p>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800">
              <div className="text-center">
                <CameraOff className="w-24 h-24 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-300 text-lg">Camera is off</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-800 border-t border-gray-700 p-6">
        <div className="max-w-2xl mx-auto flex items-center justify-center gap-4">
          {callStatus === 'idle' && (
            <button
              onClick={initiateCall}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <Video className="w-6 h-6" />
              Start Video Call
            </button>
          )}

          {callStatus === 'calling' && (
            <div className="text-center">
              <div className="inline-flex space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce delay-200"></div>
              </div>
              <p className="text-white mt-2">Connecting...</p>
            </div>
          )}

          {(callStatus === 'connected' || callStatus === 'listening' || callStatus === 'thinking' || callStatus === 'speaking') && (
            <>
              <button
                onClick={toggleMic}
                className={`${
                  micEnabled ? 'bg-gray-600 hover:bg-gray-700' : 'bg-red-500 hover:bg-red-600'
                } text-white p-4 rounded-full transition-all duration-300 shadow-lg`}
                aria-label={micEnabled ? 'Mute microphone' : 'Unmute microphone'}
              >
                {micEnabled ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
              </button>

              <button
                onClick={endCall}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-4 rounded-full transition-all duration-300 shadow-lg flex items-center gap-2"
              >
                <PhoneOff className="w-6 h-6" />
                End Call
              </button>

              <button
                onClick={toggleCamera}
                className={`${
                  cameraEnabled ? 'bg-gray-600 hover:bg-gray-700' : 'bg-red-500 hover:bg-red-600'
                } text-white p-4 rounded-full transition-all duration-300 shadow-lg`}
                aria-label={cameraEnabled ? 'Turn off camera' : 'Turn on camera'}
              >
                {cameraEnabled ? <Camera className="w-6 h-6" /> : <CameraOff className="w-6 h-6" />}
              </button>
            </>
          )}

          {callStatus === 'ended' && (
            <button
              onClick={onBack}
              className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
            >
              Back to Home
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
