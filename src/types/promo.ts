export type DiscountType = 'percentage' | 'fixed';
export type PromoStatus = 'active' | 'expired';

export interface PromoCode {
  id: string;
  code: string;
  discountType: DiscountType;
  discountValue: number;
  status: PromoStatus;
  createdAt: number;
  usageCount: number;
  totalSavings: number;
}

export interface PromoMetrics {
  usageCount: number;
  totalSavings: number;
  averageDiscount: number;
  lastUsed: number | null;
}

export interface PromoCalculation {
  originalPrice: number;
  discountAmount: number;
  finalPrice: number;
  isValid: boolean;
  error?: string;
}