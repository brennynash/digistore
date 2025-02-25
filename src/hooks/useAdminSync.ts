import { useEffect, useCallback } from 'react';
import { useAdmin } from '../context/AdminContext';
import { useProducts } from '../context/ProductContext';
import { useNews } from '../hooks/useNews';
import { useDiscount } from '../context/DiscountContext';
import { errorHandler } from '../utils/errorHandler';

export const useAdminSync = () => {
  const { isAdmin, applyChanges } = useAdmin();
  const { products } = useProducts();
  const { items: newsItems } = useNews();
  const { wholesaleDiscounts } = useDiscount();

  const handleSync = useCallback(async () => {
    if (!isAdmin) return;

    try {
      await applyChanges({
        products,
        news: newsItems,
        discounts: wholesaleDiscounts
      });
    } catch (error) {
      errorHandler(error);
    }
  }, [isAdmin, products, newsItems, wholesaleDiscounts, applyChanges]);

  useEffect(() => {
    handleSync();
  }, [handleSync]);
};