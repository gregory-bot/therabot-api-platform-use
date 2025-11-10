import { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Solutions from './components/Solutions';
import Partners from './components/Partners';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ChatInterface from './components/ChatInterface';
import VoiceCall from './components/VoiceCall';
import VideoCall from './components/VideoCall';

function App() {
  const [currentView, setCurrentView] = useState('home');

  return (
    <div className="min-h-screen">
      {currentView === 'home' && (
        <>
          <Navigation onStartChat={() => setCurrentView('chat')} />
          <Hero
            onStartChat={() => setCurrentView('chat')}
            onStartVoiceCall={() => setCurrentView('voicecall')}
            onStartVideoCall={() => setCurrentView('videocall')}
          />
          <Solutions />
          <Partners />
          <FAQ />
          <Footer />
        </>
      )}

      {currentView === 'chat' && (
        <ChatInterface onBack={() => setCurrentView('home')} />
      )}

      {currentView === 'voicecall' && (
        <VoiceCall onBack={() => setCurrentView('home')} />
      )}

      {currentView === 'videocall' && (
        <VideoCall onBack={() => setCurrentView('home')} />
      )}
    </div>
  );
}

export default App;
