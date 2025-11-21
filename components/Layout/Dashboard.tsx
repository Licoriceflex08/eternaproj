// components/layout/DashboardLayout.tsx
'use client';

import React from 'react';
import { Search, Clock, BarChart3, Wallet, Coins, Settings, Star, Download, ChartLine ,CircleQuestionMark} from 'lucide-react';

import { useTokenData } from '@/hooks/usetokendata';
import { MainNavbar } from '@/components/Tools/Header';
import { Column } from '@/components/Tools/List';
import { BottomStatusBar } from '@/components/Snippets/BottomStatusBar';
import { TradingSettingsModal } from '@/components/Tools/TradeSettings';
import { HeaderControls } from '@/components/Snippets/SideHeader';
import { SnipeModal } from '@/components/Tools/Snipe'; 
import { ColumnFilterModal } from '@/components/Tools/Filter'; 

export const DashboardContent = () => {
  const { state, dispatch, categorizedTokens } = useTokenData(); 

  const handleCloseSettingsModal = () => {
    dispatch({ type: 'TOGGLE_SETTINGS_MODAL', payload: false });
  };

  const selectedToken = state.selectedTokenId 
    ? state.mockDb.find(t => t.id === state.selectedTokenId) 
    : null;

  return (
    <div className="h-screen bg-black text-zinc-200 font-sans flex flex-col overflow-hidden">
      
      <MainNavbar />

      {/* Top Settings Row */}
      <div className="h-8 bg-[#020203] border-b border-zinc-800/50 flex items-center justify-start mb-4 px-3 shrink-0">
        <div className="flex items-center gap-2 text-zinc-500">
          <button className="hover:text-white transition-colors p-1" aria-label="Settings">
            <Settings size={15} />
          </button>
          <div className="w-px h-4 bg-zinc-700 mx-1" />
          <button className="hover:text-white transition-colors p-1" aria-label="Bookmark">
            <Star size={15} />
          </button>
          <button className="hover:text-white transition-colors p-1" aria-label="Share">
            <ChartLine size={15} />
          </button>
          <div className="w-px h-4 bg-zinc-700 mx-1" />
        </div>
      </div>

      {/* Header Section */}
      <header className="h-14 border-b border-zinc-800/50 bg-[#020203] flex items-center px-4 justify-between shrink-0">
        
        {/* LEFT SIDE: Pulse Title */}
        <div className="flex items-center gap-3 text-white text-xl font-extrabold tracking-tight ml-3">
          Pulse

          {/* Solana Icon */}
          <div className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center">
            <img src="//logotyp.us/file/solana.svg" alt="Solana"/>
          </div>

          {/* BNB Icon */}
          <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center">
            <img src="/bnb.jpeg" alt="BNB"/>
          </div>
        </div>

        {/* RIGHT SIDE CONTROLS */}
        <HeaderControls />

      </header>
      

      {/* ====================================================== */}
      {/*  MAIN CONTENT OUTER WRAPPER (KEY PART FOR THE OUTLINE)  */}
      {/* ====================================================== */}
      <div
        className="
          mx-5 mt-4 mb-5
          bg-[#0b0b0d]
          border border-zinc-500/50
          shadow-[0_0_0_1px_rgba(255,255,255,0.05)]
          rounded-[2px]
           
          flex-1
          overflow-visible
        "
      >
        {/* 3 Columns inside unified rounded container */}
        <main className="grid grid-cols-1 md:grid-cols-3 h-full min-h-0 items-stretch">
          
          <Column 
            id="new_pairs"
            tokens={categorizedTokens.new_pairs} 
          />
          
          <Column 
            id="final_stretch"
            tokens={categorizedTokens.final_stretch} 
          />
          
          <Column 
            id="migrated"
            tokens={categorizedTokens.migrated} 
          />

        </main>
      </div>
      {/* ====================================================== */}

      <BottomStatusBar />

      {/* Modals */}
      {selectedToken && (
        <SnipeModal 
          token={selectedToken} 
          onClose={() => dispatch({ type: 'SELECT_TOKEN', payload: null })} 
        />
      )}

      {state.activeFilterColumn && (
        <ColumnFilterModal 
          initialTab={state.activeFilterColumn}
          onClose={() => dispatch({ type: 'OPEN_FILTER_MODAL', payload: null })}
        />
      )}

      <TradingSettingsModal 
        isVisible={state.isSettingsModalOpen}
        onClose={handleCloseSettingsModal}
      />
    </div>
  );
};