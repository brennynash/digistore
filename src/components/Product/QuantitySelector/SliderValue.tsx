import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { formatNumber } from '../../../utils/formatters';

interface SliderValueProps {
  value: number;
  isDragging: boolean;
}

export const SliderValue = ({ value, isDragging }: SliderValueProps) => {
  const animation = useSpring({
    opacity: isDragging ? 1 : 0.6,
    scale: isDragging ? 1.1 : 1,
    config: { tension: 400, friction: 20 }
  });

  return (
    <animated.div
      style={animation}
      className="absolute bottom-0 left-1/2 -translate-x-1/2 text-sm text-white/60"
    >
      {formatNumber(value)}
    </animated.div>
  );
};