import React, { useEffect, useState } from 'react';
import { Activity, Zap, Shield, Globe, Cpu, Layers } from 'lucide-react';

export const AIEngineViz: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [activePulse, setActivePulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePulse((prev) => (prev + 1) % 6);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const nodes = [
    { icon: Globe, label: "Visa Engine", color: "blue" },
    { icon: Cpu, label: "Expertise", color: "cyan" },
    { icon: Layers, label: "Cost", color: "indigo" },
    { icon: Shield, label: "Risk", color: "rose" },
    { icon: Zap, label: "Speed", color: "amber" },
    { icon: Activity, label: "Scarcity", color: "emerald" },
  ];

  const EngineNode = ({ icon: Icon, label, index, color }: any) => {
    // Calculate position in a circle
    // Starting from -90deg (top)
    const angleDeg = (index * 60) - 90;
    const angleRad = (angleDeg * Math.PI) / 180;
    const radius = compact ? 45 : 40; // Percentage from center

    // Position using percentages to be responsive
    const left = 50 + radius * Math.cos(angleRad);
    const top = 50 + radius * Math.sin(angleRad);

    return (
      <div 
        className={`absolute flex flex-col items-center transition-all duration-500 transform -translate-x-1/2 -translate-y-1/2 ${activePulse === index ? 'scale-110 opacity-100 z-10' : 'opacity-60 scale-100 z-0'}`}
        style={{ left: `${left}%`, top: `${top}%` }}
      >
        <div className={`w-12 h-12 ${compact ? 'w-8 h-8' : 'w-16 h-16'} rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center shadow-lg relative overflow-hidden`}>
          <div className={`absolute inset-0 bg-${color}-500 opacity-10`} />
          <Icon className={`${compact ? 'w-4 h-4' : 'w-6 h-6'} text-${color}-400`} />
          {activePulse === index && (
            <div className={`absolute inset-0 rounded-full animate-ping bg-${color}-500 opacity-20`} />
          )}
        </div>
        {!compact && <span className="mt-2 text-xs font-medium text-slate-400 whitespace-nowrap bg-slate-900/80 px-2 py-0.5 rounded-full">{label}</span>}
        
        {/* Connector Line to Center */}
        <div 
            className="absolute top-1/2 left-1/2 h-[1px] -z-10 origin-left"
            style={{ 
              width: compact ? '32px' : '60px',
              // We rotate the line to point TOWARDS the center. 
              // The node is at `angleDeg`. The center is 180deg away from that vector? 
              // Actually, simplest is to position the line at center and rotate OUT to node.
              // But here we are inside the Node component.
              // Let's just use a fixed line that rotates to point to center.
              // Center is at (50%, 50%). Node is at (left%, top%).
              // Angle back to center is angleDeg + 180.
              transform: `rotate(${angleDeg + 180}deg)`,
              background: `linear-gradient(90deg, ${activePulse === index ? '#8b5cf6' : '#334155'}, transparent)`
            }} 
        />
      </div>
    );
  };

  return (
    <div className={`relative flex items-center justify-center ${compact ? 'h-32 w-32' : 'h-80 w-80'}`}>
      {/* Central Core */}
      <div className={`absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${compact ? 'w-12 h-12' : 'w-24 h-24'} bg-gradient-to-br from-brand-600 to-brand-900 rounded-full flex items-center justify-center shadow-2xl shadow-brand-500/20`}>
        <Cpu className={`${compact ? 'w-6 h-6' : 'w-10 h-10'} text-white animate-pulse-slow`} />
      </div>

      {/* Orbiting Nodes */}
      <div className="absolute inset-0">
        {nodes.map((node, i) => (
          <EngineNode key={i} index={i} {...node} />
        ))}
      </div>
    </div>
  );
};