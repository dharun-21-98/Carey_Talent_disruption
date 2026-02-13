import React, { useState } from 'react';
import { 
  Briefcase, Search, Plus, UserCheck, Settings, 
  Filter, ChevronDown, Check, X, Eye, BarChart3,
  MoreHorizontal, Clock, MapPin, Users, Globe, 
  Plane, Laptop, Star, DollarSign, Shield,
  HelpCircle, AlertCircle
} from 'lucide-react';
import { SAMPLE_CANDIDATES, ARJUN_PROFILE, Candidate } from '../types';

// Simplified Tooltip Component - only for small icons if needed, or we can rely on standard title for cleaner UI
// Removing the large black popovers as requested ("remove previews")
const Tooltip = ({ children, text }: { children: React.ReactNode, text: string }) => (
  <div className="relative group inline-block" title={text}>
    {children}
  </div>
);

interface CandidateCardProps {
  candidate: Candidate;
  viewMode: 'HR' | 'Manager';
  onClick: (c: Candidate) => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, viewMode, onClick }) => {
  return (
    <div 
      className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
      onClick={() => onClick(candidate)}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <img src={candidate.avatar} className="w-14 h-14 rounded-xl object-cover shadow-sm" alt="" />
          <div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{candidate.name}</h3>
            <div className="flex items-center gap-2 text-sm text-slate-600 mt-0.5">
              <span className="font-medium">{candidate.role}</span>
              {candidate.targetLocation && (
                <span className="text-slate-400 text-xs flex items-center gap-1 ml-1">
                  <MapPin className="w-3 h-3" />
                  {candidate.location} <span className="text-slate-300">→</span> {candidate.targetLocation.replace('Open to ', '')}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-1">
          {candidate.isRemoteReady && (
             <div className="p-1.5 bg-slate-100 rounded text-slate-500" title="Remote Ready">
               <Laptop className="w-4 h-4" />
             </div>
          )}
          {candidate.needsRelocation && (
             <div className="p-1.5 bg-slate-100 rounded text-slate-500" title="Relocation Needed">
               <Plane className="w-4 h-4" />
             </div>
          )}
          {candidate.needsVisa && (
             <div className="p-1.5 bg-blue-50 rounded text-blue-600" title={`Visa Required: ${candidate.visaStatus}`}>
               <Globe className="w-4 h-4" />
             </div>
          )}
        </div>
      </div>

      {/* Metrics Grid - Aligned & Cleaned */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100 items-start">
        
        {/* Speed */}
        <div className="flex flex-col gap-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            Start Time
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${
              candidate.hiringSpeed === 'Fast' ? 'bg-emerald-500' : 
              candidate.hiringSpeed === 'Medium' ? 'bg-amber-400' : 'bg-red-500'
            }`}></div>
            <span className="text-sm font-bold text-slate-900">{candidate.hiringSpeed}</span>
          </div>
          <div className="text-[10px] text-slate-500 truncate" title={candidate.hiringSpeedLabel}>{candidate.hiringSpeedLabel}</div>
        </div>

        {/* Skill */}
        <div className="flex flex-col gap-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Skill Level</div>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                key={i} 
                className={`w-3 h-3 ${i < candidate.starRating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} 
                />
              ))}
            </div>
            <div className="text-[10px] text-slate-500 truncate" title={candidate.starLabel}>
              {candidate.starRating === 5 ? 'Elite' : candidate.starRating === 4 ? 'Strong' : 'Solid'}
            </div>
        </div>

        {/* Cost */}
        <div className="flex flex-col gap-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hiring Cost</div>
          <div className="text-sm font-bold text-slate-900">{candidate.costTier}</div>
          <div className="text-[10px] text-slate-500 capitalize">
            {candidate.costTier === '$$$' ? 'High' : candidate.costTier === '$$' ? 'Medium' : 'Low'}
          </div>
        </div>

        {/* Stability */}
        <div className="flex flex-col gap-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Stability</div>
          <div className="flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${
              candidate.stability === 'Low Risk' ? 'bg-emerald-500' : 
              candidate.stability === 'Medium Risk' ? 'bg-amber-500' : 'bg-red-500'
            }`}></div>
            <span className="text-sm font-bold text-slate-900">{candidate.stability.split(' ')[0]}</span>
          </div>
          <div className="text-[10px] text-slate-500">Risk Score</div>
        </div>
      </div>

      {/* Highlights */}
      <div className="space-y-2 mb-4">
        {candidate.highlights.map((h, i) => (
          <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
              <Check className="w-3.5 h-3.5 text-brand-600 shrink-0 mt-0.5" />
              <span>{h}</span>
          </div>
        ))}
      </div>

      {/* Dynamic View Content */}
      <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
          {viewMode === 'HR' ? (
            <div className="flex gap-4 text-slate-500">
              <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" /> {candidate.visaStatus}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {candidate.experience}</span>
            </div>
          ) : (
            <div className="flex gap-2">
              {candidate.skills.slice(0, 3).map(s => (
                <span key={s} className="px-2 py-0.5 bg-slate-100 rounded text-slate-600 font-medium">{s}</span>
              ))}
              {candidate.skills.length > 3 && <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-400">+</span>}
            </div>
          )}
          <span className="font-bold text-brand-600 group-hover:underline">View Card</span>
      </div>
    </div>
  );
};

export const EmployerView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'search' | 'jobs' | 'team'>('search');
  const [viewMode, setViewMode] = useState<'HR' | 'Manager'>('Manager');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  // Mock Data for Employer Internal Views
  const MY_JOBS = [
    { id: 'j1', title: 'Senior LLM Engineer', location: 'San Francisco, CA', salary: '$140k - $180k', applicants: 32, status: 'Active', posted: '2 days ago', type: 'On-site' },
    { id: 'j2', title: 'Robotics Control Systems Lead', location: 'San Francisco, CA', salary: '$160k - $210k', applicants: 18, status: 'Active', posted: '5 days ago', type: 'Hybrid' },
    { id: 'j3', title: 'Computer Vision Intern', location: 'Remote', salary: '$50/hr', applicants: 145, status: 'Paused', posted: '2 weeks ago', type: 'Remote' },
    { id: 'j4', title: 'AI Product Manager', location: 'San Francisco, CA', salary: '$190k - $240k', applicants: 8, status: 'Draft', posted: '1 day ago', type: 'On-site' }
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-400 flex flex-col hidden md:flex shrink-0">
        <div className="p-6">
          <div className="flex items-center gap-2 text-white font-bold text-xl">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-sm">R</div>
            Robotics AI
          </div>
        </div>
        <div className="flex-1 px-4 space-y-1">
          {[
            { id: 'dashboard', icon: BarChart3, label: 'Overview' },
            { id: 'search', icon: Search, label: 'Talent Search' },
            { id: 'jobs', icon: Briefcase, label: 'Active Jobs' },
            { id: 'team', icon: UserCheck, label: 'Candidates' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>
        <div className="p-4">
           {/* Sidebar subscription widget */}
          <div className="bg-slate-800 rounded-xl p-4">
             <p className="text-xs font-semibold text-slate-500 uppercase">Subscription</p>
             <p className="text-white font-bold mt-1">Tier 1 Strategic</p>
             <div className="w-full bg-slate-700 h-1 mt-3 rounded-full overflow-hidden">
               <div className="bg-emerald-500 w-3/4 h-full"></div>
             </div>
             <p className="text-[10px] mt-1 text-slate-500">4/5 Active Jobs Used</p>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-slate-800 capitalize">{activeTab}</h1>
          </div>
          <button className="px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Post New Job
          </button>
        </header>

        <div className="flex-1 p-6 md:p-8 max-w-screen-2xl mx-auto w-full">
           {activeTab === 'search' && (
             <div className="flex flex-col lg:flex-row gap-6 h-full">
               {/* Filters Sidebar */}
               <div className="w-full lg:w-72 shrink-0 space-y-6 overflow-y-auto pr-2 pb-10">
                  {/* View Toggle */}
                  <div className="bg-slate-100 p-1 rounded-lg flex text-sm font-medium mb-4">
                    <button 
                      onClick={() => setViewMode('HR')}
                      className={`flex-1 py-1.5 rounded-md transition-all ${viewMode === 'HR' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      HR View
                    </button>
                    <button 
                      onClick={() => setViewMode('Manager')}
                      className={`flex-1 py-1.5 rounded-md transition-all ${viewMode === 'Manager' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      Manager View
                    </button>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-3">Primary Expertise</h4>
                    <div className="space-y-2">
                      {['LLM Engineer', 'Computer Vision', 'ML Ops', 'Data Scientist'].map(r => (
                        <label key={r} className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 cursor-pointer">
                          <input type="checkbox" className="rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                          {r}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-3">Start Time (Speed)</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                         <div className="w-3 h-3 rounded-full bg-emerald-500"></div> Fast (30 days)
                         <input type="checkbox" className="ml-auto rounded border-slate-300 text-brand-600" />
                      </label>
                      <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                         <div className="w-3 h-3 rounded-full bg-amber-400"></div> Medium (1-3 mo)
                         <input type="checkbox" className="ml-auto rounded border-slate-300 text-brand-600" />
                      </label>
                      <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                         <div className="w-3 h-3 rounded-full bg-red-500"></div> Slow (3+ mo)
                         <input type="checkbox" className="ml-auto rounded border-slate-300 text-brand-600" />
                      </label>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-3">Skill Level</h4>
                     <div className="space-y-2">
                      {['Elite (Top 1%)', 'Strong (Top 10%)', 'Solid (Senior)'].map(r => (
                        <label key={r} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                          <input type="checkbox" className="rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                          {r}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-3">Hiring Cost</h4>
                     <div className="flex gap-2">
                        {['$', '$$', '$$$'].map(c => (
                          <button key={c} className="flex-1 py-1.5 border border-slate-200 rounded text-sm font-medium hover:bg-slate-50 text-slate-600">{c}</button>
                        ))}
                     </div>
                  </div>

                  <div>
                     <h4 className="font-bold text-slate-900 text-sm mb-3">Requirements</h4>
                     <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                          <input type="checkbox" className="rounded border-slate-300 text-brand-600" />
                          Visa Sponsorship OK
                        </label>
                        <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                          <input type="checkbox" className="rounded border-slate-300 text-brand-600" />
                          Relocation Budget OK
                        </label>
                     </div>
                  </div>
               </div>

               {/* Results Area */}
               <div className="flex-1">
                  <div className="flex justify-between items-center mb-4">
                     <div className="text-sm text-slate-500">Showing <span className="font-bold text-slate-900">32</span> Verified Candidates</div>
                     <div className="flex gap-3">
                        <select className="bg-white border border-slate-200 rounded-lg text-sm px-3 py-1.5 outline-none focus:border-brand-500 text-slate-600">
                           <option>Sort by: Best Match</option>
                           <option>Sort by: Fastest Start</option>
                           <option>Sort by: Lowest Cost</option>
                           <option>Sort by: Highest Skill</option>
                        </select>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 pb-10">
                     {SAMPLE_CANDIDATES.map(candidate => (
                       <CandidateCard 
                         key={candidate.id} 
                         candidate={candidate} 
                         viewMode={viewMode}
                         onClick={(c) => setSelectedCandidate(c)}
                       />
                     ))}
                  </div>
               </div>
             </div>
           )}

           {activeTab === 'dashboard' && (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-slate-500 text-sm font-medium">Active Pipelines</h3>
                  <div className="text-3xl font-bold text-slate-900 mt-2">4 Jobs</div>
                  <div className="text-sm text-green-600 mt-1 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> 32 Active Candidates</div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-slate-500 text-sm font-medium">Avg Time to Hire</h3>
                  <div className="text-3xl font-bold text-slate-900 mt-2">5.2 Weeks</div>
                  <div className="text-sm text-slate-400 mt-1">-1.2 weeks vs Industry Avg</div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-slate-500 text-sm font-medium">Projected Spend</h3>
                  <div className="text-3xl font-bold text-slate-900 mt-2">$42k</div>
                  <div className="text-sm text-slate-400 mt-1">Next invoice: Aug 1</div>
                </div>
             </div>
           )}
           
           {/* Placeholder for other tabs if clicked */}
           {(activeTab === 'jobs' || activeTab === 'team') && (
             <div className="text-center py-20 bg-white rounded-xl border border-slate-200 border-dashed">
                <h3 className="text-slate-400 font-medium">Module hidden for this demo view focus</h3>
                <button onClick={() => setActiveTab('search')} className="mt-4 text-brand-600 font-medium hover:underline">Return to Talent Search</button>
             </div>
           )}
        </div>
      </main>

      {/* Candidate Modal (Simplified for Demo) */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-end">
           <div className="w-full max-w-2xl bg-white h-full shadow-2xl p-8 animate-float-in overflow-y-auto">
              <button onClick={() => setSelectedCandidate(null)} className="mb-6 text-slate-400 hover:text-slate-600">Close</button>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">{selectedCandidate.name}</h2>
              <p className="text-xl text-slate-500 mb-6">{selectedCandidate.role}</p>
              
              <div className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                   <h3 className="font-bold text-slate-900 mb-4">Detailed Breakdown</h3>
                   <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                         <span className="text-slate-600">Cost Structure</span>
                         <span className="font-mono text-slate-900">{JSON.stringify(selectedCandidate.costBreakdown)}</span>
                      </div>
                      <div className="flex justify-between">
                         <span className="text-slate-600">Visa Status</span>
                         <span className="font-medium text-slate-900">{selectedCandidate.visaStatus}</span>
                      </div>
                      <div className="flex justify-between">
                         <span className="text-slate-600">Stability Risk</span>
                         <span className={`font-bold ${selectedCandidate.stability === 'Low Risk' ? 'text-emerald-600' : 'text-amber-600'}`}>{selectedCandidate.stability}</span>
                      </div>
                   </div>
                </div>
                
                <div>
                   <h3 className="font-bold text-slate-900 mb-2">Detailed Highlights</h3>
                   <ul className="list-disc list-inside space-y-1 text-slate-600">
                      {selectedCandidate.highlights.map(h => <li key={h}>{h}</li>)}
                   </ul>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                 <button className="flex-1 py-3 bg-slate-900 text-white rounded-xl font-bold shadow-lg hover:bg-slate-800">Request Interview</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};