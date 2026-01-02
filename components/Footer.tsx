
import React from 'react';
import { AppView } from '../types';

interface FooterProps {
  onNavigate: (view: AppView) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-slate-200 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <button 
              onClick={() => onNavigate('landing')}
              className="flex items-center space-x-2 mb-4 focus:outline-none"
            >
              <div className="w-8 h-8 bg-[#0A192F] rounded-lg flex items-center justify-center">
                <span className="text-[#D4AF37] font-bold text-lg">U</span>
              </div>
              <span className="text-lg font-bold text-[#0A192F] tracking-tight">
                Unmute
              </span>
            </button>
            <p className="text-slate-500 text-sm text-center md:text-left">
              Empowering Tamil speakers to Unmute their global potential.
            </p>
          </div>
          
          <div className="flex space-x-8 text-sm font-medium text-slate-600">
            <button onClick={() => onNavigate('privacy')} className="hover:text-[#D4AF37] transition-colors">Privacy Policy</button>
            <button onClick={() => onNavigate('terms')} className="hover:text-[#D4AF37] transition-colors">Terms of Service</button>
            <button onClick={() => onNavigate('contact')} className="hover:text-[#D4AF37] transition-colors">Contact Us</button>
          </div>

          <div className="flex space-x-4">
            {['twitter', 'linkedin', 'youtube'].map((social) => (
              <a 
                key={social} 
                href="#" 
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-[#D4AF37] hover:text-[#0A192F] transition-all"
              >
                <span className="sr-only">{social}</span>
                <div className="w-5 h-5 bg-current rounded-sm"></div>
              </a>
            ))}
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-100 text-center text-slate-400 text-xs">
          © {new Date().getFullYear()} Unmute. All rights reserved. Designed for Tamil Excellence.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
