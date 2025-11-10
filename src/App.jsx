import { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Solutions from './components/Solutions';
import Partners from './components/Partners';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ChatInterface from './components/ChatInterface';

function App() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen">
      {!showChat ? (
        <>
          <Navigation onStartChat={() => setShowChat(true)} />
          <Hero onStartChat={() => setShowChat(true)} />
          <Solutions />
          <Partners />
          <FAQ />
          <Footer />
        </>
      ) : (
        <ChatInterface onBack={() => setShowChat(false)} />
      )}
    </div>
  );
}

export default App;
