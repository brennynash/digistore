```typescript
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export const getValueFromPosition = (
  position: number,
  track: HTMLDivElement,
  min: number,
  max: number,
  step: number
): number => {
  const rect = track.getBoundingClientRect();
  const percentage = clamp((position - rect.left) / rect.width, 0, 1);
  const rawValue = min + (max - min) * percentage;
  
  // Round to nearest step
  const steppedValue = Math.round(rawValue / step) * step;
  
  return clamp(steppedValue, min, max);
};
```