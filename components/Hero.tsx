
import React from 'react';
import { AppView } from '../types';

interface HeroProps {
  onNavigate: (view: AppView) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative overflow-hidden bg-[#0A192F] py-24 lg:py-32">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#D4AF37]/5 to-transparent pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10 text-center lg:text-left">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold tracking-widest uppercase">
              Premium Coaching for Tamil Professionals
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white leading-tight mb-6">
              It’s time to <span className="text-[#D4AF37]">Unmute</span> your potential.
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Master English with a Native coach. Our private Practice Studio is now open for members. Stop the silence, start the conversation.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => onNavigate('register')}
                className="w-full sm:w-auto px-8 py-4 bg-[#D4AF37] text-[#0A192F] font-bold rounded-lg hover:bg-[#B8962E] transition-all transform hover:-translate-y-1 shadow-xl text-lg"
              >
                Register to Start Speaking
              </button>
              <button 
                onClick={() => onNavigate('login')}
                className="w-full sm:w-auto px-8 py-4 border border-white/20 text-white font-bold rounded-lg hover:bg-white/5 transition-all text-lg"
              >
                Login to Practice
              </button>
            </div>
            
            <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center space-x-6">
               <div className="flex-shrink-0 relative">
                  <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center animate-pulse">
                    <svg className="w-6 h-6 text-[#0A192F]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
                  </div>
                  <div className="absolute -inset-1 border border-[#D4AF37]/50 rounded-full animate-ping"></div>
               </div>
               <div>
                  <h3 className="text-white font-bold text-sm">Practice with Shashtika AI</h3>
                  <p className="text-slate-400 text-xs">"Hello! Ready to refine your accent today?"</p>
               </div>
               <div className="hidden sm:block ml-auto">
                 <div className="flex space-x-1">
                    {[1,2,3,4,5].map(i => <div key={i} className="w-1 bg-[#D4AF37] rounded-full h-4 animate-bounce" style={{animationDelay: `${i*0.2}s`}}></div>)}
                 </div>
               </div>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
                alt="Native Coach Session"
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                <p className="text-white font-medium text-sm flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                  LIVE PREVIEW: Create a free account to unlock your AI Native Coach.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
