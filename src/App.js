import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Lipoedeme from './pages/Lipoedeme';
import Actions from './pages/Actions';
import Adhesion from './pages/Adhesion';
import Contact from './pages/Contact';

function App() {
  const [lang, setLang] = useState('fr');

  useEffect(() => {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  return (
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
          </Routes>
        </main>
        <Footer lang={lang} />
      </div>
    </Router>
  );
}

// Temporary components for other routes
const News = ({ lang }) => <div className="max-w-7xl mx-auto px-4 py-20 text-center text-3xl font-bold">Actualités</div>;

export default App;
