// components/molecules/BottomStatusBar.tsx
'use client';

import React from 'react';
import { Wifi, Globe } from 'lucide-react';

export const BottomStatusBar = React.memo(() => (
  <div className="h-7 bg-[#09090b] border-t border-zinc-800 flex items-center justify-between px-3 text-[10px] text-zinc-500 font-mono fixed bottom-0 w-full z-50 shrink-0">
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1.5 text-emerald-500">
        <Wifi size={10} />
        <span>Connection is stable</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Globe size={10} />
        <span>Global Latency: 24ms</span>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-zinc-400">Solana Mainnet</span>
      </div>
      <div>Block: 245,128,991</div>
      <div>v1.4.2</div>
    </div>
  </div>
));

BottomStatusBar.displayName = 'BottomStatusBar';