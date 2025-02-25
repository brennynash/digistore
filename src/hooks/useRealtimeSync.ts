import { useEffect } from 'react';
import { subscribeToChanges } from '../services/db/supabase';
import { useProducts } from '../context/ProductContext';
import { useNews } from '../context/NewsContext';
import { useDiscount } from '../context/DiscountContext';

export const useRealtimeSync = () => {
  const { updateProducts } = useProducts();
  const { updateNews } = useNews();
  const { updateDiscounts } = useDiscount();

  useEffect(() => {
    // Subscribe to products changes
    const productsSubscription = subscribeToChanges('products', (payload) => {
      if (payload.new) {
        updateProducts([payload.new]);
      }
    });

    // Subscribe to news changes
    const newsSubscription = subscribeToChanges('news', (payload) => {
      if (payload.new) {
        updateNews([payload.new]);
      }
    });

    // Subscribe to discounts changes
    const discountsSubscription = subscribeToChanges('discounts', (payload) => {
      if (payload.new) {
        updateDiscounts([payload.new]);
      }
    });

    return () => {
      productsSubscription.unsubscribe();
      newsSubscription.unsubscribe();
      discountsSubscription.unsubscribe();
    };
  }, [updateProducts, updateNews, updateDiscounts]);
};