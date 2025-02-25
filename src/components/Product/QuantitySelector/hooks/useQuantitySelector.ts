import { useState, useCallback, useMemo } from 'react';
import { QUANTITY_TIERS, ALL_STEPS } from '../constants';

export const useQuantitySelector = (initialValue = 0) => {
  const [quantity, setQuantity] = useState(initialValue);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const currentTier = useMemo(() => {
    if (quantity < 500) return 'low';
    if (quantity < 1000) return 'medium';
    return 'high';
  }, [quantity]);

  const handleSliderChange = useCallback((value: number) => {
    // Ensure value is a multiple of 10
    const roundedValue = Math.round(value / 10) * 10;
    setQuantity(roundedValue);
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  }, [hasInteracted]);

  const handleSliderStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleSliderEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  return {
    quantity,
    isDragging,
    hasInteracted,
    currentTier,
    handleSliderChange,
    handleSliderStart,
    handleSliderEnd
  };
};