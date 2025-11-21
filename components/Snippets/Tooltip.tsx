'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTokenData } from '@/hooks/usetokendata';

interface ColumnModeTooltipProps {
  mode: 'P1' | 'P2' | 'P3';
  isActive: boolean;
  onClick: (mode: 'P1' | 'P2' | 'P3') => void;
}

export const ColumnModeTooltip = React.memo(({ mode, isActive, onClick }: ColumnModeTooltipProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { dispatch } = useTokenData();

  // Use a ref to detect single vs double click and avoid firing single-click action when double-clicked.
  const clickTimeoutRef = useRef<number | null>(null);
  const CLICK_DELAY = 250; // ms; adjust if you want faster/slower double-click recognition

  useEffect(() => {
    return () => {
      // cleanup any pending timeout on unmount
      if (clickTimeoutRef.current) {
        window.clearTimeout(clickTimeoutRef.current);
        clickTimeoutRef.current = null;
      }
    };
  }, []);

  const openSettingsIfActive = () => {
    if (isActive) {
      dispatch({ type: 'TOGGLE_SETTINGS_MODAL', payload: true });
    }
  };

  const handleSingleClick = (m: 'P1' | 'P2' | 'P3') => {
    // If clicked mode is active -> open settings modal (per your requirement).
    // Otherwise switch mode.
    if (isActive) {
      openSettingsIfActive();
    } else {
      onClick(m);
    }
  };

  const handleDoubleClick = () => {
    // Double-click should ALSO open settings modal, but ONLY when the clicked mode is active.
    openSettingsIfActive();
  };

  const handleClick = (m: 'P1' | 'P2' | 'P3') => {
    // If we already have a pending timeout, this is the second click -> treat as double-click
    if (clickTimeoutRef.current) {
      window.clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
      handleDoubleClick();
      return;
    }

    // Otherwise set a timeout to call single-click handler after a short delay.
    // If a second click happens before the delay expires, we'll clear this and call double-click instead.
    clickTimeoutRef.current = window.setTimeout(() => {
      clickTimeoutRef.current = null;
      handleSingleClick(m);
    }, CLICK_DELAY);
  };

  const hoverData = {
    P1: ['Mcap: $10M+', 'Volume: $500K+'],
    P2: ['New: < 1hr old', 'Txns: 100+'],
    P3: ['Liq: $10K+', 'Holders: 50+']
  };

  const getButtonClass = () =>
    `px-1.5 py-1 text-[10px] cursor-pointer rounded-sm border transition-colors ${
      isActive
        ? 'bg-zinc-200 text-black border-zinc-200 font-bold'
        : 'text-zinc-600 hover:text-zinc-300 bg-zinc-900/50 hover:bg-zinc-800 border-transparent hover:border-zinc-700'
    }`;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={() => handleClick(mode)}
        className={getButtonClass()}
      >
        {mode}
      </button>

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
