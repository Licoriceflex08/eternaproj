// components/organisms/TradingSettingsModal.tsx
'use client';

import React, { useState, useCallback } from 'react';
import { X, Settings } from 'lucide-react';

interface TradingSettingsModalProps {
  isVisible: boolean;
  onClose: () => void;
}

// Custom Radio/Toggle Component
const ToggleSwitch = React.memo(({ label, isChecked, onChange }: { label: string, isChecked: boolean, onChange: (checked: boolean) => void }) => (
  <div className="flex items-center justify-between text-zinc-300 text-sm">
    <span>{label}</span>
    <div 
      onClick={() => onChange(!isChecked)} 
      className={`w-10 h-6 rounded-full p-0.5 cursor-pointer transition-colors ${isChecked ? 'bg-indigo-600' : 'bg-zinc-700'}`}
    >
      <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ${isChecked ? 'translate-x-4' : 'translate-x-0'}`} />
    </div>
  </div>
));
ToggleSwitch.displayName = 'ToggleSwitch';


// Input Field Component
const InputField = React.memo(({ label, value, onChange, disabled = false }: 
  { label: string, value: string | number, onChange: (value: string) => void, disabled?: boolean }) => (
  <div className="space-y-1">
    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled} // <--- Check for disabled status
      className={`w-full border rounded px-3 py-1.5 text-sm outline-none 
        ${disabled 
          ? 'bg-zinc-800 border-zinc-700 text-zinc-500 cursor-not-allowed' // Greyed out/disabled style
          : 'bg-[#121214] border-zinc-800 text-white focus:border-indigo-500' // Normal style
        }`}
    />
  </div>
));
InputField.displayName = 'InputField';


export const TradingSettingsModal = React.memo(({ isVisible, onClose }: TradingSettingsModalProps) => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  
  // Define default values for when Auto Fee is OFF
  const DEFAULT_MAX_FEE = '0.4921'; 

  const [settings, setSettings] = useState({
    slippage: '20',
    priority: '0.001',
    bribe: '0.01',
    autoFee: true, // Default to ON as seen in the video initial state
    maxFee: '0.1', // Value when Auto Fee is ON
    mevMode: 'off', 
    rpcUrl: 'https://a...e.com'
  });

  const handleInputChange = useCallback((key: keyof typeof settings, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  /**
   * @description Handles the complex logic when the Auto Fee toggle is switched.
   * If switched OFF, it sets a default (fixed) value for maxFee and disables the input.
   * If switched ON, it enables the input and keeps the current value or resets it to a small default.
   */
  const handleAutoFeeToggle = useCallback((checked: boolean) => {
    if (checked) {
      // Auto Fee is ON: Max Fee input is editable. Keep last value or small default.
      setSettings(prev => ({ ...prev, autoFee: true, maxFee: '0.1' }));
    } else {
      // Auto Fee is OFF: Max Fee input is disabled and set to the required default value.
      setSettings(prev => ({ ...prev, autoFee: false, maxFee: DEFAULT_MAX_FEE }));
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200" aria-modal="true" role="dialog">
      <div className="bg-[#09090b] w-full max-w-sm border border-zinc-800 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col">
        
        {/* Header and Tabs (unchanged) */}
        {/* ... (Header and Tabs code) ... */}
        <div className="flex justify-between items-center p-3 border-b border-zinc-800 bg-[#0c0c0e]">
          <div className="flex items-center gap-2 text-zinc-200 font-bold text-sm">
            <Settings size={16} /> Trading Settings
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors" aria-label="Close settings">
            <X size={18} />
          </button>
        </div>
        <div className="flex border-b border-zinc-800 bg-[#0c0c0e]">
          <button
            onClick={() => setActiveTab('buy')}
            className={`flex-1 py-2 text-sm font-bold transition-colors border-b-2 ${activeTab === 'buy' ? 'text-green-400 border-green-400' : 'text-zinc-500 border-transparent hover:text-zinc-300'}`}
          >
            Buy Settings
          </button>
          <button
            onClick={() => setActiveTab('sell')}
            className={`flex-1 py-2 text-sm font-bold transition-colors border-b-2 ${activeTab === 'sell' ? 'text-red-400 border-red-400' : 'text-zinc-500 border-transparent hover:text-zinc-300'}`}
          >
            Sell Settings
          </button>
        </div>


        {/* Content */}
        <div className="p-4 space-y-4">
          
          {/* Top Inputs: Slippage, Priority, Bribe (unchanged) */}
          <div className="grid grid-cols-3 gap-3">
            <InputField 
              label="Slippage" 
              value={settings.slippage + '%'} 
              onChange={(val) => handleInputChange('slippage', val.replace('%', ''))} 
            />
            <InputField 
              label="Priority" 
              value={settings.priority} 
              onChange={(val) => handleInputChange('priority', val)} 
            />
            <InputField 
              label="Bribe" 
              value={settings.bribe} 
              onChange={(val) => handleInputChange('bribe', val)} 
            />
          </div>

          {/* Auto Fee & Max Fee (Conditional Logic Applied Here) */}
          <div className="grid grid-cols-2 gap-3 items-center">
            <ToggleSwitch 
              label="Auto Fee" 
              isChecked={settings.autoFee} 
              onChange={handleAutoFeeToggle} // <--- Use the new complex handler
            />
            <InputField 
              label="Max Fee" 
              value={settings.maxFee} 
              onChange={(val) => handleInputChange('maxFee', val)} 
              disabled={!settings.autoFee} // <--- Disable when Auto Fee is OFF
            />
          </div>

          {/* MEV Mode and RPC (unchanged) */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">MEV Mode</label>
            <div className="flex justify-between bg-[#121214] border border-zinc-800 rounded p-2 text-sm">
              <button onClick={() => handleInputChange('mevMode', 'off')} className={`px-2 py-1 rounded transition-colors ${settings.mevMode === 'off' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>Off</button>
              <button onClick={() => handleInputChange('mevMode', 'reduced')} className={`px-2 py-1 rounded transition-colors ${settings.mevMode === 'reduced' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>Reduced</button>
              <button onClick={() => handleInputChange('mevMode', 'secure')} className={`px-2 py-1 rounded transition-colors ${settings.mevMode === 'secure' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>Secure</button>
            </div>
          </div>
          
          <InputField 
            label="RPC https://a...e.com" 
            value={settings.rpcUrl} 
            onChange={(val) => handleInputChange('rpcUrl', val)} 
          />
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 bg-[#0c0c0e]">
          <button onClick={onClose} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded shadow-lg shadow-indigo-900/20 transition-all">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
});

TradingSettingsModal.displayName = 'TradingSettingsModal';