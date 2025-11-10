import { useState, useEffect } from 'react';
import { Heart, Accessibility, MessageCircle, Sparkles, Phone, Video } from 'lucide-react';

const images = [
  'https://i.pinimg.com/1200x/95/50/7b/95507ba220ef508566c715ed9a6e13b1.jpg',
  'https://i.pinimg.com/736x/96/59/c0/9659c0c7cd7210a47ba420de07b53be1.jpg',
  'https://media.istockphoto.com/id/1513072392/photo/hands-holding-paper-head-human-brain-with-flowers-self-care-and-mental-health-concept.jpg?b=1&s=612x612&w=0&k=20&c=boMJwSib2tbtpppWfjTiIkJLwHVLHipeRd8QzDE0Dl0=',
];

export default function Hero({ onStartChat, onStartVoiceCall, onStartVideoCall }) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="hero" className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-white flex items-center justify-center px-6 py-12 pt-24">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 text-center md:text-left">

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Mental Support for People with Disabilities
          </h1>

          <div className="flex justify-center md:justify-start">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-purple-100 inline-flex items-center gap-3">
              <Accessibility className="w-10 h-10 text-purple-500" />
              <p className="text-lg font-semibold text-gray-700">
                Fully Accessible
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onStartChat}
              className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Chat Now
            </button>
            <button
              onClick={onStartVoiceCall}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Voice Call
            </button>
            <button
              onClick={onStartVideoCall}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Video className="w-5 h-5" />
              Video Call
            </button>
          </div>
        </div>

        <div className="relative h-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl">
          {images.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImage ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={img}
                alt={`Mental wellness ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
