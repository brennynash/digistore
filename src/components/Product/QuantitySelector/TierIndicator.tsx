import React from 'react';
import { formatNumber } from '../../../utils/formatters';

interface TierIndicatorProps {
  currentTier: 'low' | 'medium' | 'high';
}

export const TierIndicator = ({ currentTier }: TierIndicatorProps) => {
  const tiers = [
    { key: 'low', label: 'Basic', range: '0 - 490' },
    { key: 'medium', label: 'Bulk', range: '500 - 990' },
    { key: 'high', label: 'Wholesale', range: '1000 - 3000' }
  ] as const;

  return (
    <div className="mt-6 flex justify-between">
      {tiers.map(({ key, label, range }) => (
        <div
          key={key}
          className={`text-center transition-all duration-300 ${
            currentTier === key
              ? 'text-white scale-110'
              : 'text-white/40 scale-100'
          }`}
        >
          <div className="text-xs font-medium mb-1">
            {label}
          </div>
          <div className="text-[10px]">{range}</div>
        </div>
      ))}
    </div>
  );
};