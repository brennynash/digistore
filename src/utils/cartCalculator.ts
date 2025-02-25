import { CartItem } from '../types';
import { PromoCalculation } from '../types/promo';
import { DiscountTier } from '../types/discount';

export interface CartTotals {
  subtotal: number;
  discount: number;
  total: number;
}

export const calculateItemPrice = (
  item: CartItem,
  wholesaleDiscount: DiscountTier | null
): number => {
  const basePrice = item.price * item.quantity;
  
  if (!wholesaleDiscount) {
    return basePrice;
  }

  const discountAmount = basePrice * (wholesaleDiscount.percentage / 100);
  return basePrice - discountAmount;
};

export const calculateCartTotal = (
  items: CartItem[],
  wholesaleDiscounts: Record<string, DiscountTier | null>,
  promoCalculation: PromoCalculation
): CartTotals => {
  // Calculate subtotal with wholesale discounts
  const subtotal = items.reduce((sum, item) => {
    const wholesaleDiscount = wholesaleDiscounts[item.id];
    return sum + calculateItemPrice(item, wholesaleDiscount);
  }, 0);

  // If no discounts are applied, total equals subtotal
  if (!promoCalculation || !promoCalculation.discountAmount) {
    return {
      subtotal,
      discount: 0,
      total: subtotal
    };
  }
  
  // Apply promo code discount if available
  return {
    subtotal,
    discount: promoCalculation.discountAmount,
    total: promoCalculation.finalPrice
  };
};