// components/molecules/ColumnModeTooltip.tsx
'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTokenData } from '@/hooks/usetokendata';

interface ColumnModeTooltipProps {
  mode: 'P1' | 'P2' | 'P3';
  isActive: boolean;
  onClick: (mode: 'P1' | 'P2' | 'P3') => void;
}

export const ColumnModeTooltip = React.memo(({ mode, isActive, onClick }: ColumnModeTooltipProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const { dispatch } = useTokenData(); 

  const handleButtonClick = (m: 'P1' | 'P2' | 'P3') => {
    // 1. If the clicked mode is ALREADY ACTIVE, open the settings modal.
    if (isActive) {
      dispatch({ type: 'TOGGLE_SETTINGS_MODAL', payload: true });
    } else {
      // 2. Otherwise, switch the view mode (standard functionality).
      onClick(m);
    }
  };
  // Placeholder data relevant to the P1/P2/P3 mode switch
  const hoverData = {
    P1: ['Mcap: $10M+', 'Volume: $500K+'],
    P2: ['New: < 1hr old', 'Txns: 100+'],
    P3: ['Liq: $10K+', 'Holders: 50+']
  };

  const getButtonClass = () => 
    `px-1.5 py-1 text-[10px] rounded-sm border transition-colors ${
      isActive ? 'bg-zinc-200 text-black border-zinc-200 font-bold' : 'text-zinc-600 hover:text-zinc-300 bg-zinc-900/50 hover:bg-zinc-800 border-transparent hover:border-zinc-700'
    }`;

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button 
        onClick={() => handleButtonClick(mode)}
        className={getButtonClass()}
      >
        {mode}
      </button>

      {/* Popover Content (Tooltip) */}
      {isHovered && (
        <div 
          className="absolute z-50 top-full mt-2 left-1/2 transform -translate-x-1/2 p-2 rounded-lg bg-zinc-900 border border-zinc-700 shadow-lg text-xs text-white whitespace-nowrap pointer-events-none animate-in fade-in duration-150"
          role="tooltip"
        >
          <p className="font-bold text-indigo-400 mb-1">Mode {mode} Filters</p>
          {hoverData[mode].map((item, i) => (
            <p key={i} className="text-zinc-400">{item}</p>
          ))}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-b-4 border-b-zinc-900" />
        </div>
      )}
    </div>
  );
});

ColumnModeTooltip.displayName = 'ColumnModeTooltip';