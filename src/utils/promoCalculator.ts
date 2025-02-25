import { PromoCode, PromoCalculation } from '../types/promo';

export const calculatePromoDiscount = (
  price: number,
  promoCode: PromoCode | null
): PromoCalculation => {
  if (!price || price <= 0) {
    return {
      originalPrice: 0,
      discountAmount: 0,
      finalPrice: 0,
      isValid: true
    };
  }

  if (!promoCode || promoCode.status !== 'active') {
    return {
      originalPrice: price,
      discountAmount: 0,
      finalPrice: price,
      isValid: false,
      error: 'Invalid or expired promo code'
    };
  }

  const discountAmount = promoCode.discountType === 'percentage'
    ? (price * (promoCode.discountValue / 100))
    : Math.min(promoCode.discountValue, price);

  const finalPrice = Math.max(0, price - discountAmount);

  return {
    originalPrice: price,
    discountAmount,
    finalPrice,
    isValid: true
  };
};