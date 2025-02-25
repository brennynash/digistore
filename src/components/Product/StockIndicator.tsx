import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { useInventory } from '../../hooks/useInventory';
import { InventoryStatus } from '../../types/inventory';
import { useSpring, animated, config } from '@react-spring/web';

interface StockIndicatorProps {
  productId: string;
}

const HIGH_STOCK_PHRASES = [
  { text: 'Tons in Stock', emoji: '🎉' },
  { text: 'Fully Loaded', emoji: '🚀' },
  { text: 'Well Stocked', emoji: '✨' },
  { text: 'Plenty Here', emoji: '💫' },
  { text: 'Fully Stacked', emoji: '📦' }
];

const STOCK_INDICATORS: Record<InventoryStatus['status'], {
  icon: typeof CheckCircle;
  text: (quantity: number) => string;
  className: string;
}> = {
  IN_STOCK: {
    icon: CheckCircle,
    text: (quantity) => quantity > 1000 ? 'High Stock' : `In Stock (${quantity})`,
    className: 'text-green-400 bg-green-400/10'
  },
  LOW_STOCK: {
    icon: AlertTriangle,
    text: (quantity) => `Low Stock (${quantity})`,
    className: 'text-yellow-400 bg-yellow-400/10'
  },
  OUT_OF_STOCK: {
    icon: XCircle,
    text: () => 'Out of Stock',
    className: 'text-red-400 bg-red-400/10'
  }
};

export const StockIndicator = ({ productId }: StockIndicatorProps) => {
  const { getStockStatus } = useInventory();
  const status = getStockStatus(productId);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const textSpring = useSpring({
    from: { 
      opacity: 0,
      transform: 'translateY(10px) scale(0.95)'
    },
    to: { 
      opacity: isTransitioning ? 0 : 1,
      transform: isTransitioning 
        ? 'translateY(10px) scale(0.95)' 
        : 'translateY(0px) scale(1)'
    },
    config: config.gentle,
    onRest: () => {
      if (isTransitioning) {
        setPhraseIndex(current => (current + 1) % HIGH_STOCK_PHRASES.length);
        setIsTransitioning(false);
      }
    }
  });

  useEffect(() => {
    if (status?.quantity && status.quantity > 1000) {
      const interval = setInterval(() => {
        setIsTransitioning(true);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [status?.quantity]);

  if (!status) return null;

  const { icon: Icon, className } = STOCK_INDICATORS[status.status];
  const isHighStock = status.quantity > 1000;

  return (
    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-sm ${className}`}>
      <Icon size={14} className="transform-gpu transition-transform duration-300" />
      {isHighStock ? (
        <animated.div 
          style={textSpring}
          className="flex items-center gap-1 min-w-[80px]"
        >
          <span>{HIGH_STOCK_PHRASES[phraseIndex].text}</span>
          <span className="text-base transform-gpu transition-transform duration-300 hover:scale-110">
            {HIGH_STOCK_PHRASES[phraseIndex].emoji}
          </span>
        </animated.div>
      ) : (
        <span>{STOCK_INDICATORS[status.status].text(status.quantity)}</span>
      )}
    </div>
  );
};