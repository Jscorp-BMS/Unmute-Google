
import React from 'react';
import ContactForm from '../ContactForm';

const ContactPage: React.FC = () => {
  return (
    <main className="flex-grow bg-slate-50">
      {/* Hero Header */}
      <section className="bg-[#0A192F] py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Contact Us</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Have questions about our curriculum? Want to book a corporate workshop? We're here to help you Unmute.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
            {/* Contact Details */}
            <div className="lg:w-1/3 space-y-8">
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
                <h3 className="text-xl font-bold text-[#0A192F] mb-6">Get in Touch</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center text-[#D4AF37] shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Us</p>
                      <p className="text-[#0A192F] font-medium">hello@unmute.co</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center text-[#D4AF37] shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Visit Us</p>
                      <p className="text-[#0A192F] font-medium">OMR, Sholinganallur,<br />Chennai, Tamil Nadu 600119</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center text-[#D4AF37] shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Office Hours</p>
                      <p className="text-[#0A192F] font-medium">Mon - Sat: 9:00 AM - 7:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#D4AF37] p-8 rounded-3xl shadow-xl text-[#0A192F]">
                <h4 className="font-bold text-lg mb-2">Corporate Training</h4>
                <p className="text-sm opacity-80 leading-relaxed mb-4">
                  We provide specialized English fluency bootcamps for tech teams across India.
                </p>
                <button className="bg-[#0A192F] text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-[#112240] transition-colors">
                  Request a Quote
                </button>
              </div>
            </div>

            {/* Contact Form Wrapper */}
            <div className="lg:w-2/3 bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-100">
              <h3 className="text-2xl font-bold text-[#0A192F] mb-8">Send us a Message</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
