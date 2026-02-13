import React, { useState } from 'react';
import { Landing } from './views/Landing';
import { TalentView } from './views/Talent';
import { EmployerView } from './views/Employer';
import { AdminView } from './views/Admin';
import { Persona } from './types';

function App() {
  const [currentPersona, setCurrentPersona] = useState<Persona>('landing');

  // Helper to render the correct view
  const renderView = () => {
    switch (currentPersona) {
      case 'talent':
        return <TalentView />;
      case 'employer':
        return <EmployerView />;
      case 'admin':
        return <AdminView />;
      default:
        return <Landing onEnterApp={(role) => setCurrentPersona(role)} />;
    }
  };

  return (
    <div className="relative">
      {/* Dev Persona Switcher - Only visible on desktop top-right for demo purposes */}
      <div className="fixed bottom-4 right-4 z-50 bg-slate-900 text-white p-2 rounded-full shadow-2xl border border-slate-700 flex gap-2 opacity-50 hover:opacity-100 transition-opacity">
        <button 
          onClick={() => setCurrentPersona('landing')}
          className={`px-3 py-1 rounded-full text-xs font-bold ${currentPersona === 'landing' ? 'bg-brand-600' : 'hover:bg-slate-700'}`}
        >
          Home
        </button>
        <button 
          onClick={() => setCurrentPersona('talent')}
          className={`px-3 py-1 rounded-full text-xs font-bold ${currentPersona === 'talent' ? 'bg-brand-600' : 'hover:bg-slate-700'}`}
        >
          Talent
        </button>
        <button 
          onClick={() => setCurrentPersona('employer')}
          className={`px-3 py-1 rounded-full text-xs font-bold ${currentPersona === 'employer' ? 'bg-brand-600' : 'hover:bg-slate-700'}`}
        >
          Employer
        </button>
        <button 
          onClick={() => setCurrentPersona('admin')}
          className={`px-3 py-1 rounded-full text-xs font-bold ${currentPersona === 'admin' ? 'bg-brand-600' : 'hover:bg-slate-700'}`}
        >
          Admin
        </button>
      </div>

      {renderView()}
    </div>
  );
}

export default App;