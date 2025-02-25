import React, { useEffect, useState } from 'react';

interface CurrencyAnimationProps {
  text: string;
  enabled: boolean;
  className?: string;
}

const CURRENCY_SYMBOLS = ['$', '€', '£', '¥'];
const CHINESE_CHARS = ['商', '店', '市', '場'];

export const CurrencyAnimation = ({ text, enabled, className = '' }: CurrencyAnimationProps) => {
  const [displayText, setDisplayText] = useState(text);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSymbol, setIsSymbol] = useState(true);

  useEffect(() => {
    if (!enabled) {
      setDisplayText(text);
      return;
    }

    const symbols = isSymbol ? CURRENCY_SYMBOLS : CHINESE_CHARS;
    const interval = setInterval(() => {
      setDisplayText(prev => {
        const words = prev.split(' ');
        words[0] = symbols[currentIndex] + words[0].slice(1);
        return words.join(' ');
      });

      setCurrentIndex(prev => {
        if (prev === symbols.length - 1) {
          setIsSymbol(prev => !prev);
          return 0;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [enabled, text, currentIndex, isSymbol]);

  return (
    <span className={`transition-all duration-300 ${className}`}>
      {displayText}
    </span>
  );
};