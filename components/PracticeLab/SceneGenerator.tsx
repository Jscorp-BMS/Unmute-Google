
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { User } from '../../types';

interface SceneGeneratorProps {
  user: User;
}

const SceneGenerator: React.FC<SceneGeneratorProps> = ({ user }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateScene = async (customPrompt?: string) => {
    const finalPrompt = customPrompt || prompt;
    if (!finalPrompt.trim()) return;

    setIsGenerating(true);
    setError(null);
    try {
      // Use process.env.API_KEY directly as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: `A professional, clear photograph of ${finalPrompt} for an English conversation practice. High resolution, realistic lighting.`,
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: "16:9"
          }
        },
      });

      let imageUrl = null;
      // Safety check for candidates and content
      const candidate = response.candidates?.[0];
      if (candidate && candidate.content && candidate.content.parts) {
        for (const part of candidate.content.parts) {
          if (part.inlineData) {
            imageUrl = `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
            break;
          }
        }
      }

      if (imageUrl) {
        setGeneratedImage(imageUrl);
      } else {
        setError('The model did not return an image. This might be due to safety filters or a temporary issue. Please try a more specific prompt.');
      }
    } catch (err) {
      console.error('Image generation error:', err);
      setError('Failed to reach the AI Studio. Please ensure your connection is stable and try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const presets = [
    { 
      name: 'Coffee Shop in London', 
      prompt: 'A cozy modern coffee shop in London with a barista serving a customer. Professional photography.',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop'
    },
    { 
      name: 'Job Interview Room', 
      prompt: 'A modern corporate office interview room with two professional recruiters waiting for a candidate. Professional lighting.',
      image: 'https://images.unsplash.com/photo-1573161546137-f7b748637388?q=80&w=2069&auto=format&fit=crop'
    },
    { 
      name: 'Airport Check-in', 
      prompt: 'A busy international airport check-in counter with staff and passengers. Wide shot.',
      image: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=2070&auto=format&fit=crop'
    },
    { 
      name: 'University Campus', 
      prompt: 'Students sitting on a university campus lawn talking in small groups. Sunlight, academic atmosphere.',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop'
    }
  ];

  return (
    <div className="flex flex-col h-full p-6 md:p-8 space-y-6">
      <div className="text-left">
        <h3 className="text-xl font-bold text-[#0A192F]">Scenario Generator</h3>
        <p className="text-sm text-slate-500">Visualize where you want to practice your English today.</p>
      </div>

      {!generatedImage && !isGenerating && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {presets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => generateScene(preset.prompt)}
              className="p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-[#D4AF37]/40 hover:bg-white transition-all text-left group shadow-sm overflow-hidden"
            >
              <div className="w-full h-24 bg-slate-200 rounded-lg mb-3 overflow-hidden flex items-center justify-center">
                 <img src={preset.image} alt={preset.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
              </div>
              <span className="text-xs font-bold text-[#0A192F]">{preset.name}</span>
            </button>
          ))}
        </div>
      )}

      {isGenerating && (
        <div className="flex-grow flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <div className="w-24 h-24 border-4 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
               <svg className="w-8 h-8 text-[#D4AF37] animate-pulse" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/></svg>
            </div>
          </div>
          <p className="text-[#0A192F] font-bold animate-pulse text-center">Shashtika AI is painting your scene...<br/><span className="text-xs font-normal text-slate-400">This usually takes about 5-10 seconds.</span></p>
        </div>
      )}

      {generatedImage && (
        <div className="flex-grow space-y-4 animate-fade-in">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100 group">
            <img src={generatedImage} alt="Generated Practice Scene" className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <button 
              onClick={() => setGeneratedImage(null)}
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/40 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <div className="p-4 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20">
             <p className="text-sm font-bold text-[#0A192F] flex items-center mb-1">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"/></svg>
                Visual Practice Guide:
             </p>
             <p className="text-xs text-[#0A192F] italic">
               "Imagine you are in this setting. What is the first thing you say to the person next to you? Try using 'Excuse me...' or 'I was wondering if...'"
             </p>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-xs font-medium border border-red-100 animate-shake">
          {error}
        </div>
      )}

      <div className="pt-4 mt-auto border-t border-slate-100 flex space-x-2">
        <input 
          type="text" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your practice scene (e.g. A busy London office)"
          className="flex-grow bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] outline-none"
        />
        <button 
          onClick={() => generateScene()}
          disabled={isGenerating || !prompt.trim()}
          className="bg-[#0A192F] text-[#D4AF37] p-3 rounded-xl disabled:opacity-50 hover:bg-[#112240] transition-colors shadow-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
        </button>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default SceneGenerator;
