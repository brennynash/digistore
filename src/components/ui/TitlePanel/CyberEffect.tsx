import React, { useEffect, useState } from 'react';

interface CyberEffectProps {
  text: string;
  enabled: boolean;
  className?: string;
}

const CYBER_CHARS = ['>', '/', '_', '\\', '<', '|', ']', '['];
const NEON_COLORS = [
  'text-cyan-400',
  'text-purple-400',
  'text-pink-400',
  'text-blue-400'
];

export const CyberEffect = ({ text, enabled, className = '' }: CyberEffectProps) => {
  const [displayText, setDisplayText] = useState(text);
  const [colorIndex, setColorIndex] = useState(0);
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setDisplayText(text);
      return;
    }

    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance to trigger glitch
        setGlitching(true);
        
        // Create glitch text
        const glitchText = text.split('').map(char => {
          if (Math.random() < 0.3) { // 30% chance to replace character
            return CYBER_CHARS[Math.floor(Math.random() * CYBER_CHARS.length)];
          }
          return char;
        }).join('');
        
        setDisplayText(glitchText);
        setColorIndex(prev => (prev + 1) % NEON_COLORS.length);

        // Reset after short duration
        setTimeout(() => {
          setGlitching(false);
          setDisplayText(text);
        }, 150);
      }
    }, 2000);

    return () => clearInterval(glitchInterval);
  }, [enabled, text]);

  return (
    <span 
      className={`
        relative transition-all duration-150
        ${className}
        ${glitching ? NEON_COLORS[colorIndex] : ''}
        ${glitching ? 'blur-[0.5px]' : ''}
      `}
      style={{
        textShadow: glitching 
          ? `0 0 5px currentColor, 0 0 10px currentColor, 0 0 20px currentColor`
          : 'none'
      }}
    >
      {displayText}
    </span>
  );
};