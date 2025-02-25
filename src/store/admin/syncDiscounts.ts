import { discountStore } from '../discountStore';

export const syncDiscounts = (discounts?: any[]): void => {
  if (!discounts) return;
  discountStore.updateDiscounts(discounts);
};