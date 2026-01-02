
import React from 'react';

const WhyNative: React.FC = () => {
  const advantages = [
    {
      title: "Authentic Mouth Mechanics",
      description: "Native English relies on tongue and lip movements drastically different from Tamil. Shashtika teaches you the 'hidden' physical movements for sounds like 'th', 'w', and 'v' that aren't found in your mother tongue.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Beyond 'Textbook' English",
      description: "Most non-native coaches teach formal, stiff English. Shashtika introduces you to natural idiomatic expressions and 'office speak' that make you sound like a peer, not a student, in global meetings.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: "Stress & Rhythm Mastery",
      description: "Tamil is syllable-timed, but English is stress-timed. A native coach helps you find the 'musicality' of English, teaching you which words to emphasize so your speech flows naturally without the robotic 'Tamil rhythm'.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      )
    },
    {
      title: "Cultural Context & Nuance",
      description: "Understanding *what* to say is only half the battle. Shashtika coaches you on *how* to say it—mastering the subtle politeness, professional 'hedging', and cultural context that prevents misunderstandings in international business.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2 2 2 0 012 2v.65a3 3 0 01-3 3H8m10.5-3.5a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  return (
    <section id="native-advantage" className="py-24 bg-[#0A192F] text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/3">
            <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight mb-6">
              Why Learn from a <span className="text-[#D4AF37]">Native Speaker?</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Standard coaching fixes your grammar. Native coaching transforms your presence. By learning from Shashtika, you're not just learning English; you're inheriting a lifetime of natural linguistic intuition.
            </p>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-[#D4AF37] font-bold text-xl mb-2">The 1% Rule</p>
              <p className="text-sm text-slate-300">
                Only a native speaker can spot the 1% errors—the tiny nuances in tone or pace that signal 'non-native' more than any grammar mistake.
              </p>
            </div>
          </div>
          
          <div className="lg:w-2/3 grid sm:grid-cols-2 gap-6">
            {advantages.map((item, index) => (
              <div key={index} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/40 transition-all group">
                <div className="text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform inline-block">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyNative;
