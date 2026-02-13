import React, { useState } from 'react';
import { 
  Shield, Activity, Users, Globe, Settings, 
  BarChart, Sliders, AlertTriangle
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const [weights, setWeights] = useState({
    expertise: 85,
    scarcity: 60,
    cost: 40,
    risk: 90
  });

  const WeightSlider = ({ label, val, k }: any) => (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="text-slate-500">{val}% Influence</span>
      </div>
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={val} 
        onChange={(e) => setWeights({...weights, [k]: parseInt(e.target.value)})}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
      />
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-100 font-sans text-slate-900">
       <aside className="w-20 lg:w-64 bg-slate-900 flex flex-col items-center lg:items-stretch py-6">
         <div className="text-white font-bold text-xl px-6 mb-8 hidden lg:block">Admin Panel</div>
         <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold lg:hidden mb-8">A</div>
         
         <div className="space-y-2 w-full">
            {[
              { icon: Activity, label: 'Market Pulse' },
              { icon: Sliders, label: 'Scoring Weights', active: true },
              { icon: Globe, label: 'Visa Engine' },
              { icon: Users, label: 'Governance' },
            ].map(item => (
              <div key={item.label} className={`flex items-center gap-3 px-6 py-3 cursor-pointer ${item.active ? 'bg-slate-800 text-white border-r-2 border-brand-500' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
                <item.icon className="w-5 h-5" />
                <span className="hidden lg:block text-sm font-medium">{item.label}</span>
              </div>
            ))}
         </div>
       </aside>

       <main className="flex-1 p-8 overflow-y-auto">
         <header className="mb-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-slate-900">Scoring Logic Governance</h1>
            <div className="flex items-center gap-2 text-sm text-slate-500">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
               AI Models Online (v2.4.1)
            </div>
         </header>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Control Panel */}
            <div className="col-span-2 space-y-6">
               <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-slate-400" /> Global Weighting
                  </h2>
                  <div className="space-y-6 max-w-lg">
                    <WeightSlider label="Skill Expertise Match" val={weights.expertise} k="expertise" />
                    <WeightSlider label="Talent Scarcity Bonus" val={weights.scarcity} k="scarcity" />
                    <WeightSlider label="Cost Efficiency" val={weights.cost} k="cost" />
                    <WeightSlider label="Risk Aversion" val={weights.risk} k="risk" />
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-slate-100 flex gap-4">
                     <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800">Deploy Changes</button>
                     <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium">Reset Default</button>
                  </div>
               </div>

               <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" /> Anomaly Detection
                  </h2>
                  <table className="w-full text-sm text-left">
                     <thead className="bg-slate-50 text-slate-500">
                       <tr>
                         <th className="p-3">Event</th>
                         <th className="p-3">Severity</th>
                         <th className="p-3">Time</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                       <tr>
                         <td className="p-3">Unusual bid volume from IP block 192.168.x.x</td>
                         <td className="p-3 text-amber-600 font-medium">Medium</td>
                         <td className="p-3 text-slate-500">2m ago</td>
                       </tr>
                       <tr>
                         <td className="p-3">Salary deviation detected for Role: LLM Engineer</td>
                         <td className="p-3 text-slate-600">Low</td>
                         <td className="p-3 text-slate-500">1h ago</td>
                       </tr>
                     </tbody>
                  </table>
               </div>
            </div>

            {/* Live Simulation Preview */}
            <div className="bg-slate-900 text-white rounded-xl shadow-xl p-6 flex flex-col">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Impact Simulation</h3>
              
              <div className="flex-1 flex flex-col justify-center space-y-8">
                 <div className="space-y-2">
                   <div className="flex justify-between text-sm">
                     <span className="text-slate-300">Target Match Rate</span>
                     <span className="font-bold text-emerald-400">{(weights.expertise * 0.4 + weights.scarcity * 0.2).toFixed(1)}%</span>
                   </div>
                   <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                     <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${(weights.expertise * 0.4 + weights.scarcity * 0.2)}%` }}></div>
                   </div>
                 </div>

                 <div className="space-y-2">
                   <div className="flex justify-between text-sm">
                     <span className="text-slate-300">Est. Time to Hire</span>
                     <span className="font-bold text-blue-400">{(40 - (weights.cost * 0.1)).toFixed(1)} Days</span>
                   </div>
                   <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                     <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${60}%` }}></div>
                   </div>
                 </div>

                 <div className="space-y-2">
                   <div className="flex justify-between text-sm">
                     <span className="text-slate-300">Risk Filter Strictness</span>
                     <span className="font-bold text-rose-400">{weights.risk > 80 ? 'High' : 'Moderate'}</span>
                   </div>
                   <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                     <div className="bg-rose-500 h-full transition-all duration-500" style={{ width: `${weights.risk}%` }}></div>
                   </div>
                 </div>
              </div>

              <div className="mt-8 p-4 bg-slate-800/50 rounded-lg text-xs text-slate-400 leading-relaxed border border-slate-700">
                Increasing <strong>Risk Aversion</strong> above 85% will filter out 22% of current active candidates, potentially increasing Time-to-Hire by 4 days.
              </div>
            </div>
         </div>
       </main>
    </div>
  );
};