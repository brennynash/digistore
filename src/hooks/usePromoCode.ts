import { useState, useCallback, useEffect } from 'react';
import { PromoCode, PromoCalculation } from '../types/promo';
import { promoStore } from '../store/promoStore';

export const usePromoCode = () => {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>(promoStore.getPromoCodes());

  useEffect(() => {
    return promoStore.subscribe(setPromoCodes);
  }, []);

  const addPromoCode = useCallback((code: Omit<PromoCode, 'id' | 'createdAt' | 'usageCount' | 'totalSavings'>) => {
    promoStore.addPromoCode(code);
  }, []);

  const updatePromoCode = useCallback((id: string, updates: Partial<PromoCode>) => {
    promoStore.updatePromoCode(id, updates);
  }, []);

  const deletePromoCode = useCallback((id: string) => {
    promoStore.deletePromoCode(id);
  }, []);

  const applyPromoCode = useCallback((code: string, price: number): PromoCalculation => {
    if (!code) {
      return {
        originalPrice: price,
        discountAmount: 0,
        finalPrice: price,
        isValid: true
      };
    }
    return promoStore.applyPromoCode(code, price);
  }, []);

  const getMetrics = useCallback((promoId: string) => {
    return promoStore.getMetrics(promoId);
  }, []);

  return {
    promoCodes,
    addPromoCode,
    updatePromoCode,
    deletePromoCode,
    applyPromoCode,
    getMetrics
  };
};