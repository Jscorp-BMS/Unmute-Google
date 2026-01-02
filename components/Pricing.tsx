
import React from 'react';
import { PRICING } from '../constants';

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-24 bg-[#0A192F] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent opacity-10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
            Invest in Your <span className="text-[#D4AF37]">Future Self</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Whether you want a quick confidence boost or a complete transformation, we have a lab session for you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {PRICING.map((plan, index) => (
            <div 
              key={index} 
              className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 ${
                plan.isFeatured 
                  ? 'bg-white border-[#D4AF37] shadow-2xl scale-105 z-20 md:-translate-y-4' 
                  : 'bg-white/5 border-white/10 text-white'
              }`}
            >
              {plan.isFeatured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-[#0A192F] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  Best Value for Beginners
                </div>
              )}
              <div className="mb-8">
                <h3 className={`text-xl font-bold mb-2 ${plan.isFeatured ? 'text-[#0A192F]' : 'text-[#D4AF37]'}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline space-x-1">
                  <span className={`text-4xl font-serif font-bold ${plan.isFeatured ? 'text-[#0A192F]' : 'text-white'}`}>
                    {plan.price}
                  </span>
                </div>
                <p className={`text-sm mt-2 ${plan.isFeatured ? 'text-slate-500' : 'text-slate-400'}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start space-x-3 text-sm">
                    <svg className={`w-5 h-5 flex-shrink-0 ${plan.isFeatured ? 'text-[#D4AF37]' : 'text-[#D4AF37]/60'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={plan.isFeatured ? 'text-slate-600' : 'text-slate-300'}>{feature}</span>
                  </li>
                ))}
              </ul>

              <a 
                href="#trial"
                className={`w-full py-4 rounded-xl font-bold text-center transition-all ${
                  plan.isFeatured 
                    ? 'bg-[#0A192F] text-white hover:bg-[#112240] shadow-lg' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Choose {plan.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
