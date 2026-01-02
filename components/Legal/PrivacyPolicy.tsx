
import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <main className="flex-grow bg-white py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0A192F] mb-8">Privacy Policy</h1>
        <p className="text-slate-500 mb-12">Last Updated: October 2023</p>

        <div className="space-y-10 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-[#0A192F] mb-4">1. Introduction</h2>
            <p>
              At Unmute, we take your privacy seriously. This policy describes how we collect, use, and handle your personal information when you use our English coaching services, including our AI Practice Lab.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A192F] mb-4">2. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-3">
              <li><strong>Account Information:</strong> Name, email address, and English proficiency level provided during registration.</li>
              <li><strong>Usage Data:</strong> Information on how you interact with our studio, session frequency, and progress metrics.</li>
              <li><strong>Audio Data:</strong> In our Unmute Studio, we process your voice input in real-time to provide coaching feedback. This audio data is processed by our AI models to generate transcriptions and corrections.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A192F] mb-4">3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-5 mt-4 space-y-3">
              <li>Provide and improve our English coaching services.</li>
              <li>Personalize your experience in the Unmute Studio.</li>
              <li>Track your progress and provide detailed feedback on pronunciation.</li>
              <li>Communicate with you regarding your account and sessions.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A192F] mb-4">4. Data Security</h2>
            <p>
              We implement robust security measures to protect your personal data. All audio streaming and transcriptions in the Practice Lab are handled through secure, encrypted connections. We do not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#0A192F] mb-4">5. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal data. If you wish to close your account or have your data removed, please contact our support team.
            </p>
          </section>

          <section className="pt-10 border-t border-slate-100">
            <p className="text-sm text-slate-500">
              For any questions regarding this Privacy Policy, please contact us at <span className="text-[#D4AF37] font-medium">privacy@unmute.co</span>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
