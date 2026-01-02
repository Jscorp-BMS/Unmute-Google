
import React from 'react';
import { AMENITIES } from '../constants';

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0A192F] mb-6">
            Everything You Need to Speak with <span className="text-[#D4AF37]">Power</span>
          </h2>
          <p className="text-slate-600 text-lg">
            We've designed a curriculum specifically for the Tamil speaker, addressing cultural nuances and linguistic hurdles others ignore.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {AMENITIES.map((amenity, index) => (
            <div key={index} className="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#D4AF37]/30 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-white rounded-xl shadow-md flex items-center justify-center mb-6 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-white transition-colors">
                {amenity.icon === 'microphone' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-20a3 3 0 00-3 3v10a3 3 0 006 0V3a3 3 0 00-3-3z" />
                  </svg>
                )}
                {amenity.icon === 'book' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                )}
                {amenity.icon === 'wave' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )}
              </div>
              <h3 className="text-xl font-bold text-[#0A192F] mb-4">{amenity.title}</h3>
              <p className="text-slate-600 leading-relaxed">{amenity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
