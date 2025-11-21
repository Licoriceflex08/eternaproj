// lib/types.ts

// --- 1. TYPES & INTERFACES ---

export type ColumnId = 'new_pairs' | 'final_stretch' | 'migrated';
export type ViewMode = 'P1' | 'P2' | 'P3';
export type SortBy = 'time' | 'mcap';

export interface Token {
  id: string;
  ticker: string;
  name: string;
  imgUrl: string;
  marketCap: number;
  volume24h: number;
  price: number;
  prevPrice: number;
  bondingCurve: number; // 0 to 100
  createdAt: number;
  column: ColumnId;
  devHolding: number; // Percentage
  insiderHolding: number; // Percentage
  holderCount: number;
  liquidity: number;
  txns24h: number;

  // --- NEW PROPERTIES BASED ON IMAGE REPLICATION ---
  timeSinceLaunch: string; // e.g., "20m"
  globeScore: number; // e.g., 4 (Placeholder for a platform-specific score)
  signalScore: number; // e.g., 1
  trophyScore: number; // e.g., 0
  flagScore: string; // e.g., 'F' or 'T' (Custom Flag/Indicator)
  currentPrice: number; // Explicitly included, though similar to `price`
  txnsToday: number; // e.g., 2
  buyPressure: number; // e.g., 50 (in %)
  whaleActivity: string; // e.g., "DS 3mo" (Whale/Liquidity Status)
  devScore: number; // e.g., 4 (in %)
  taxBuy: number; // e.g., 50 (in %)
  taxSell: number; // e.g., 0 (in %)
  cardImage: string; // URL/path for the specific card image
  // --- END NEW PROPERTIES ---
}

export interface AppState {
  tokens: Record<string, Token>;
  filter: string;
  sortBy: SortBy;
  isLoading: boolean;
  isSettingsModalOpen: boolean;
  selectedTokenId: string | null;
  columnModes: Record<ColumnId, ViewMode>;
  activeFilterColumn: ColumnId | null;
  mockDb: Token[]; // Centralized source of truth array
}

export type Action =
  | { type: 'TOGGLE_SETTINGS_MODAL'; payload: boolean }
  | { type: 'INIT_DATA'; payload: Token[] }
  | { type: 'UPDATE_PRICE'; payload: { id: string; price: number; marketCap: number } }
  | { type: 'SET_FILTER'; payload: string }
  | { type: 'SET_SORT'; payload: SortBy }
  | { type: 'SELECT_TOKEN'; payload: string | null }
  | { type: 'SET_COLUMN_MODE'; payload: { col: ColumnId; mode: ViewMode } }
  | { type: 'OPEN_FILTER_MODAL'; payload: ColumnId | null };