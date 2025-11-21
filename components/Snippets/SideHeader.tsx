'use client';

import React from 'react';
import {
  List,
  ChevronDown,
  Bookmark,
  LayoutGrid,
  Volume2,
  Settings,
  Target,
  Monitor,
  CircleQuestionMark,
  CirclePlus,
  Crosshair
} from 'lucide-react';

export const HeaderControls = React.memo(() => {
  
  // Composite target + settings icon
  const TargetSettingsIcon = () => (
    <div className="relative flex items-center justify-center">
      <Target size={18} className="text-zinc-300" />
      <Settings size={10} className="absolute right-0 bottom-0 text-zinc-300" />
    </div>
  );

  return (
    <div className="flex items-center gap-4">

      {/* -- ? Icon -- */}
       <button className="w-10 h-10 rounded-full bg-zinc-900  flex items-center justify-center">
        <CircleQuestionMark size={18} className="text-zinc-500" /> 
      </button>

      {/* ------------------------- DISPLAY Button ------------------------- */}
      <button
        className="
          flex items-center gap-2
          bg-zinc-700/60 hover:bg-zinc-700
          text-white font-semibold
          px-4 h-9 w-35
          rounded-full
          transition-colors
          shadow-sm
        "
      >
        <List size={18} className="mr-2 text-white/90" />
        <span className="text-[15px]">Display</span>
        <ChevronDown size={16} className="ml-1 text-zinc-300" />
      </button>
      {/* --------------------------------------------------------------- */}

      {/* Bookmark */}
      <button className="p-1 text-zinc-400 hover:text-white transition-colors">
        <Bookmark size={18} />
      </button>

      {/* Grid */}
      <button className="p-1 text-zinc-400 hover:text-white transition-colors">
        <LayoutGrid size={18} />
      </button>

      {/* Volume */}
      <button className="p-1 text-zinc-400 hover:text-white transition-colors">
        <Volume2 size={18} />
      </button>

      {/* Target + Settings */}
      <button className="p-1 text-zinc-400 hover:text-white transition-colors">
        <Crosshair size={18}/>
      </button>

      {/* ------------------- RIGHT SIDE MINI PANEL ---------------------- */}
      <div
        className="
          flex items-center gap-2 
          bg-zinc-700/60
          h-9 px-4 rounded-full
        "
      >
        <Monitor size={18} className="text-zinc-300" />

        <span className="text-white text-sm font-medium">1</span>

        <img
          src="//logotyp.us/file/solana.svg" alt="Solana"
          className="w-8 h-8"
          
        />

        <span className="text-white text-sm font-medium">0</span>

        <ChevronDown size={16} className="text-zinc-300" />
      </div>
      {/* --------------------------------------------------------------- */}

    </div>
  );
});

HeaderControls.displayName = 'HeaderControls';