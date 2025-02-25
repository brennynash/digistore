```tsx
import React from 'react';

interface SliderHandleProps {
  isDragging: boolean;
}

export const SliderHandle = ({ isDragging }: SliderHandleProps) => (
  <div 
    className={`
      absolute inset-0 rounded-full
      bg-gradient-to-b from-white/90 to-white/80
      transition-shadow duration-150
      ${isDragging ? 'shadow-lg ring-4 ring-white/20' : 'shadow-md'}
    `}
  />
);
```