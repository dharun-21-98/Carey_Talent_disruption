import React, { useState } from 'react';
import { 
  Briefcase, Search, User, Bell, ChevronRight, Zap, 
  MapPin, Clock, DollarSign, ShieldCheck, CheckCircle, 
  AlertTriangle, Star, Upload, FileText 
} from 'lucide-react';
import { SAMPLE_JOBS, ARJUN_PROFILE, Job } from '../types';

export const TalentView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'jobs' | 'profile'>('dashboard');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [step, setStep] = useState(1);

  const StatCard = ({ label, value, sub, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
        </div>
        <div className={`p-2 rounded-lg bg-${color}-50 text-${color}-600`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <p className="text-sm text-slate-600">{sub}</p>
    </div>
  );

  const JobApplicationModal = () => {
    if (!selectedJob) return null;
    return (
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Apply to {selectedJob.company}</h2>
              <p className="text-sm text-slate-500">{selectedJob.title}</p>
            </div>
            <button onClick={() => setSelectedJob(null)} className="text-slate-400 hover:text-slate-600">✕</button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto">
            {step === 1 ? (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex gap-3">
                  <Globe className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-blue-900">Visa Compatibility Check</h4>
                    <p className="text-xs text-blue-700 mt-1">
                      Based on your {ARJUN_PROFILE.visaStatus}, {selectedJob.company} has indicated they can sponsor your visa transfer. Estimated processing time: {selectedJob.timeline}.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-3">AI Fit Summary</h3>
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-600 space-y-2">
                    <p>✓ <span className="font-medium text-slate-900">RAG Experience:</span> Strong match with clinical project.</p>
                    <p>✓ <span className="font-medium text-slate-900">Education:</span> MSc AI meets requirement.</p>
                    <p>⚠ <span className="font-medium text-slate-900">Location:</span> Relocation required (Supported).</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-3">Bid Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 border border-slate-200 rounded-lg">
                      <label className="block text-xs text-slate-500 mb-1">Expected Compensation</label>
                      <input type="text" defaultValue="$140,000" className="w-full font-medium bg-transparent outline-none text-slate-900" />
                    </div>
                    <div className="p-3 border border-slate-200 rounded-lg">
                      <label className="block text-xs text-slate-500 mb-1">Earliest Start Date</label>
                      <input type="text" defaultValue="6 Weeks (Visa Dependent)" className="w-full font-medium bg-transparent outline-none text-slate-900" disabled />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                   <CheckCircle className="w-8 h-8 text-green-600" />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900">Bid Submitted Successfully</h3>
                 <p className="text-slate-500 mt-2">Robotics AI Inc will review your profile within 48 hours.</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
             {step === 1 && (
               <>
                 <button onClick={() => setSelectedJob(null)} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-lg">Cancel</button>
                 <button onClick={() => setStep(2)} className="px-4 py-2 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 flex items-center gap-2">
                   Submit Bid <ArrowRight className="w-4 h-4" />
                 </button>
               </>
             )}
             {step === 2 && (
               <button onClick={() => { setSelectedJob(null); setStep(1); }} className="px-4 py-2 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800">
                 Done
               </button>
             )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      {selectedJob && <JobApplicationModal />}
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="p-6">
          <div className="flex items-center gap-2 text-brand-600 font-bold text-xl">
            <div className="w-8 h-8 bg-brand-600 text-white rounded-lg flex items-center justify-center text-sm">T</div>
            Talent
          </div>
        </div>
        <div className="flex-1 px-4 space-y-1">
          {[
            { id: 'dashboard', icon: Briefcase, label: 'Dashboard' },
            { id: 'jobs', icon: Search, label: 'Discover Jobs' },
            { id: 'profile', icon: User, label: 'My Profile' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <img src={ARJUN_PROFILE.avatar} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
            <div>
              <p className="text-sm font-medium text-slate-900">{ARJUN_PROFILE.name}</p>
              <p className="text-xs text-slate-500">{ARJUN_PROFILE.role}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-xl font-bold text-slate-800 capitalize">{activeTab.replace('-', ' ')}</h1>
          <div className="flex items-center gap-4">
             <div className="bg-slate-100 px-3 py-1.5 rounded-full text-xs font-medium text-slate-600 flex items-center gap-2">
               <ShieldCheck className="w-3 h-3 text-green-500" />
               Verified Talent
             </div>
             <button className="p-2 text-slate-400 hover:text-slate-600 relative">
               <Bell className="w-5 h-5" />
               <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
             </button>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto space-y-8">
          {activeTab === 'dashboard' && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard label="Skill Strength" value="Top 4%" sub="Verified by AI Assessment" icon={Star} color="amber" />
                <StatCard label="Profile Views" value="24" sub="+12% this week" icon={User} color="blue" />
                <StatCard label="Active Bids" value="2" sub="1 Shortlisted" icon={FileText} color="brand" />
                <StatCard label="Market Salary" value="€115k" sub="Based on Berlin/Remote" icon={DollarSign} color="emerald" />
              </div>

              {/* Active Applications */}
              <section>
                 <h2 className="text-lg font-bold text-slate-900 mb-4">Active Bids</h2>
                 <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                        <tr>
                          <th className="px-6 py-3 font-medium">Role</th>
                          <th className="px-6 py-3 font-medium">Company</th>
                          <th className="px-6 py-3 font-medium">Bid Amount</th>
                          <th className="px-6 py-3 font-medium">Status</th>
                          <th className="px-6 py-3 font-medium">Start Speed</th>
                          <th className="px-6 py-3 font-medium"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr>
                          <td className="px-6 py-4 font-medium text-slate-900">Applied AI Researcher</td>
                          <td className="px-6 py-4">BioGen Labs</td>
                          <td className="px-6 py-4">£95,000</td>
                          <td className="px-6 py-4"><span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">Shortlisted</span></td>
                          <td className="px-6 py-4 text-slate-500">Medium (8w)</td>
                          <td className="px-6 py-4 text-right"><button className="text-slate-400 hover:text-brand-600">View</button></td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 font-medium text-slate-900">LLM Engineer</td>
                          <td className="px-6 py-4">Robotics AI</td>
                          <td className="px-6 py-4">$140,000</td>
                          <td className="px-6 py-4"><span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700">Under Review</span></td>
                          <td className="px-6 py-4 text-slate-500">Fast (4w)</td>
                          <td className="px-6 py-4 text-right"><button className="text-slate-400 hover:text-brand-600">View</button></td>
                        </tr>
                      </tbody>
                    </table>
                 </div>
              </section>

              {/* Suggestions */}
              <div className="bg-gradient-to-r from-brand-50 to-indigo-50 rounded-xl p-6 border border-brand-100 flex items-start gap-4">
                 <div className="bg-white p-3 rounded-full shadow-sm">
                   <Zap className="w-6 h-6 text-brand-600" />
                 </div>
                 <div>
                   <h3 className="font-semibold text-brand-900">Increase your Profile Strength</h3>
                   <p className="text-sm text-brand-700 mt-1 max-w-2xl">
                     Adding concrete evaluation metrics to your "Clinical RAG Assistant" project could boost your match score by ~8%.
                   </p>
                   <button className="mt-3 text-xs font-semibold bg-brand-600 text-white px-3 py-1.5 rounded-lg hover:bg-brand-700">Update Project</button>
                 </div>
              </div>
            </>
          )}

          {activeTab === 'jobs' && (
            <>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {['All Matches', 'Visa Sponsored', 'Remote', 'Highest Pay'].map(f => (
                  <button key={f} className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium hover:border-brand-300 hover:text-brand-600 whitespace-nowrap">
                    {f}
                  </button>
                ))}
              </div>

              <div className="grid gap-4">
                {SAMPLE_JOBS.map((job) => (
                  <div key={job.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group relative">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                        <img src={job.logo} alt="" className="w-12 h-12 rounded-lg bg-slate-100" />
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{job.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                            <span className="font-medium text-slate-700">{job.company}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-slate-900">{job.salary}</div>
                        <div className="text-xs text-slate-500 font-medium">{job.type}</div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {job.requirements.map(req => (
                        <span key={req} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md font-medium">{req}</span>
                      ))}
                      {job.visaSupport && (
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md font-medium flex items-center gap-1">
                          <Globe className="w-3 h-3" /> Visa Support
                        </span>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                       <div className="flex items-center gap-2">
                         <div className="relative w-10 h-10 flex items-center justify-center">
                            <svg className="w-full h-full" viewBox="0 0 36 36">
                              <path className="text-slate-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                              <path className="text-brand-500" strokeDasharray={`${job.matchScore}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                            </svg>
                            <span className="absolute text-[10px] font-bold text-brand-700">{job.matchScore}%</span>
                         </div>
                         <span className="text-xs font-medium text-slate-500">Match Score</span>
                       </div>
                       
                       <button 
                         onClick={() => setSelectedJob(job)}
                         className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors"
                       >
                         View & Apply
                       </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'profile' && (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
              <div className="w-24 h-24 rounded-full bg-slate-200 mx-auto mb-4 overflow-hidden">
                <img src={ARJUN_PROFILE.avatar} alt="" className="w-full h-full object-cover"/>
              </div>
              <h2 className="text-2xl font-bold">{ARJUN_PROFILE.name}</h2>
              <p className="text-slate-500">Full profile editing simulation would go here.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

// Simple Icon component for the Globe usage above
import { ArrowRight, Globe } from 'lucide-react';
