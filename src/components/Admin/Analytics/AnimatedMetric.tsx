import React, { useEffect, useRef, useState } from 'react';
import { useSpring, animated, config } from '@react-spring/web';

interface AnimatedMetricProps {
  value: number;
  formatter?: (value: number) => string;
  className?: string;
}

export const AnimatedMetric = ({ value, formatter = (v) => v.toString(), className = '' }: AnimatedMetricProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const prevValue = useRef(value);

  const { number } = useSpring({
    from: { number: prevValue.current },
    to: { number: value },
    config: config.gentle,
    onStart: () => setIsAnimating(true),
    onRest: () => setIsAnimating(false),
  });

  useEffect(() => {
    prevValue.current = value;
  }, [value]);

  return (
    <animated.span className={`${className} ${isAnimating ? 'text-green-400' : ''} transition-colors duration-300`}>
      {number.to(n => formatter(n))}
    </animated.span>
  );
};