
import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <main className="flex-grow bg-white py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0A192F] mb-8">Terms of Service</h1>
        <p className="text-slate-500 mb-12">Effective Date: October 2023</p>

        <div className="space-y-10 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-[#0A192F] mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Unmute's website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A192F] mb-4">2. Service Description</h2>
            <p>
              Unmute provides premium English coaching specifically designed for Tamil speakers. Our services include live 1-on-1 sessions, digital workshops, and AI-powered practice tools in the Unmute Studio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A192F] mb-4">3. User Accounts</h2>
            <p>
              To access certain features like the Practice Lab, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A192F] mb-4">4. Payments and Refunds</h2>
            <p>
              Subscriptions and trial offers are billed in advance. Due to the personalized nature of our coaching and digital access, refunds are handled on a case-by-case basis as detailed in our refund policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A192F] mb-4">5. Intellectual Property</h2>
            <p>
              All content provided by Unmute, including curriculum materials, branding, and the AI Practice Lab interface, is the property of Unmute and protected by intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A192F] mb-4">6. Limitation of Liability</h2>
            <p>
              Unmute is not liable for any indirect, incidental, or consequential damages arising from your use of the service. We provide the AI coaching tools "as is" and do not guarantee specific fluency outcomes as results depend on individual practice and effort.
            </p>
          </section>

          <section className="pt-10 border-t border-slate-100">
            <p className="text-sm text-slate-500">
              If you have any questions about these Terms, please reach out to <span className="text-[#D4AF37] font-medium">legal@unmute.co</span>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default TermsOfService;
