import { WholesaleDiscount, DiscountTier, DiscountCalculation } from '../types/discount';

export const calculateWholesaleDiscount = (
  basePrice: number,
  quantity: number,
  discount?: WholesaleDiscount | null
): DiscountCalculation => {
  const originalPrice = basePrice * quantity;

  if (!discount?.active || quantity === 0) {
    return {
      originalPrice,
      discountAmount: 0,
      finalPrice: originalPrice,
      appliedTier: null,
      savings: 0
    };
  }

  // Find applicable tier
  const applicableTier = discount.tiers
    .sort((a, b) => b.percentage - a.percentage) // Sort by highest discount first
    .find(tier => quantity >= tier.minQuantity && quantity <= tier.maxQuantity);

  if (!applicableTier) {
    return {
      originalPrice,
      discountAmount: 0,
      finalPrice: originalPrice,
      appliedTier: null,
      savings: 0
    };
  }

  const discountAmount = originalPrice * (applicableTier.percentage / 100);
  const finalPrice = originalPrice - discountAmount;

  return {
    originalPrice,
    discountAmount,
    finalPrice,
    appliedTier: applicableTier,
    savings: discountAmount
  };
};