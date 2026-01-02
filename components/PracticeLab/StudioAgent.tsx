
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Modality, Blob, LiveServerMessage } from '@google/genai';
import { SYSTEM_INSTRUCTION, SCENARIOS, Scenario } from '../../constants';
import { User } from '../../types';

// Manual Base64 Implementation
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function createBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

interface StudioAgentProps {
  user: User;
}

const StudioAgent: React.FC<StudioAgentProps> = ({ user }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState('Tap to start your session');
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(SCENARIOS[0]);
  const [showTranscript, setShowTranscript] = useState(false);
  
  // Transcription state
  const [userTranscription, setUserTranscription] = useState('');
  const [aiTranscription, setAiTranscription] = useState('');
  const [transcriptionHistory, setTranscriptionHistory] = useState<{ role: string, text: string }[]>([]);

  const audioContextRef = useRef<AudioContext | null>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const sessionRef = useRef<any>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Fix: Track next audio start time for gapless playback and active sources for interruption handling
  const nextStartTimeRef = useRef<number>(0);
  const activeSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  // Helper to scroll transcription
  useEffect(() => {
    if (showTranscript) {
      transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [userTranscription, aiTranscription, transcriptionHistory, showTranscript]);

  const drawWaveform = (analyser: AnalyserNode) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const renderFrame = () => {
      animationFrameRef.current = requestAnimationFrame(renderFrame);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      // Draw a more stylish pulsing waveform
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#D4AF37';
      ctx.lineCap = 'round';

      const sliceWidth = width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * (height / 2);

        if (i === 0) {
          ctx.moveTo(x, centerY);
        } else {
          ctx.lineTo(x, centerY + (i % 2 === 0 ? y / 2 : -y / 2));
        }

        x += sliceWidth;
      }

      ctx.lineTo(width, centerY);
      ctx.stroke();
    };
    renderFrame();
  };

  const startVoiceSession = async () => {
    try {
      setIsConnecting(true);
      setStatus('Initializing secure lab...');
      setTranscriptionHistory([]);
      
      // Fix: Strictly use the environment API key
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const source = inputAudioContextRef.current.createMediaStreamSource(stream);
      const analyser = inputAudioContextRef.current.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;
      drawWaveform(analyser);

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          systemInstruction: `${SYSTEM_INSTRUCTION}
          
          CRITICAL SPEECH INSTRUCTION: 
          Speak at approximately 75% of normal conversation speed. 
          Use clear pauses between sentences. 
          The user is a non-native speaker and needs more time to process your speech. 
          Do not rush.

          CURRENT SCENARIO: ${selectedScenario.title}
          SCENARIO DETAILS: ${selectedScenario.prompt}
          
          USER PROFILE:
          Name: ${user.name}
          Level: ${user.level}
          
          Remember to start with: "Welcome to the Unmute Studio, ${user.name}. I’m your coach. There are no mistakes here, only progress. What would you like to practice today?" (or adapt based on the ${selectedScenario.title} scenario).`,
          inputAudioTranscription: {},
          outputAudioTranscription: {}
        },
        callbacks: {
          onopen: () => {
            setIsActive(true);
            setIsConnecting(false);
            setStatus('Studio active');

            const micSource = inputAudioContextRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = inputAudioContextRef.current!.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              // Fix: CRITICAL - Solely rely on sessionPromise resolves to send realtime input
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            micSource.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContextRef.current!.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            // Fix: Handle model interruptions
            const interrupted = message.serverContent?.interrupted;
            if (interrupted) {
              for (const source of activeSourcesRef.current) {
                source.stop();
              }
              activeSourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }

            if (message.serverContent?.inputTranscription) {
              setUserTranscription(prev => prev + message.serverContent!.inputTranscription!.text);
            }
            if (message.serverContent?.outputTranscription) {
              setAiTranscription(prev => prev + message.serverContent!.outputTranscription!.text);
            }
            if (message.serverContent?.turnComplete) {
              setUserTranscription(current => {
                if (current) setTranscriptionHistory(h => [...h, { role: 'user', text: current }]);
                return '';
              });
              setAiTranscription(current => {
                if (current) setTranscriptionHistory(h => [...h, { role: 'ai', text: current }]);
                return '';
              });
            }

            const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData) {
              const audioContext = audioContextRef.current!;
              // Fix: Implement gapless playback logic
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, audioContext.currentTime);
              
              const bytes = decode(audioData);
              const buffer = await decodeAudioData(bytes, audioContext, 24000, 1);
              const source = audioContext.createBufferSource();
              source.buffer = buffer;
              source.connect(audioContext.destination);
              
              source.addEventListener('ended', () => {
                activeSourcesRef.current.delete(source);
                if (activeSourcesRef.current.size === 0) {
                  setStatus('Listening...');
                }
              });

              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              activeSourcesRef.current.add(source);
              
              setStatus('Coach is speaking...');
            }
          },
          onerror: (e) => {
            console.error('Session error', e);
            setStatus('Connection error.');
            stopSession();
          },
          onclose: () => {
            setIsActive(false);
            setStatus('Session finished.');
          }
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err: any) {
      console.error(err);
      // Fix: Handle expired API key/entity not found error
      if (err.message?.includes('Requested entity was not found') && window.aistudio) {
        setStatus('Key expired. Resetting...');
        await window.aistudio.openSelectKey();
      } else {
        setStatus('Access denied.');
      }
      setIsConnecting(false);
    }
  };

  const stopSession = () => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    sessionRef.current?.close();
    streamRef.current?.getTracks().forEach(t => t.stop());
    if (audioContextRef.current?.state !== 'closed') audioContextRef.current?.close();
    if (inputAudioContextRef.current?.state !== 'closed') inputAudioContextRef.current?.close();
    
    // Fix: Clean up active sources and playback tracking
    activeSourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
    activeSourcesRef.current.clear();
    nextStartTimeRef.current = 0;
    
    setIsActive(false);
    setIsConnecting(false);
    setStatus('Tap to start your session');
    setUserTranscription('');
    setAiTranscription('');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Scenario Selector */}
      <div className="p-6 border-b border-slate-100">
        <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Practice Scenario</label>
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              disabled={isActive}
              onClick={() => setSelectedScenario(s)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                selectedScenario.id === s.id 
                  ? 'bg-[#0A192F] text-[#D4AF37] border-[#0A192F]' 
                  : 'bg-slate-50 text-slate-500 border-slate-100 hover:border-[#D4AF37]/30'
              } ${isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span className="mr-2">{s.icon}</span>
              {s.title}
            </button>
          ))}
        </div>
        {!isActive && (
          <p className="text-xs text-slate-400 mt-2">{selectedScenario.description}</p>
        )}
      </div>

      <div className="flex-grow flex flex-col items-center justify-center p-8 text-center relative">
        {/* Voice Visualizer Area */}
        <div className="relative w-full h-48 flex items-center justify-center mb-8">
          <canvas 
            ref={canvasRef} 
            width={400} 
            height={200} 
            className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}
          />

          <div className={`relative z-10 w-40 h-40 rounded-full flex items-center justify-center transition-all duration-700 ${
            isActive ? 'bg-[#D4AF37]/5 scale-110' : 'bg-slate-50'
          }`}>
             <button 
                onClick={isActive ? stopSession : startVoiceSession}
                disabled={isConnecting}
                className={`w-32 h-32 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 transform group ${
                  isActive ? 'bg-[#D4AF37] scale-105 shadow-[#D4AF37]/20' : 'bg-[#0A192F] hover:bg-[#112240] hover:scale-105 shadow-[#0A192F]/20'
                } ${isConnecting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isActive ? (
                  <div className="flex flex-col items-center">
                    <svg className="w-12 h-12 text-[#0A192F]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                    <span className="text-[10px] font-bold text-[#0A192F] uppercase tracking-tighter mt-1">End</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <svg className="w-12 h-12 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-20a3 3 0 00-3 3v10a3 3 0 006 0V3a3 3 0 00-3-3z" />
                    </svg>
                    <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-tighter mt-1">Start</span>
                  </div>
                )}
              </button>
          </div>
        </div>

        <div className="mb-4">
          <h4 className={`text-2xl font-serif font-bold transition-colors duration-500 ${isActive ? 'text-[#D4AF37]' : 'text-[#0A192F]'}`}>
            {status}
          </h4>
        </div>

        {/* Live Transcript Toggle */}
        <div className="w-full max-w-md">
          <button 
            onClick={() => setShowTranscript(!showTranscript)}
            className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-[#D4AF37] transition-colors flex items-center mx-auto mb-4"
          >
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
            {showTranscript ? 'Hide Live Transcript' : 'Show Live Transcript'}
          </button>

          {showTranscript && (
            <div className="w-full h-32 overflow-y-auto p-4 bg-slate-50 rounded-2xl border border-slate-100 text-left space-y-3 shadow-inner custom-scrollbar text-xs leading-relaxed transition-all animate-fade-in">
              {transcriptionHistory.map((item, idx) => (
                <div key={idx} className={`${item.role === 'user' ? 'text-slate-400' : 'text-[#0A192F] font-bold'}`}>
                  <span className="opacity-50 uppercase mr-1">{item.role === 'user' ? 'You' : 'Coach'}:</span>
                  {item.text}
                </div>
              ))}
              {userTranscription && <div className="text-slate-300 italic">You: {userTranscription}...</div>}
              {aiTranscription && <div className="text-[#0A192F] font-bold">Coach: {aiTranscription}</div>}
              <div ref={transcriptEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Control Panel Bottom */}
      <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
         <div className="flex items-center space-x-2 text-slate-400">
            <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`}></div>
            <span className="text-[10px] font-bold uppercase tracking-widest">{isActive ? 'Session in progress' : 'Studio standby'}</span>
         </div>
         <div className="flex items-center space-x-4">
            <div className="text-right">
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Scenario</p>
               <p className="text-xs font-bold text-[#0A192F]">{selectedScenario.title}</p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-lg">
               {selectedScenario.icon}
            </div>
         </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #D4AF37; border-radius: 10px; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default StudioAgent;
