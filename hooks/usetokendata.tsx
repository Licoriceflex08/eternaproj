// hooks/use-token-data.tsx
'use client'; 

import React, { 
  useReducer, 
  useEffect, 
  useMemo, 
  useContext, 
  createContext, 
  useCallback 
} from 'react';

import { initializeMockDb } from '@/lib/mock-data';
import { AppState, Action, ColumnId, SortBy, Token } from '@/lib/types';


// --- 1. STATE & REDUCER DEFINITIONS ---

const initialState: AppState = {
  tokens: {},
  filter: '',
  sortBy: 'time',
  isLoading: true,
  selectedTokenId: null,
  isSettingsModalOpen: false,
  columnModes: {
    new_pairs: 'P1',
    final_stretch: 'P1',
    migrated: 'P1'
  },
  activeFilterColumn: null,
  mockDb: [], 
};

/**
 * @description The main Reducer function for the global application state.
 * Handles state transitions based on dispatched actions (e.g., price updates, sorting).
 * @param {AppState} state The current state object.
 * @param {Action} action The dispatched action.
 * @returns {AppState} The new state object.
 */
const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'INIT_DATA':
      const tokenMap: Record<string, Token> = {};
      action.payload.forEach(t => tokenMap[t.id] = t);
      return { 
        ...state, 
        tokens: tokenMap, 
        mockDb: action.payload, 
        isLoading: false 
      };

      case 'TOGGLE_SETTINGS_MODAL':
      return {
        ...state,
        isSettingsModalOpen: action.payload
      };
      
    case 'UPDATE_PRICE':
      /** * CRITICAL LOGIC: Updates a single token's price/marketCap in the central source of truth (mockDb).
       * This ensures the next render of the highly memoized TokenCard.tsx uses the latest price 
       * and can calculate the 'prevPrice' for smooth color transitions.
       */
      const updatedDb = state.mockDb.map(t => {
        if (t.id === action.payload.id) {
          return {
            ...t,
            prevPrice: t.price, 
            price: action.payload.price,
            marketCap: action.payload.marketCap
          };
        }
        return t;
      });
      
      const target = updatedDb.find(t => t.id === action.payload.id);
      
      return {
        ...state,
        // Update the 'tokens' map for quick lookup in the real-time effect
        tokens: target ? { ...state.tokens, [action.payload.id]: target } : state.tokens,
        mockDb: updatedDb // New central source of truth
      };

    case 'SET_FILTER': return { ...state, filter: action.payload };
    case 'SET_SORT': return { ...state, sortBy: action.payload };
    case 'SELECT_TOKEN': return { ...state, selectedTokenId: action.payload };
    case 'SET_COLUMN_MODE':
      return {
        ...state,
        columnModes: { 
          ...(state.columnModes || { new_pairs: 'P1', final_stretch: 'P1', migrated: 'P1' }), 
          [action.payload.col]: action.payload.mode 
        }
      };
    case 'OPEN_FILTER_MODAL':
      return { ...state, activeFilterColumn: action.payload };
    default: return state;
  }
};


// --- 2. CONTEXT & PROVIDER ---

export interface AppContextValue { 
  state: AppState; 
  dispatch: React.Dispatch<Action>;
  categorizedTokens: { 
    new_pairs: Token[];
    final_stretch: Token[];
    migrated: Token[];
  }; 
}

const AppContext = createContext<AppContextValue | null>(null); 

/**
 * @description Custom hook to consume the application state and dispatcher.
 * Must be used within the AppProvider.
 * @returns {AppContextValue} The global state, dispatch, and the processed token data.
 */
export const useTokenData = (): AppContextValue => { 
  const context = useContext(AppContext);
  if (context === undefined || context === null) {
    throw new Error('useTokenData must be used within an AppProvider');
  }
  return context;
};

/**
 * @description The main state management provider component for the entire application.
 * Contains initialization, real-time simulation, filtering, and sorting logic.
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - Child components to be wrapped.
 * @returns {JSX.Element} The Context Provider wrapping child components.
 */
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // --- BUSINESS LOGIC ---

  // 1. Initial Data Fetch
  useEffect(() => {
    // Simulates a network delay for the initial fetch, showing skeleton loading
    const timer = setTimeout(() => {
      dispatch({ type: 'INIT_DATA', payload: initializeMockDb() });
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  /**
   * @description WebSocket Mock Updates (Real-time Price Polling)
   * Runs every 50ms, updating a single random token's price.
   * This is a heavy effect, but it is necessary to simulate the required real-time feed.
   * PERFORMANCE: Updates the state array directly, relying on component memoization 
   * (TokenCard.tsx) to prevent full re-renders of the UI.
   */
  useEffect(() => {
    if (state.isLoading) return;
    
    const interval = setInterval(() => {
      const keys = state.mockDb.map(t => t.id);
      if (keys.length === 0) return;
      
      const randomId = keys[Math.floor(Math.random() * keys.length)];
      const token = state.tokens[randomId];
      
      // Calculate change
      const change = 1 + (Math.random() * 0.06 - 0.03); 
      const newPrice = token.price * change;
      const newMcap = token.marketCap * change;

      dispatch({
        type: 'UPDATE_PRICE',
        payload: { id: randomId, price: newPrice, marketCap: newMcap }
      });
    }, 50); 
    
    return () => clearInterval(interval);
  }, [state.isLoading, state.mockDb, state.tokens]); 


  /**
   * @description Client-side Filtering/Sorting Logic
   * Uses useMemo to ensure filtering and sorting only run when the raw data (mockDb), 
   * filter string, or sort order changes. This is critical for performance.
   * @returns {object} Categorized and sorted lists for the three columns.
   */
  const categorizedTokens = useMemo(() => {
    let processed = [...state.mockDb];

    // Filter by Search Input
    if (state.filter) {
      const lower = state.filter.toLowerCase();
      processed = processed.filter(t => t.ticker.toLowerCase().includes(lower) || t.name.toLowerCase().includes(lower));
    }

    // Sort the list based on the user's preference (time or market cap)
    processed.sort((a, b) => {
      if (state.sortBy === 'time') return b.createdAt - a.createdAt;
      return b.marketCap - a.marketCap;
    });

    return {
      new_pairs: processed.filter(t => t.column === 'new_pairs'),
      final_stretch: processed.filter(t => t.column === 'final_stretch'),
      migrated: processed.filter(t => t.column === 'migrated'),
    };
  }, [state.mockDb, state.filter, state.sortBy]); 

  
  // Memoize the value object provided to the Context to prevent unnecessary downstream re-renders
  const value = useMemo(() => ({ 
    state, 
    dispatch, 
    categorizedTokens 
  }), [state, categorizedTokens]); 

  return (
    <AppContext.Provider value={value}> 
      {children}
    </AppContext.Provider>
  );
}