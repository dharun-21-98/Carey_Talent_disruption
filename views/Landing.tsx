import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Globe, Shield, Zap } from 'lucide-react';
import { AIEngineViz } from '../components/AIEngineViz';

interface LandingProps {
  onEnterApp: (role: 'talent' | 'employer') => void;
}

export const Landing: React.FC<LandingProps> = ({ onEnterApp }) => {
  const [showToast, setShowToast] = useState(false);

  const handleComingSoon = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-float-in">
          <div className="bg-slate-800 text-white px-6 py-3 rounded-full shadow-2xl border border-slate-700 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="font-medium text-sm">Feature Coming Soon</span>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center font-bold">T</div>
          <span className="text-xl font-bold tracking-tight">Talent Disruption</span>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium text-slate-400">
          <a href="#" onClick={handleComingSoon} className="hover:text-white transition-colors">Solutions</a>
          <a href="#" onClick={handleComingSoon} className="hover:text-white transition-colors">Manifesto</a>
          <a href="#" onClick={handleComingSoon} className="hover:text-white transition-colors">Pricing</a>
          <button onClick={() => onEnterApp('employer')} className="text-white hover:text-brand-300">Log In</button>
        </div>
      </nav>

      {/* Hero */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-32">
        {/* Swapped order: Visual first (Left), Text second (Right) on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Visual Column (Now First) */}
          <div className="relative order-1">
             <div className="absolute -inset-4 bg-brand-500/20 blur-3xl rounded-full opacity-30"></div>
             <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
               <div className="flex items-center justify-between mb-8">
                 <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Real-time Computation</h3>
                 <div className="flex gap-2">
                   <div className="w-2 h-2 rounded-full bg-red-500"></div>
                   <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                   <div className="w-2 h-2 rounded-full bg-green-500"></div>
                 </div>
               </div>
               
               <div className="flex justify-center py-8">
                 <AIEngineViz />
               </div>

               <div className="grid grid-cols-3 gap-4 mt-8">
                 <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                   <div className="text-xs text-slate-500 mb-1">Talent Value</div>
                   <div className="text-2xl font-bold text-white">98.4</div>
                 </div>
                 <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                   <div className="text-xs text-slate-500 mb-1">Time to Hire</div>
                   <div className="text-2xl font-bold text-emerald-400">12d</div>
                 </div>
                 <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                   <div className="text-xs text-slate-500 mb-1">Risk Score</div>
                   <div className="text-2xl font-bold text-blue-400">Low</div>
                 </div>
               </div>
             </div>
          </div>

          {/* Text Column (Now Second) */}
          <div className="space-y-8 order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span>
              AI-First Hiring Engine v2.0 Live
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              AI Talent Meets <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-400">Intelligent Hiring</span>
            </h1>
            
            <p className="text-xl text-slate-400 max-w-lg leading-relaxed">
              Visa-aware. Cost-modeled. Skill-verified. <br/>
              The first marketplace built specifically for autonomous hiring in the age of AI.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => onEnterApp('talent')}
                className="px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold hover:bg-slate-100 transition-all flex items-center justify-center gap-2 group"
              >
                Join as Talent
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => onEnterApp('employer')}
                className="px-8 py-4 bg-slate-800 text-white border border-slate-700 rounded-xl font-semibold hover:bg-slate-700 transition-all"
              >
                Hire AI Talent
              </button>
            </div>

            <div className="flex items-center gap-6 pt-8 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-500" />
                <span>Verified Skills</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-500" />
                <span>Global Visa Logic</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-500" />
                <span>Risk Modeling</span>
              </div>
            </div>
          </div>

        </div>

        {/* Testimonials */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-slate-800 pt-16">
          {[
            { quote: "Finally, a platform that understands the nuance of 'LLM Engineer' vs 'ML Ops'.", author: "Sarah J., CTO Robotics Startup" },
            { quote: "The visa handling logic saved us 3 months of legal back-and-forth.", author: "Markus W., AI Research Director" },
            { quote: "I got hired in 2 weeks. The skill verification was tough but fair.", author: "Arjun M., Senior Engineer" }
          ].map((t, i) => (
            <div key={i} className="space-y-4">
              <p className="text-lg text-slate-300 italic">"{t.quote}"</p>
              <div className="text-sm font-medium text-brand-400">{t.author}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};