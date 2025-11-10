import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import VoiceNavigation from './VoiceNavigation';

export default function Navigation({ onStartChat }) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const handleVoiceNavigation = (destination) => {
    if (destination === 'chat') {
      onStartChat();
    } else {
      scrollToSection(destination);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-md z-50" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg px-2 py-1"
            aria-label="Go to home"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
              <img
                src="https://i.pinimg.com/1200x/95/50/7b/95507ba220ef508566c715ed9a6e13b1.jpg"
                alt="MindAble Logo"
                className="w-10 h-10 rounded-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<span class="text-white font-bold text-xl">M</span>';
                }}
              />
            </div>
            <span className="text-2xl font-bold text-gray-900">MindAble</span>
          </button>

          <div className="md:hidden flex items-center gap-3">
            <VoiceNavigation onNavigate={handleVoiceNavigation} />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="w-6 h-6 text-gray-900" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6 text-gray-900" aria-hidden="true" />
              )}
            </button>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <VoiceNavigation onNavigate={handleVoiceNavigation} />
            <button
              onClick={() => scrollToSection('solutions')}
              className="text-gray-700 hover:text-purple-500 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-2 py-1"
            >
              Solutions
            </button>
            <button
              onClick={() => scrollToSection('partners')}
              className="text-gray-700 hover:text-purple-500 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-2 py-1"
            >
              Partners
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-gray-700 hover:text-purple-500 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-2 py-1"
            >
              FAQ
            </button>
            <button
              onClick={onStartChat}
              className="text-gray-700 hover:text-purple-500 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-2 py-1"
            >
              Get Started
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3" role="menu">
            <button
              onClick={() => scrollToSection('solutions')}
              className="block w-full text-left text-gray-700 hover:text-purple-500 font-medium py-2 px-4 rounded-lg hover:bg-purple-50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
              role="menuitem"
            >
              Solutions
            </button>
            <button
              onClick={() => scrollToSection('partners')}
              className="block w-full text-left text-gray-700 hover:text-purple-500 font-medium py-2 px-4 rounded-lg hover:bg-purple-50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
              role="menuitem"
            >
              Partners
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="block w-full text-left text-gray-700 hover:text-purple-500 font-medium py-2 px-4 rounded-lg hover:bg-purple-50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
              role="menuitem"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left text-gray-700 hover:text-purple-500 font-medium py-2 px-4 rounded-lg hover:bg-purple-50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
              role="menuitem"
            >
              Contact
            </button>
            <button
              onClick={() => { onStartChat(); setIsOpen(false); }}
              className="block w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              role="menuitem"
            >
              Get Started
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
