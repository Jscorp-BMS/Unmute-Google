
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute -inset-4 bg-[#D4AF37]/20 rounded-3xl blur-xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2076&auto=format&fit=crop" 
                alt="Coach Shashtika"
                className="relative rounded-3xl w-full h-[600px] object-cover shadow-2xl transition-all duration-700 hover:scale-[1.01]"
              />
              <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-2xl shadow-xl max-w-xs border border-slate-100">
                <div className="flex items-center space-x-2 text-[#D4AF37] mb-2">
                  {[1, 2, 3, 4, 5].map(i => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[#0A192F] font-bold italic">
                  "Shashtika transformed my English in just 3 months. Highly recommended for any tech professional."
                </p>
                <p className="text-slate-500 text-sm mt-2">— Sundar G., Lead Architect</p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-serif font-bold text-[#0A192F] mb-6">
              Meet Your Coach: <span className="text-[#D4AF37]">Shashtika</span>
            </h2>
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <p>
                As a native English speaker who has spent years working with international teams, I noticed a recurring problem: brilliant Tamil-speaking professionals being held back by their speaking confidence.
              </p>
              <p>
                My approach isn't about teaching you "Queen's English." It's about practical, powerful communication that commands respect in boardrooms and builds bridges in interviews.
              </p>
              <ul className="space-y-4 pt-4">
                {[
                  "15+ Years Executive Coaching Experience",
                  "Former Communications Lead at Fortune 500",
                  "Specialized in South Asian Phonetics",
                  "Native fluency from London, based in Chennai"
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[#0A192F] font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-8">
                <a 
                  href="#trial"
                  className="inline-flex items-center text-[#D4AF37] font-bold hover:text-[#B8962E] transition-colors"
                >
                  Book a Discovery Call with Shashtika
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
