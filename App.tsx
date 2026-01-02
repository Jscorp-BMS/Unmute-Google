
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

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('landing');
  const [user, setUser] = useState<User | null>(null);

  // Simple auth sync
  useEffect(() => {
    const savedUser = localStorage.getItem('unmute_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
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

  const navigateTo = (newView: AppView) => {
    if (newView === 'studio' && !user) {
      setView('login');
    } else {
      setView(newView);
      window.scrollTo(0, 0);
    }
  };

  const renderContent = () => {
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
