
import React, { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
  solution: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, solution }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 py-4">
      <button
        className="w-full flex items-center justify-between text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-[#D4AF37]' : 'text-[#0A192F] group-hover:text-[#D4AF37]'}`}>
          {question}
        </span>
        <svg
          className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#D4AF37]' : 'text-slate-400'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 mt-4' : 'max-h-0'
        }`}
      >
        <p className="text-slate-600 leading-relaxed mb-4">
          {answer}
        </p>
        <div className="bg-[#0A192F]/5 border-l-4 border-[#D4AF37] p-4 rounded-r-lg">
          <p className="text-sm font-semibold text-[#0A192F] mb-1 uppercase tracking-wider">How Shashtika helps:</p>
          <p className="text-slate-700 italic">{solution}</p>
        </div>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "Why do I often mix up the 'L' and 'R' sounds?",
      answer: "In Tamil phonetics, the tongue position for certain retroflex sounds is very close to the English 'L' and 'R'. This can cause speakers to substitute one for the other, making words like 'Light' sound like 'Right'.",
      solution: "Shashtika uses physical mouth-positioning techniques (Mouth Mechanics) to help you isolate where your tongue should hit the palate for distinct 'L' and 'R' clarity."
    },
    {
      question: "Why does my English sound 'flat' or monotonous?",
      answer: "Tamil is a syllable-timed language, meaning every syllable gets equal weight. English is stress-timed, meaning some words are 'pushed' and others are 'swallowed'. Using Tamil rhythm for English can make you sound robotic.",
      solution: "We focus heavily on 'Word Stress' and 'Sentence Intonation' workshops, helping you master the natural musicality and 'bounce' of native English speech."
    },
    {
      question: "I find myself translating from Tamil to English in my head. How do I stop?",
      answer: "Literal translation often leads to grammatical errors because Tamil follows a Subject-Object-Verb (SOV) structure, while English uses Subject-Verb-Object (SVO). This 'mental lag' causes hesitation.",
      solution: "Our immersive 'Thinking in English' framework uses rapid-fire conversation drills that bypass your internal translator, training your brain to build English sentences directly."
    },
    {
      question: "Why do I add an 'E' or 'I' sound before words like 'School' or 'Station'?",
      answer: "This is a common linguistic phenomenon called prothesis. Since Tamil words rarely start with an 'S' followed by a consonant (S-clusters), the brain naturally adds a vowel sound to make it easier to pronounce.",
      solution: "Through focused 'Initial Cluster' exercises, we help you desensitize the 'S' sound and transition smoothly into the following consonant without the extra vowel."
    },
    {
      question: "Why is the 'H' sound sometimes missing or added where it shouldn't be?",
      answer: "The 'H' sound (Aspirate) exists differently in Tamil. Many speakers either 'drop' the H in words like 'House' or add a hard breathy sound where it doesn't belong due to regional dialect influences.",
      solution: "We utilize breath-control exercises to help you modulate the exact amount of air required for the English 'H', ensuring it sounds natural and not forced."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0A192F] mb-6">
            Linguistic <span className="text-[#D4AF37]">Insights</span>
          </h2>
          <p className="text-slate-600 text-lg">
            Addressing the unique phonetic and structural challenges faced by Tamil speakers.
          </p>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} />
          ))}
        </div>

        <div className="mt-16 p-8 rounded-3xl bg-[#0A192F] text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Have a specific challenge?</h3>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Our diagnostic session identifies your unique speaking patterns and builds a custom roadmap to fix them.
          </p>
          <a
            href="#trial"
            className="inline-block bg-[#D4AF37] text-[#0A192F] px-8 py-3 rounded-xl font-bold hover:bg-[#B8962E] transition-all transform hover:scale-105"
          >
            Get a Free Diagnostic
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
