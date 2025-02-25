import React from 'react';
import { useSpring, animated } from '@react-spring/web';

interface SliderHandleProps {
  isDragging: boolean;
}

export const SliderHandle = ({ isDragging }: SliderHandleProps) => {
  const animation = useSpring({
    scale: isDragging ? 1.2 : 1,
    boxShadow: isDragging
      ? '0 0 0 6px rgba(255, 255, 255, 0.15)'
      : '0 0 0 3px rgba(255, 255, 255, 0.1)',
    config: { tension: 400, friction: 20 }
  });

  return (
    <animated.div
      style={animation}
      className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white transition-all duration-150 cursor-grab active:cursor-grabbing hover:scale-110 z-[3] pointer-events-auto ring-2 ring-white/5 shadow-lg`}
    />
  );
};