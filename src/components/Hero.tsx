import React, { useState } from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import { TextScramble } from './Product/Card/TextScramble';

export const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [scramble, setScramble] = useState(false);

  const titleSpring = useSpring({
    scale: isHovered ? 1.05 : 1,
    y: isHovered ? -8 : 0,
    config: {
      tension: 300,
      friction: 20
    },
  });

  const maskSpring = useSpring({
    maskPosition: isHovered ? '100% 0' : '0% 0',
    config: { tension: 120, friction: 14 }
  });

  const handleMouseEnter = () => {
    setIsHovered(true);
    setScramble(true);
    setTimeout(() => setScramble(false), 800);
  };

  return (
    <div className="relative py-20 overflow-hidden preserve-3d">
      <div className="relative max-w-7xl mx-auto px-6 text-center preserve-3d">
        <animated.div
          style={titleSpring}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setIsHovered(false)}
          className="inline-block p-6 rounded-2xl cursor-pointer relative btn btn-glitch preserve-3d"

        >
          <svg width="0" height="0">
            <defs>
              <linearGradient id="titleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#646cff', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#9333ea', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#646cff', stopOpacity: 1 }} />
              </linearGradient>
              <mask id="titleMask">
                <animated.rect
                  x="0"
                  y="0"
                  width="200%"
                  height="100%"
                  fill="url(#titleGradient)"
                  style={{
                    transform: maskSpring.maskPosition.to(
                      x => `translateX(-${x})`
                    )
                  }}
                />
              </mask>
            </defs>
          </svg>

          <div className="absolute inset-0 glass-effect btn-shine rounded-2xl" />

          <animated.div
            className="absolute inset-0 bg-gradient-to-r from-[#646cff] via-[#9333ea] to-[#646cff] rounded-2xl"
            style={{
              mask: 'url(#titleMask)',
              WebkitMask: 'url(#titleMask)',
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.3s ease'
            }}
          />

          <div className="text-4xl md:text-5xl lg:text-6xl text-white font-bold transform-gpu relative">
            <TextScramble text="DIGITAL STORE" scramble={scramble} delay={500} />
          </div>
        </animated.div>
      </div>
    </div>
  );
};