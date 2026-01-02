
import React from 'react';
import { TESTIMONIALS } from '../constants';

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0A192F] mb-4">
            Hear From Our <span className="text-[#D4AF37]">Lab Graduates</span>
          </h2>
          <p className="text-slate-500">Real stories from real professionals who found their voice.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div key={testimonial.id} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 flex flex-col h-full">
              <div className="mb-6">
                <div className="flex items-center space-x-1 text-[#D4AF37]">
                  {[1, 2, 3, 4, 5].map(i => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-slate-700 italic flex-grow mb-8 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex items-center space-x-4">
                <img src={testimonial.image} className="w-12 h-12 rounded-full grayscale" alt={testimonial.name} />
                <div>
                  <h4 className="text-[#0A192F] font-bold">{testimonial.name}</h4>
                  <p className="text-slate-500 text-xs">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
