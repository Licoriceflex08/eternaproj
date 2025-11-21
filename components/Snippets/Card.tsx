// components/molecules/TokenCard.tsx
'use client';

import React from 'react';
import {
  ChevronRight,
  Globe,
  Send,
  Search,
  Users,
  Trophy,
  Flag,
  Coins,
  X,
  Info,
  Clock,
  TrendingUp,
  DollarSign,
  Zap
} from 'lucide-react';

import { Token, ColumnId } from '@/lib/types';
import { useTokenData } from '@/hooks/usetokendata';

interface TokenCardProps {
  token: Token;
  columnId: ColumnId;
}

export const TokenCard = React.memo(({ token, columnId }: TokenCardProps) => {
  const { state, dispatch } = useTokenData();
  const isSelected = state.selectedTokenId === token.id;

  const formatK = (value: number | undefined) => {
    if (!value) return '$0K';
    return `$${(value / 1000).toFixed(1)}K`;
  };

  const safePrice = (token.currentPrice ?? 0).toFixed(5);

  const handleCardClick = () => {
    dispatch({ type: 'SELECT_TOKEN', payload: isSelected ? null : token.id });
  };

  const getTokenGradient = (tokenId: string) => {
  const gradients = [
  // Deep Blue / Midnight
  "from-[#0F2027] via-[#203A43] to-[#2C5364]",

  // Dark Gray → Black Shadow
  "from-[#232526] via-[#2C3E50] to-[#000000]",

  // Noir Purple
  "from-[#1A1A2E] via-[#16213E] to-[#0F3460]",

  // Cyberpunk Violet–Blue
  "from-[#240046] via-[#3C096C] to-[#5A189A]",

  // Deep Crimson Burn
  "from-[#200122] via-[#3A001E] to-[#4A0E0E]",

  // Dark Emerald
  "from-[#01121D] via-[#003B36] to-[#005F56]",

  // Gunmetal → Teal Glow
  "from-[#0D1B2A] via-[#1B263B] to-[#415A77]",

  // Obsidian Purple
  "from-[#130F40] via-[#2C0E37] to-[#421B44]",

  // Navy Carbon
  "from-[#0A0F1F] via-[#0E1A2B] to-[#142840]",

  // Charcoal Magenta
  "from-[#2B0F24] via-[#422043] to-[#6A294F]",

  // Teal Frost
  "from-[#0B1D1D] via-[#113534] to-[#195F5F]",

  // Deep Lava
  "from-[#190000] via-[#300000] to-[#520000]",

  // Steel Shadow
  "from-[#1A1A1A] via-[#1F2937] to-[#111827]",
];


  // stable hash → repeatable gradient selection
  let hash = 0;
  for (let i = 0; i < tokenId.length; i++) {
    hash = tokenId.charCodeAt(i) + ((hash << 5) - hash);
  }

  return gradients[Math.abs(hash % gradients.length)];
};

  // Slightly tighter, darker card with subtle outline when selected
  const cardClasses = `relative flex flex-col p-3 rounded-l transition-all duration-150 cursor-pointer text-white
    bg-[#0F0F12] ${isSelected ? 'ring-2 ring-indigo-600' : 'hover:ring-1 hover:ring-zinc-700'} shadow-sm`;

  const renderPulsingRingIcon = (color: string) => (
    <div className={`relative w-4 h-4 flex items-center justify-center`}>
      <div className={`absolute inline-block w-4 h-4 rounded-full ${color} opacity-40 animate-ping`} />
      <div className={`relative inline-block w-2.5 h-2.5 rounded-full ${color} border border-black`} />
    </div>
  );

  return (
    <div
      className={`${cardClasses} w-full my-1 overflow-hidden`}
      onClick={handleCardClick}
    >
      <div className="token-gloss-layer"></div>
      {/* ROW 1 - Left image + main text + right metrics */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">

          {/* Compact Image */}
      <div className="relative w-16 h-16 flex-shrink-0">

  {/* Outer Glow Ring */}
  <div
    className={`
      absolute inset-0 rounded-xl blur-md opacity-60
      bg-gradient-to-br ${getTokenGradient(token.id)}
    `}
  ></div>

  {/* Actual Avatar */}
    <div
        className={`
        relative w-full h-full rounded-xl overflow-hidden
        bg-gradient-to-br ${getTokenGradient(token.id)}
        flex items-center justify-center
        `}
    >

        {/* Token ticker initials */}
        <span className="text-[11px] font-extrabold tracking-wider uppercase opacity-90">
        {token.ticker.slice(0, 3)}
        </span>
    </div>

    {/* Online status indicator */}
    <div className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-green-400 border border-black shadow-md"></div>
    </div>

          {/* Text column */}
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold uppercase truncate">{token.ticker}</span>
              <span className="text-zinc-400 text-xs truncate max-w-[160px]">{token.name}</span>
              <span className="text-zinc-500 text-xs">📃</span>
            </div>

            {/* compact icon row */}
            <div className="mt-1 flex items-center gap-2 text-xs text-zinc-400 flex-wrap">
              <div className="flex items-center gap-1">
                <Clock size={14} className="text-teal-400" />
                <span className="text-teal-400 font-semibold">{token.timeSinceLaunch}</span>
              </div>

              <div className="flex items-center gap-1">
                <Users size={14} className="text-blue-400" />
                <span className="text-blue-400 font-semibold">{token.globeScore}</span>
              </div>

              <div className="flex items-center gap-1">
                <Trophy size={14} className="text-yellow-400" />
                <span className="text-yellow-400 font-semibold">{token.trophyScore}</span>
              </div>

              <div className="flex items-center gap-1">
                <Flag size={14} className="text-red-400" />
                <span className="text-red-400 font-semibold">{token.flagScore}</span>
              </div>

              {/* price + tx compact */}
              <div className="flex items-center gap-1 font-mono font-bold text-sm text-teal-400">
                <Coins size={14} />
                <span>{safePrice}</span>
              </div>

              <div className="flex items-center gap-1 font-mono font-bold text-sm text-purple-400">
                <X size={14} />
                <span>TX {token.txnsToday}</span>
              </div>

            </div>

            <div className="mt-1 text-zinc-500 text-[11px] truncate max-w-[260px]">HagG...pump</div>
          </div>
        </div>

        {/* MC + V compact column */}
        <div className="flex flex-col items-end gap-1 text-sm text-right shrink-0">
          <div className="text-xs text-zinc-500">V</div>
          <div className="text-white font-mono font-bold text-sm">{formatK(token.volume24h)}</div>

          <div className="text-xs text-zinc-500">MC</div>
          <div className="text-white font-mono font-bold text-sm">{formatK(token.marketCap)}</div>
        </div>
      </div>

      {/* ROW 2 - badges + pulsing indicators */}
      <div className="flex items-center gap-2 mt-2 flex-wrap">

        <div className="flex items-center text-xs font-semibold bg-zinc-900/40 rounded-full px-2 py-1 text-red-400 border border-zinc-800">
          <Zap size={12} className="mr-1" />
          <span>{token.buyPressure}%</span>
        </div>

        <div className="flex items-center text-xs font-semibold bg-zinc-900/40 rounded-full px-2 py-1 text-blue-400 border border-zinc-800">
          <span className="mr-1">🐳</span>
          <span>{token.whaleActivity}</span>
        </div>

        <div className="flex items-center text-xs font-semibold bg-zinc-900/40 rounded-full px-2 py-1 text-green-400 border border-zinc-800">
          <TrendingUp size={12} className="mr-1" />
          <span>{token.devScore}%</span>
        </div>

        <div className="flex items-center text-xs font-semibold bg-zinc-900/40 rounded-full px-2 py-1 text-pink-500 border border-zinc-800">
          <DollarSign size={12} className="mr-1" />
          <span>{token.taxBuy}%</span>
        </div>

        <div className="flex items-center text-xs font-semibold bg-zinc-900/40 rounded-full px-2 py-1 text-green-500 border border-zinc-800">
          <X size={12} className="mr-1" />
          <span>{token.taxSell}%</span>
        </div>

        {/* small pulsing indicators to match the screenshot arrangement */}
        <div className="ml-1 flex items-center gap-2">
          <div className="w-6 h-6 flex items-center justify-center">
            {renderPulsingRingIcon('bg-orange-500')}
          </div>

          <ChevronRight size={16} className="text-zinc-600" />

          <div className="w-6 h-6 flex items-center justify-center">
            {renderPulsingRingIcon('bg-emerald-400')}
          </div>
        </div>
      </div>

      <div className="absolute right-2 top-2">
        <Info className="w-4 h-4 text-zinc-500 hover:text-indigo-400 transition-colors" />
      </div>
    </div>
  );
});

TokenCard.displayName = 'TokenCard';
