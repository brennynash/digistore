```tsx
import React, { useRef, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { SliderTrack } from './SliderTrack';
import { SliderHandle } from './SliderHandle';
import { useSliderInteraction } from './hooks/useSliderInteraction';
import { clamp } from './utils';

interface SliderProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onChange: (value: number) => void;
  onChangeEnd?: (value: number) => void;
  className?: string;
  'aria-label'?: string;
}

export const Slider = ({
  value,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  onChange,
  onChangeEnd,
  className = '',
  'aria-label': ariaLabel
}: SliderProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const {
    handleInteractionStart,
    handleInteractionMove,
    handleInteractionEnd
  } = useSliderInteraction({
    trackRef,
    min,
    max,
    step,
    value,
    onChange,
    onChangeEnd,
    setIsDragging
  });

  const percentage = ((value - min) / (max - min)) * 100;

  const handleAnimation = useSpring({
    transform: `scale(${isDragging ? 1.2 : 1})`,
    config: { tension: 300, friction: 20 }
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    const stepSize = e.shiftKey ? step * 10 : step;
    let newValue = value;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = clamp(value + stepSize, min, max);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = clamp(value - stepSize, min, max);
        break;
      case 'Home':
        newValue = min;
        break;
      case 'End':
        newValue = max;
        break;
      default:
        return;
    }

    e.preventDefault();
    onChange(newValue);
    onChangeEnd?.(newValue);
  };

  return (
    <div 
      className={`relative h-12 ${className}`}
      onMouseDown={handleInteractionStart}
      onTouchStart={handleInteractionStart}
      onMouseMove={handleInteractionMove}
      onTouchMove={handleInteractionMove}
      onMouseUp={handleInteractionEnd}
      onTouchEnd={handleInteractionEnd}
      onMouseLeave={handleInteractionEnd}
    >
      <SliderTrack
        ref={trackRef}
        percentage={percentage}
        disabled={disabled}
      />
      
      <animated.div
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-label={ariaLabel}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-disabled={disabled}
        style={{
          ...handleAnimation,
          left: `${percentage}%`
        }}
        onKeyDown={handleKeyDown}
        className={`
          absolute top-1/2 -translate-y-1/2 -ml-3
          w-6 h-6 rounded-full bg-white
          shadow-lg cursor-pointer select-none
          focus:outline-none focus:ring-2 focus:ring-white/50
          touch-none
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <SliderHandle isDragging={isDragging} />
      </animated.div>
    </div>
  );
};
```