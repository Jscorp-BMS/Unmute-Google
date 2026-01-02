
import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to a server/email
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-10 animate-fade-in">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-[#0A192F] mb-2">Registration Received!</h3>
        <p className="text-slate-600">Shashtika will be in touch within 24 hours to schedule your first session.</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="mt-6 text-[#D4AF37] font-bold hover:underline"
        >
          Register another student
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
          <input 
            type="text" 
            required 
            placeholder="e.g., Ramesh Kumar"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">WhatsApp Number</label>
          <input 
            type="tel" 
            required 
            placeholder="+91 XXXXX XXXXX"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
        <input 
          type="email" 
          required 
          placeholder="ramesh.k@company.com"
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">What's your biggest English hurdle?</label>
        <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all">
          <option>Pronunciation (Accent)</option>
          <option>Confidence in Meetings</option>
          <option>Vocabulary (Business English)</option>
          <option>Writing (Emails/Reports)</option>
          <option>Grammar Fundamentals</option>
        </select>
      </div>
      <button 
        type="submit" 
        className="w-full py-4 bg-[#D4AF37] text-[#0A192F] font-bold rounded-xl hover:bg-[#B8962E] transition-all transform hover:scale-[1.02] shadow-xl text-lg uppercase tracking-wider"
      >
        Confirm My Registration
      </button>
      <p className="text-center text-slate-400 text-xs mt-4">
        By clicking, you agree to our Terms of Service. No credit card required to register.
      </p>
    </form>
  );
};

export default ContactForm;
