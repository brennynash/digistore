import React, { createContext, useContext, useState, useEffect } from 'react';
import { WholesaleDiscount, DiscountTier } from '../types/discount';
import { discountStore } from '../store/discountStore';

interface DiscountContextType {
  wholesaleDiscounts: WholesaleDiscount[];
  addWholesaleDiscount: (productId: string, tiers: DiscountTier[]) => void;
  deleteWholesaleDiscount: (discountId: string) => void;
  getProductDiscount: (productId: string, quantity: number) => DiscountTier | null;
}

const DiscountContext = createContext<DiscountContextType | undefined>(undefined);

export const DiscountProvider = ({ children }: { children: React.ReactNode }) => {
  const [wholesaleDiscounts, setWholesaleDiscounts] = useState<WholesaleDiscount[]>(
    discountStore.getDiscounts()
  );

  useEffect(() => {
    return discountStore.subscribe(setWholesaleDiscounts);
  }, []);

  const getProductDiscount = (productId: string, quantity: number): DiscountTier | null => {
    const discount = wholesaleDiscounts.find(d => d.productId === productId && d.active);
    if (!discount) return null;

    return discount.tiers.find(
      tier => quantity >= tier.minQuantity && quantity <= tier.maxQuantity
    ) || null;
  };

  return (
    <DiscountContext.Provider value={{
      wholesaleDiscounts,
      addWholesaleDiscount: (productId, tiers) => discountStore.addDiscount(productId, tiers),
      deleteWholesaleDiscount: (id) => discountStore.deleteDiscount(id),
      getProductDiscount
    }}>
      {children}
    </DiscountContext.Provider>
  );
};

export const useDiscount = () => {
  const context = useContext(DiscountContext);
  if (!context) {
    throw new Error('useDiscount must be used within a DiscountProvider');
  }
  return context;
};