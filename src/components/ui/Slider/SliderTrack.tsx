```tsx
import React, { forwardRef } from 'react';

interface SliderTrackProps {
  percentage: number;
  disabled?: boolean;
}

export const SliderTrack = forwardRef<HTMLDivElement, SliderTrackProps>(
  ({ percentage, disabled }, ref) => (
    <div 
      ref={ref}
      className={`
        absolute top-1/2 -translate-y-1/2
        h-2 w-full rounded-full
        bg-white/5 overflow-hidden
        ${disabled ? 'opacity-50' : ''}
      `}
    >
      <div 
        className="absolute inset-y-0 left-0 bg-white/20 transition-all duration-150"
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
);

SliderTrack.displayName = 'SliderTrack';
```