
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import WhyNative from './components/WhyNative';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import UnmuteStudio from './components/PracticeLab/UnmuteStudio';
import PrivacyPolicy from './components/Legal/PrivacyPolicy';
import TermsOfService from './components/Legal/TermsOfService';
import ContactPage from './components/Contact/ContactPage';
import { User, AppView } from './types';

// Fix: Use a more flexible global augmentation for aistudio to avoid naming and modifier conflicts with the environment's pre-defined Window interface
declare global {
  interface Window {
    aistudio?: any;
  }
}

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);

  // Sync auth and check for API key
  useEffect(() => {
    const savedUser = localStorage.getItem('unmute_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const checkKey = async () => {
      // Fix: Safely check if aistudio exists on the window object as per global augmentation
      if (window.aistudio) {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        setHasApiKey(hasKey);
      }
    };
    checkKey();
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('unmute_user', JSON.stringify(userData));
    setView('studio');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('unmute_user');
    setView('landing');
  };

  const handleOpenKeySelector = async () => {
    // Fix: Access window.aistudio to trigger the environment-provided API key selection dialog
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setHasApiKey(true); // Proceed assuming success per guidelines
    }
  };

  const navigateTo = (newView: AppView) => {
    if (newView === 'studio' && !user) {
      setView('login');
    } else {
      setView(newView);
      window.scrollTo(0, 0);
    }
  };

  const renderContent = () => {
    if (view === 'studio' && user && !hasApiKey) {
      return (
        <div className="flex-grow flex items-center justify-center bg-slate-50 p-4">
          <div className="max-w-md w-full bg-white p-8 rounded-[32px] shadow-2xl text-center border border-slate-100">
            <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#0A192F] mb-4">Secure Your Lab Session</h2>
            <p className="text-slate-500 mb-8 text-sm">
              To access high-fidelity voice and visual scenario generation, please select your paid API key. 
              <br/><br/>
              <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] font-bold hover:underline">
                View Billing Documentation
              </a>
            </p>
            <button 
              onClick={handleOpenKeySelector}
              className="w-full py-4 bg-[#0A192F] text-[#D4AF37] font-bold rounded-2xl hover:bg-[#112240] transition-all shadow-xl"
            >
              Select Paid API Key
            </button>
          </div>
        </div>
      );
    }

    switch (view) {
      case 'landing':
        return (
          <main className="flex-grow">
            <Hero onNavigate={navigateTo} />
            <Features />
            <WhyNative />
            <About />
            <Testimonials />
            <Pricing />
            <FAQ />
            <section id="trial" className="py-20 bg-slate-100">
              <div className="container mx-auto px-4 max-w-4xl">
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                  <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0A192F] mb-4">
                      Claim Your Unmute 7-Day Trial
                    </h2>
                    <p className="text-slate-600">
                      It’s time to Unmute your potential. Start your journey today.
                    </p>
                  </div>
                  <ContactForm />
                </div>
              </div>
            </section>
          </main>
        );
      case 'studio':
        return user ? <UnmuteStudio user={user} /> : null;
      case 'login':
        return <Login onLogin={handleLogin} onNavigate={navigateTo} />;
      case 'register':
        return <Register onRegister={handleLogin} onNavigate={navigateTo} />;
      case 'privacy':
        return <PrivacyPolicy />;
      case 'terms':
        return <TermsOfService />;
      case 'contact':
        return <ContactPage />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <Header user={user} onLogout={handleLogout} onNavigate={navigateTo} />
      {renderContent()}
      <Footer onNavigate={navigateTo} />
    </div>
  );
};

export default App;
