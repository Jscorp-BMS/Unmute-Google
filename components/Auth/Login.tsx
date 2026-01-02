
import React, { useState } from 'react';
import { User, AppView } from '../../types';

interface LoginProps {
  onLogin: (user: User) => void;
  onNavigate: (view: AppView) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    onLogin({
      name: email.split('@')[0],
      email: email,
      level: 'Intermediate'
    });
  };

  return (
    <div className="flex-grow flex items-center justify-center py-20 px-4 bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        <div className="bg-[#0A192F] p-8 text-center">
          <div className="w-16 h-16 bg-[#D4AF37] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-[#0A192F] font-bold text-3xl">U</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-white">Welcome Back</h2>
          <p className="text-slate-400 text-sm mt-2">Login to enter the Practice Lab</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
            <input 
              type="password" 
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full py-4 bg-[#0A192F] text-white font-bold rounded-xl hover:bg-[#112240] transition-all transform hover:scale-[1.02] shadow-xl"
          >
            Login to Studio
          </button>

          <p className="text-center text-sm text-slate-500">
            Don't have an account? {' '}
            <button 
              type="button"
              onClick={() => onNavigate('register')}
              className="text-[#D4AF37] font-bold hover:underline"
            >
              Sign up free
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
