export interface WholesaleDiscount {
  id: string;
  productId: string;
  tiers: DiscountTier[];
  active: boolean;
}

export interface DiscountTier {
  minQuantity: number;
  maxQuantity: number;
  percentage: number;
}

export interface DiscountCalculation {
  originalPrice: number;
  discountAmount: number;
  finalPrice: number;
  appliedTier: DiscountTier | null;
  savings: number;
}