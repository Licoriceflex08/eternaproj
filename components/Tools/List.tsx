// components/organisms/Column.tsx
'use client';

import React from 'react';
import { SlidersHorizontal, Zap } from 'lucide-react';
import { ColumnId, Token, ViewMode } from '@/lib/types';
import { useTokenData } from '@/hooks/usetokendata';
import { SkeletonCard } from '@/components/Prototype/CardTemplate';
import { TokenCard } from '@/components/Snippets/Card';
import { ColumnModeTooltip } from '@/components/Snippets/Tooltip';
import { ErrorBoundary } from '@/components/Layout/Errors';

// Map ColumnId to its display title
const ColumnMeta: Record<ColumnId, { title: string }> = {
  new_pairs: { title: 'New Pairs' },
  final_stretch: { title: 'Final Stretch' },
  migrated: { title: 'Migrated' },
};

interface ColumnProps {
  id: ColumnId;
  tokens: Token[];
}

export const Column = React.memo(({ id, tokens }: ColumnProps) => {
  const { state, dispatch } = useTokenData();
  const { title } = ColumnMeta[id];

  const activeMode = state.columnModes?.[id] || 'P1';
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
        setIsClient(true);
    }, []);
  const [hoverMode, setHoverMode] = React.useState<ViewMode | null>(null);
  const currentView = hoverMode || activeMode;

  const [params, setParams] = React.useState({
        p0: "",
        p1: "",
        p2: "",
        p3: ""
    });
  const handleOpenFilter = React.useCallback(() => {
    dispatch({ type: 'OPEN_FILTER_MODAL', payload: id });
  }, [dispatch, id]);

  /**
   * handleSetMode
   * Switch the column view mode via dispatch.
   */
  const handleSetMode = React.useCallback((mode: ViewMode) => {
    dispatch({ type: 'SET_COLUMN_MODE', payload: { col: id, mode } });
  }, [dispatch, id]);

  /**
   * Open global Trading Settings modal (via central dispatch).
   * Use this for the gradient button in the header.
   */
  const openTradingSettings = React.useCallback(() => {
    dispatch({ type: 'TOGGLE_SETTINGS_MODAL', payload: true });
  }, [dispatch]);

  const getHeaders = () => {
    switch (currentView) {
      case 'P1':
        return ['Token/Price', 'MCap', 'Audit'];
      case 'P2':
        return ['Token/Price', 'Vol', 'Txns'];
      case 'P3':
        return ['Token/Price', 'Liq', 'Holders'];
      default:
        return ['Token/Price', 'MCap', 'Audit'];
    }
  };
  const headers = getHeaders();

  return (
    <div className="flex flex-col bg-[#050506] border-x border-zinc-500/50 first:border-l-0 last:border-r-0">
      {/* --- Column Header --- */}
      <div className="px-3 pt-2 pb-1 border-b border-zinc-500/50 sticky top-0 z-10 bg-[#0c0c0e]">
        {/* Title and Controls (Row 1) */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-mb tracking-tight text-white">{title}</h3>
          </div>

          <div className="flex items-center gap-1">
            {/* Zap Icon with 0.0 value */}
            <div className="flex items-center bg-zinc-900 border border-zinc-700 rounded-lg py-1 px-1.5 text-zinc-400 text-xs font-mono my-0.5">
              <Zap size={10} className="mr-1" />
                {isClient ? (
                          <input type="text" value={params.p0} onChange={(e) => {const v = e.target.value;
                                if (/^\d*\.?\d*$/.test(v)) {
                                    setParams(prev => ({ ...prev, p0: v }));
                                }
                            }}
                            placeholder="0.0"
                            className="
                                bg-transparent 
                                text-white 
                                text-xs 
                                font-roboto-mono 
                                text-right
                                w-8 
                                focus:outline-none
                            "
                        />
                    ) : (
                        <span className="text-white">0.0</span>
                    )}
            </div>

            {/* Gradient Icon (opens global Trading Settings modal) */}
            <button
              className="p-1 rounded-full text-zinc-500 hover:text-white transition-colors"
              onClick={openTradingSettings}
              aria-label="Open Trading Settings"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12H20M4 6H20M4 18H20" stroke="url(#gradient-status)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <defs>
                  <linearGradient id="gradient-status" x1="4" y1="12" x2="20" y2="12" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#9333ea" />
                    <stop offset="0.5" stopColor="#3b82f6" />
                    <stop offset="1" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </svg>
            </button>

            {/* P1/P2/P3 Buttons */}
            <div className="flex items-center gap-2 p-0.5">
              {(['P1', 'P2', 'P3'] as ViewMode[]).map(t => {
                const isActive = activeMode === t;
                return (
                  <ColumnModeTooltip
                    key={t}
                    mode={t}
                    isActive={isActive}
                    onClick={handleSetMode}
                  />
                );
              })}
            </div>

            {/* Filter Icon positioned to the EXTREME RIGHT */}
            <button
              onClick={handleOpenFilter}
              className="hover:bg-zinc-800 rounded text-zinc-500 hover:text-white transition-colors ml-2 cursor-pointer"
              aria-label={`Filter tokens in ${title} column`}
            >
              <SlidersHorizontal size={14} />
            </button>
          </div>
        </div>

        {/* Table Headers (Row 2) */}
        {/* You can render headers if needed using `headers` variable */}
      </div>

      {/* --- Token List (Scrolling Area) --- */}
      <div className="flex-1 p-1 overflow-y-auto custom-scrollbar min-h-[100px] max-h-[calc(100vh-220px)]">
        <ErrorBoundary fallback={<div className="text-red-400 p-4">Error loading tokens in this column.</div>}>
          {state.isLoading ? (
            Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
          ) : (
            tokens.map(token => <TokenCard key={token.id} token={token} columnId={id} />)
          )}
        </ErrorBoundary>

        {!state.isLoading && tokens.length === 0 && (
          <div className="h-32 flex flex-col items-center justify-center text-zinc-700 text-xs">
            No tokens active or matching current filters.
          </div>
        )}
      </div>
    </div>
  );
});

Column.displayName = 'Column';
