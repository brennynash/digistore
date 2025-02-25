import { DiscountTier } from '../types/discount';

export const DEFAULT_DISCOUNT_TIERS: DiscountTier[] = [
  { minQuantity: 10, maxQuantity: 49, percentage: 5 },    // 5% off for 10-49 units
  { minQuantity: 50, maxQuantity: 99, percentage: 10 },   // 10% off for 50-99 units
  { minQuantity: 100, maxQuantity: 499, percentage: 15 }, // 15% off for 100-499 units
  { minQuantity: 500, maxQuantity: 999, percentage: 20 }, // 20% off for 500-999 units
  { minQuantity: 1000, maxQuantity: 3000, percentage: 25 } // 25% off for 1000+ units
];