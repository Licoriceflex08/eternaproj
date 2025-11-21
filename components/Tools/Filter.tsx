// components/organisms/ColumnFilterModal.tsx
'use client';

import React, { useState, useCallback } from 'react';
import { X, Filter, Flame, Shield, Upload, Download } from 'lucide-react';
import { ColumnId } from '@/lib/types';

interface ColumnFilterModalProps {
  initialTab: ColumnId;
  onClose: () => void;
}

export const ColumnFilterModal = React.memo(({ initialTab, onClose }: ColumnFilterModalProps) => {
  const [activeTab, setActiveTab] = useState<ColumnId>(initialTab);
  const [activeProtocols, setActiveProtocols] = useState<string[]>(['Pump', 'Raydium']);
  const [devPaid, setDevPaid] = useState(false);
  
  const protocols = ['Pump', 'Mayhem', 'Bonk', 'Bags', 'Moonshot', 'Boba', 'Clanker', 'Jupiter', 'Squirt', 'LaunchLab', 'Dynamic BC', 'Raydium', 'Meteora AMM', 'Meteora DLMM', 'Pump AMM', 'Orca'];

  const toggleProtocol = useCallback((p: string) => {
    setActiveProtocols(prev => prev.includes(p) ? prev.filter(i => i !== p) : [...prev, p]);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200" aria-modal="true" role="dialog">
      <div className="bg-[#09090b] w-full max-w-[500px] border border-zinc-800 rounded-xl shadow-2xl shadow-black overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex flex-col border-b border-zinc-800 bg-[#0c0c0e]">
          <div className="flex justify-between items-center p-3 mb-2 pb-1">
            <div className="flex items-center gap-2 text-zinc-200 font-bold text-sm">
              <Filter size={16} /> Filters
            </div>
            <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors cursor-pointer" aria-label="Close filter modal">
              <X size={18} />
            </button>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex px-3 gap-4">
            {(['new_pairs', 'final_stretch', 'migrated'] as ColumnId[]).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-2 text-xs font-bold cursor-pointer border-b-2 transition-colors ${activeTab === tab ? 'text-white border-indigo-500' : 'text-zinc-500 border-transparent hover:text-zinc-300'}`}>
                {tab.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto custom-scrollbar space-y-6 flex-1 bg-[#09090b]">
          
          {/* Protocols */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Protocols</label>
              <button className="text-[10px] text-indigo-400 hover:text-indigo-300">Select All</button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {protocols.map(p => (
                <button key={p} onClick={() => toggleProtocol(p)} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[10px] font-medium transition-all ${activeProtocols.includes(p) ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-200' : 'bg-[#121214] border-zinc-800 text-zinc-500 hover:border-zinc-700'}`}>
                  {p === 'Pump' && <Flame size={8} className="text-orange-500" />}
                  {p}
                </button>
              ))}
            </div>
          </div>
          
          {/* Inputs */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Search</label>
              <input type="text" placeholder="keyword..." className="w-full bg-[#121214] border border-zinc-800 rounded px-2 py-1.5 text-xs text-white focus:border-indigo-500 outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Exclude</label>
              <input type="text" placeholder="keyword..." className="w-full bg-[#121214] border border-zinc-800 rounded px-2 py-1.5 text-xs text-white focus:border-indigo-500 outline-none" />
            </div>
          </div>
          
          {/* Toggles */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1"><Shield size={10} /> Audit</label>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between bg-[#121214] p-2 rounded border border-zinc-800">
                  <span className="text-[10px] text-zinc-300">Dev Paid</span>
                  <div onClick={() => setDevPaid(!devPaid)} className={`w-8 h-4 rounded-full p-0.5 cursor-pointer transition-colors ${devPaid ? 'bg-emerald-600' : 'bg-zinc-700'}`}>
                    <div className={`w-3 h-3 bg-white rounded-full shadow-sm transform transition-transform ${devPaid ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-3 border-t border-zinc-800 bg-[#0c0c0e] flex justify-between items-center shrink-0">
          <div className="flex gap-2">
            <button className="flex items-center gap-1 px-2 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-500 text-[10px] hover:text-white transition-colors"><Upload size={10} /> Import</button>
            <button className="flex items-center gap-1 px-2 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-500 text-[10px] hover:text-white transition-colors"><Download size={10} /> Export</button>
          </div>
          <button onClick={onClose} className="px-6 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors shadow-lg shadow-indigo-900/20">Apply All</button>
        </div>
      </div>
    </div>
  );
});

ColumnFilterModal.displayName = 'ColumnFilterModal';