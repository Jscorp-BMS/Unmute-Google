
import React from 'react';
import { User, AppView } from '../types';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
  onNavigate: (view: AppView) => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onNavigate }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <button 
          onClick={() => onNavigate('landing')}
          className="flex items-center space-x-2 focus:outline-none"
        >
          <div className="w-10 h-10 bg-[#0A192F] rounded-lg flex items-center justify-center">
            <span className="text-[#D4AF37] font-bold text-xl">U</span>
          </div>
          <span className="text-xl font-bold text-[#0A192F] hidden sm:block tracking-tight">
            Unmute
          </span>
        </button>
        
        <nav className="hidden xl:flex items-center space-x-8 text-sm font-medium text-slate-600">
          <a href="#features" onClick={() => onNavigate('landing')} className="hover:text-[#D4AF37] transition-colors">Methodology</a>
          <a href="#native-advantage" onClick={() => onNavigate('landing')} className="hover:text-[#D4AF37] transition-colors">Native Advantage</a>
          <a href="#about" onClick={() => onNavigate('landing')} className="hover:text-[#D4AF37] transition-colors">About</a>
          <a href="#pricing" onClick={() => onNavigate('landing')} className="hover:text-[#D4AF37] transition-colors">Pricing</a>
          {user && (
            <button 
              onClick={() => onNavigate('studio')}
              className="text-[#D4AF37] font-bold hover:text-[#B8962E] transition-colors"
            >
              Practice Studio
            </button>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-[#0A192F] hidden md:inline">Hi, {user.name}</span>
              <button 
                onClick={onLogout}
                className="text-sm font-bold text-red-600 hover:text-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <button 
                onClick={() => onNavigate('login')}
                className="text-sm font-bold text-[#0A192F] hover:text-[#D4AF37] transition-colors"
              >
                Login
              </button>
              <button 
                onClick={() => onNavigate('register')}
                className="bg-[#0A192F] text-[#D4AF37] px-6 py-2.5 rounded-full text-sm font-bold border border-[#D4AF37]/30 hover:bg-[#112240] transition-all shadow-lg"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
