import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Lipoedeme from './pages/Lipoedeme';
import Actions from './pages/Actions';
import Adhesion from './pages/Adhesion';
import Contact from './pages/Contact';
import News from './pages/News';


import Admin from './pages/Admin';
import PrivacyPolicy from './pages/PrivacyPolicy';
import LegalMentions from './pages/LegalMentions';
import InstagramPopup from './components/InstagramPopup';

function App() {
  const [lang, setLang] = useState('fr');
  const [showInstaPopup, setShowInstaPopup] = useState(false);

  useEffect(() => {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (!sessionStorage.getItem('instaPopupSeen')) {
      const timer = setTimeout(() => setShowInstaPopup(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const closeInstaPopup = () => {
    sessionStorage.setItem('instaPopupSeen', 'true');
    setShowInstaPopup(false);
  };

  return (
    <HelmetProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
        <Header currentLang={lang} onLangChange={setLang} />
        <main className="flex-grow pt-24 w-full">
          <Routes>
            <Route path="/" element={<Home lang={lang} />} />
            <Route path="/about" element={<About lang={lang} />} />
            <Route path="/lipoedeme" element={<Lipoedeme lang={lang} />} />
            <Route path="/actions" element={<Actions lang={lang} />} />
            <Route path="/adhesion" element={<Adhesion lang={lang} />} />
            <Route path="/news" element={<News lang={lang} />} />
            <Route path="/contact" element={<Contact lang={lang} />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/confidentialite" element={<PrivacyPolicy lang={lang} />} />
            <Route path="/mentions-legales" element={<LegalMentions lang={lang} />} />
          </Routes>
        </main>
        <Footer lang={lang} />
        <InstagramPopup isOpen={showInstaPopup} onClose={closeInstaPopup} />
        </div>
      </Router>
    </HelmetProvider>
  );
}

// Temporary components for other routes

export default App;
