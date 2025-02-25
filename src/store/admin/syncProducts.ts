import { productStore } from '../productStore';

export const syncProducts = (products?: any[]): void => {
  if (!products) return;
  productStore.updateProducts(products);
};