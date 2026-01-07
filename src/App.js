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
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <Router>
      <div className={`flex flex-col min-h-screen transition-colors duration-300 ${isDark ? 'bg-slate-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <Header currentLang={lang} onLangChange={setLang} isDark={isDark} onThemeToggle={toggleTheme} />
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
