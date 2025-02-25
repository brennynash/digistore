import React from 'react';
import { MarqueeProps } from '../../types';

export const Marquee = ({ 
  children, 
  speed = 20, 
  className = '', 
  reverse = false,
  pauseOnHover = false
}: MarqueeProps) => (
  <div className={`overflow-hidden whitespace-nowrap ${className}`}>
    <div 
      className="inline-flex"
      style={{ touchAction: 'none' }}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          className={`
            animate-marquee inline-flex items-center
            ${reverse ? 'animate-marquee-reverse' : ''}
            ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}
          `}
          style={{ 
            animationDuration: `${speed}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite'
          }}
          {...(i === 1 ? { 'aria-hidden': true } : {})}
        >
          {children}
        </div>
      ))}
    </div>
  </div>
);