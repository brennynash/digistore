```typescript
import { RefObject, useCallback } from 'react';
import { clamp, getValueFromPosition } from '../utils';

interface UseSliderInteractionProps {
  trackRef: RefObject<HTMLDivElement>;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  onChangeEnd?: (value: number) => void;
  setIsDragging: (isDragging: boolean) => void;
}

export const useSliderInteraction = ({
  trackRef,
  min,
  max,
  step,
  value,
  onChange,
  onChangeEnd,
  setIsDragging
}: UseSliderInteractionProps) => {
  const handleInteractionStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);

    if (!trackRef.current) return;

    const position = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const newValue = getValueFromPosition(position, trackRef.current, min, max, step);
    
    if (newValue !== value) {
      onChange(newValue);
    }
  }, [trackRef, min, max, step, value, onChange, setIsDragging]);

  const handleInteractionMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!trackRef.current) return;

    const position = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const newValue = getValueFromPosition(position, trackRef.current, min, max, step);
    
    if (newValue !== value) {
      onChange(newValue);
    }
  }, [trackRef, min, max, step, value, onChange]);

  const handleInteractionEnd = useCallback(() => {
    setIsDragging(false);
    if (onChangeEnd) {
      onChangeEnd(value);
    }
  }, [onChangeEnd, value, setIsDragging]);

  return {
    handleInteractionStart,
    handleInteractionMove,
    handleInteractionEnd
  };
};
```