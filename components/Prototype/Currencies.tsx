// components/atoms/FormatCurrency.tsx
import React from 'react';
interface FormatCurrencyProps {
  value: number;
  type: 'price' | 'mcap' | 'volume';
  className?: string;
  // Optional flag for the price flash feature
  isFlashing?: boolean; 
  prevValue?: number;
}

// Reusable formatting function (kept in the component for simplicity, could be moved to lib/utils.ts)
const formatValue = (value: number, type: 'price' | 'mcap' | 'volume'): string => {
  if (type === 'price') {
    // Show many decimal places for crypto prices
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 6,
      maximumFractionDigits: 8,
    });
  }
  
  // Format Market Cap and Volume in a compact, human-readable way
  return value.toLocaleString('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};


export const FormatCurrency = React.memo(({ 
  value, 
  type, 
  className = '', 
  isFlashing = false, 
  prevValue = value 
}: FormatCurrencyProps) => {

  // --- Smooth Color Transitions Logic ---
  let flashClass = '';
  if (isFlashing && type === 'price') {
    if (value > prevValue) {
      flashClass = 'animate-price-up'; // Assumes you have these Tailwind keyframes/classes defined
    } else if (value < prevValue) {
      flashClass = 'animate-price-down';
    }
  }

  const formatted = formatValue(value, type);

  return (
    <span className={`${className} ${flashClass}`}>
      {formatted}
    </span>
  );
});

FormatCurrency.displayName = 'FormatCurrency';