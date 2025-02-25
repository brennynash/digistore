import React, { useEffect, useState } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchClassName?: string;
}

export const GlitchText = ({ text, className = '', glitchClassName = '' }: GlitchTextProps) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const triggerGlitch = () => {
      if (!isGlitching) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), Math.random() * 200 + 100); // Random duration between 100-300ms
      }
    };

    const interval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance to trigger glitch
        triggerGlitch();
      }
    }, Math.random() * 3000 + 2000); // Random interval between 2-5 seconds

    return () => clearInterval(interval);
  }, [isGlitching]);

  return (
    <div className="relative">
      <span className={className}>{text}</span>
      {isGlitching && (
        <>
          <span 
            className={`absolute inset-0 ${glitchClassName} glitch-1`}
            aria-hidden="true"
          >
            {text}
          </span>
          <span 
            className={`absolute inset-0 ${glitchClassName} glitch-2`}
            aria-hidden="true"
          >
            {text}
          </span>
          <span 
            className={`absolute inset-0 ${glitchClassName} glitch-3`}
            aria-hidden="true"
          >
            {text}
          </span>
        </>
      )}
    </div>
  );
};