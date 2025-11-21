// components/organisms/SnipeModal.tsx
'use client';

import React from 'react';
import { X, Zap } from 'lucide-react';
import { Token } from '@/lib/types';

interface SnipeModalProps {
  token: Token | null;
  onClose: () => void;
}

export const SnipeModal = React.memo(({ token, onClose }: SnipeModalProps) => {
  if (!token) return null;

  return (
    // Uses basic Tailwind/CSS for modal, which is a pattern acceptable for shadcn/ui/Radix approach
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" aria-modal="true" role="dialog">
      <div className="bg-[#09090b] w-full max-w-[400px] border border-zinc-800 rounded-lg shadow-2xl shadow-black overflow-hidden animate-in zoom-in-95 duration-200 ring-1 ring-white/10">
        
        {/* Header */}
        <div className="p-3 border-b border-zinc-800 flex justify-between items-center bg-[#121214]">
          <h2 className="font-bold text-zinc-200 text-sm flex items-center gap-2">
            Snipe on <span className={token.column === 'migrated' ? 'text-emerald-400' : 'text-blue-400'}>{token.ticker}</span>
          </h2>
          <button 
            onClick={onClose} 
            className="text-zinc-500 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4 space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] uppercase tracking-wider text-zinc-500 font-bold"><span>Snipe Amount</span><span>Bal: 12.45 SOL</span></div>
            <div className="flex items-center bg-black border border-zinc-700 rounded focus-within:border-emerald-500 transition-colors px-3 h-10">
              <span className="text-zinc-400 text-xs font-bold mr-2">SOL</span>
              <input type="number" defaultValue="0.1" className="bg-transparent border-none outline-none text-white font-mono text-sm w-full text-right" />
            </div>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {[0.01, 0.1, 1, 'Max'].map((amt, i) => <button key={i} className="bg-[#18181b] hover:bg-zinc-700 border border-zinc-800 text-zinc-300 text-[11px] py-1.5 rounded transition-colors font-mono">{amt}</button>)}
            </div>
          </div>
          
          {/* Action Button */}
          <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
            <Zap size={16} className="fill-current" /> BUY {token.ticker}
          </button>
          
          {/* Settings Grid... */}
        </div>
      </div>
    </div>
  );
});

SnipeModal.displayName = 'SnipeModal';