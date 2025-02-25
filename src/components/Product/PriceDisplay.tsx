import React from 'react';
import { useDiscount } from '../../context/DiscountContext';
import { calculateWholesaleDiscount } from '../../utils/discountCalculator';

interface PriceDisplayProps {
  productId: string;
  basePrice: number;
  quantity: number;
}

export const PriceDisplay = ({ productId, basePrice, quantity }: PriceDisplayProps) => {
  const { wholesaleDiscounts } = useDiscount();
  const discount = wholesaleDiscounts?.find(d => d.productId === productId && d.active);
  const calculation = calculateWholesaleDiscount(basePrice, quantity, discount);

  return (
    <div className="space-y-2">
      <div className="flex flex-col">
        <div className="flex items-baseline gap-2">
          <span className="text-lg text-white/60">
            Base Price: €{basePrice.toFixed(2)}
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-white">
            Total: €{calculation.finalPrice.toFixed(2)}
          </span>
        </div>
      </div>
      
      {calculation.appliedTier && (
        <div className="flex items-center gap-2">
          <span className="text-green-400 text-sm font-medium">
            {calculation.appliedTier.percentage}% off
          </span>
          <span className="text-white/60 text-sm">
            Save €{calculation.savings.toFixed(2)}
          </span>
        </div>
      )}
    </div>
  );
};