import React from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import { formatNumber } from '../../../utils/formatters';
import { useDiscount } from '../../../context/DiscountContext';
import { SliderTrack } from './SliderTrack';
import { SliderHandle } from './SliderHandle';
import { useQuantitySelector } from './hooks/useQuantitySelector';
import { ALL_STEPS } from './constants';
import { AddToCartButton } from './AddToCartButton';

interface QuantitySelectorProps {
  productId: string;
  initialValue?: number;
  onQuantityChange: (quantity: number) => void;
  inStock: boolean;
}

export const QuantitySelector = ({
  productId,
  initialValue = 0,
  onQuantityChange,
  inStock
}: QuantitySelectorProps) => {
  const { getProductDiscount } = useDiscount();
  const {
    quantity,
    isDragging,
    hasInteracted,
    handleSliderChange,
    handleSliderStart,
    handleSliderEnd
  } = useQuantitySelector(initialValue);

  const discount = getProductDiscount(productId, quantity);

  const valueAnimation = useSpring({
    scale: isDragging ? 1.1 : 1,
    y: isDragging ? -8 : 0,
    config: config.gentle
  });

  const handleAddToCart = () => {
    if (quantity > 0) {
      onQuantityChange(quantity);
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative pt-8 pb-4">
        <animated.div
          style={valueAnimation}
          className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <span className="text-2xl font-bold text-white">
            {formatNumber(quantity)}
          </span>
          {isDragging && discount && (
            <span className="text-green-400 text-sm font-medium animate-fade-in">
              {discount.percentage}% off
            </span>
          )}
        </animated.div>

        <SliderTrack
          value={quantity}
          steps={ALL_STEPS}
          onChange={handleSliderChange}
          onDragStart={handleSliderStart}
          onDragEnd={handleSliderEnd}
        >
          <SliderHandle isDragging={isDragging} />
        </SliderTrack>
      </div>

      <AddToCartButton
        quantity={quantity}
        hasInteracted={hasInteracted}
        inStock={inStock}
        onClick={handleAddToCart}
      />
    </div>
  );
};