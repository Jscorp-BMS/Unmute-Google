
import React, { useState } from 'react';
import { User } from '../../types';
import StudioAgent from './StudioAgent';
import SceneGenerator from './SceneGenerator';

interface UnmuteStudioProps {
  user: User;
}

interface Goal {
  id: number;
  text: string;
  current: number;
  target: number;
  unit: string;
  icon: React.ReactNode;
}

const UnmuteStudio: React.FC<UnmuteStudioProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'voice' | 'visual'>('voice');
  
  // Stats
  const [stats] = useState({
    minutes: 42,
    confidence: 68,
    streak: 7
  });

  const [goals] = useState<Goal[]>([
    { 
      id: 1, 
      text: 'Voice Sessions', 
      current: 2, 
      target: 5, 
      unit: 'sessions',
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-20a3 3 0 00-3 3v10a3 3 0 006 0V3a3 3 0 00-3-3z"/></svg>
    },
    { 
      id: 2, 
      text: 'Lab Practice', 
      current: 18, 
      target: 30, 
      unit: 'mins',
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
    }
  ]);

  return (
    <div className="flex-grow flex flex-col md:flex-row h-[calc(100vh-80px)] overflow-hidden">
      {/* Sidebar - Quick Stats & Goals */}
      <aside className={`hidden md:flex w-80 bg-white border-r border-slate-200 flex-col p-6 space-y-8 overflow-y-auto custom-scrollbar`}>
        {/* Confidence Dashboard */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Studio Dashboard</h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
             <div className="p-4 bg-[#0A192F] rounded-2xl text-white">
                <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-1">Confidence</p>
                <div className="flex items-baseline space-x-1">
                   <span className="text-2xl font-bold">{stats.confidence}</span>
                   <span className="text-[10px] opacity-60">/100</span>
                </div>
             </div>
             <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Time Today</p>
                <div className="flex items-baseline space-x-1">
                   <span className="text-2xl font-bold text-[#0A192F]">{stats.minutes}</span>
                   <span className="text-[10px] text-slate-400">min</span>
                </div>
             </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Weekly Goals</h3>
          </div>
          
          <div className="space-y-3">
            {goals.map((goal) => {
              const percentage = Math.min(100, (goal.current / goal.target) * 100);
              return (
                <div key={goal.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="text-[#D4AF37]">
                        {goal.icon}
                      </div>
                      <span className="text-xs font-bold text-[#0A192F]">{goal.text}</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">
                      {goal.current}/{goal.target}
                    </span>
                  </div>
                  <div className="relative w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-[#D4AF37] rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(212,175,55,0.4)]"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <nav className="space-y-1">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Studio Modes</h3>
          <button 
            onClick={() => setActiveTab('voice')}
            className={`w-full text-left p-3 rounded-xl transition-all text-sm font-bold flex items-center space-x-3 ${activeTab === 'voice' ? 'bg-[#0A192F] text-[#D4AF37] shadow-lg shadow-[#0A192F]/20' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-20a3 3 0 00-3 3v10a3 3 0 006 0V3a3 3 0 00-3-3z"/></svg>
            <span>Voice Lab</span>
          </button>
          <button 
            onClick={() => setActiveTab('visual')}
            className={`w-full text-left p-3 rounded-xl transition-all text-sm font-bold flex items-center space-x-3 ${activeTab === 'visual' ? 'bg-[#0A192F] text-[#D4AF37] shadow-lg shadow-[#0A192F]/20' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            <span>Visual Scenario</span>
          </button>
        </nav>

        <div className="mt-auto p-5 bg-gradient-to-br from-[#0A192F] to-[#112240] rounded-2xl text-white shadow-xl">
          <div className="flex items-center space-x-2 mb-2">
            <span className="bg-[#D4AF37] text-[#0A192F] text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-tighter">Coach Tip</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed italic">
            "Don't worry about being perfect. Just focus on being understood. Fluency comes with volume!"
          </p>
        </div>
      </aside>

      {/* Main Studio Area */}
      <main className="flex-grow bg-[#0A192F]/5 flex flex-col items-center p-4 md:p-8 relative overflow-y-auto custom-scrollbar">
        <div className="max-w-4xl w-full flex flex-col items-center">
          <div className="text-center mb-8">
            <div className="inline-block mb-3 px-3 py-1 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/20">
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">Private Practice Studio</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#0A192F] mb-4 tracking-tight">
              {activeTab === 'voice' ? 'Lead Coach Session' : 'Visual Context Lab'}
            </h1>
            <p className="text-slate-500 max-w-md mx-auto text-sm">
              Practicing with Shashtika AI at <span className="text-[#D4AF37] font-bold">{user.level}</span> level. 
              <br />Today is day {stats.streak} of your fluency streak!
            </p>
          </div>

          <div className="w-full max-w-2xl bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden relative min-h-[600px] flex flex-col">
            {activeTab === 'voice' ? (
              <StudioAgent user={user} />
            ) : (
              <SceneGenerator user={user} />
            )}
          </div>

          <div className="mt-8 flex items-center space-x-8 text-slate-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-bold uppercase tracking-wider">Encrypted Audio Tunnel</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              <span className="text-[10px] font-bold uppercase tracking-wider">Zero-Judgment Space</span>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #CBD5E1;
        }
      `}</style>
    </div>
  );
};

export default UnmuteStudio;
