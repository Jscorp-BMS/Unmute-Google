
import React, { useState } from 'react';
import { User, AppView } from '../../types';

interface RegisterProps {
  onRegister: (user: User) => void;
  onNavigate: (view: AppView) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister, onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    level: 'Intermediate'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(formData);
  };

  return (
    <div className="flex-grow flex items-center justify-center py-20 px-4 bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        <div className="bg-[#0A192F] p-8 text-center">
          <div className="w-16 h-16 bg-[#D4AF37] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-[#0A192F] font-bold text-3xl">U</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-white">Create Your Account</h2>
          <p className="text-slate-400 text-sm mt-2">Unmute your potential today</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. Karthik Raja"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="name@company.com"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Current English Level</label>
            <select 
              value={formData.level}
              onChange={(e) => setFormData({...formData, level: e.target.value})}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          
          <button 
            type="submit" 
            className="w-full py-4 bg-[#D4AF37] text-[#0A192F] font-bold rounded-xl hover:bg-[#B8962E] transition-all transform hover:scale-[1.02] shadow-xl"
          >
            Create Free Account
          </button>

          <p className="text-center text-sm text-slate-500">
            Already have an account? {' '}
            <button 
              type="button"
              onClick={() => onNavigate('login')}
              className="text-[#0A192F] font-bold hover:underline"
            >
              Login here
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
