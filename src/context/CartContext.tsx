import React, { createContext, useState, useEffect, useContext } from 'react';
import { Product, CartItem } from '../types';
import { getLocalStorage, setLocalStorage } from '../utils/storage';
import { usePromoCode } from '../hooks/usePromoCode';
import { useDiscount } from './DiscountContext';
import { calculateCartTotal } from '../utils/cartCalculator';

interface CartState {
  items: CartItem[];
  promoCode: string | null;
  subtotal: number;
  discount: number;
  total: number;
  isOpen: boolean;
}

interface CartContextType extends CartState {
  updateQuantity: (productId: string, quantity: number, item?: CartItem) => void;
  removeItem: (productId: string) => void;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { applyPromoCode: validatePromo } = usePromoCode();
  const { getProductDiscount } = useDiscount();
  
  const [state, setState] = useState<CartState>(() => ({
    items: getLocalStorage('cart') || [],
    promoCode: getLocalStorage('cartPromoCode') || null,
    subtotal: 0,
    discount: 0,
    total: 0,
    isOpen: false
  }));

  const updateQuantity = (productId: string, quantity: number, item?: CartItem) => {
    setState(prev => {
      const newItems = [...prev.items];
      const index = newItems.findIndex(i => i.id === productId);

      if (quantity <= 0) {
        if (index > -1) {
          newItems.splice(index, 1);
        }
      } else if (index > -1) {
        newItems[index] = { ...newItems[index], quantity };
      } else if (item) {
        newItems.push({ ...item, quantity });
      }

      return { ...prev, items: newItems };
    });
  };

  const removeItem = (productId: string) => {
    setState(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== productId)
    }));
  };

  const applyPromoCode = (code: string) => {
    setState(prev => ({ ...prev, promoCode: code }));
    setLocalStorage('cartPromoCode', code);
    return true;
  };

  const removePromoCode = () => {
    setState(prev => ({ ...prev, promoCode: null }));
    setLocalStorage('cartPromoCode', null);
  };

  // Calculate totals whenever items or promo code changes
  useEffect(() => {
    const wholesaleDiscounts = state.items.reduce((acc, item) => ({
      ...acc,
      [item.id]: getProductDiscount(item.id, item.quantity)
    }), {});

    const promoCalculation = validatePromo(state.promoCode || '', state.subtotal);
    const totals = calculateCartTotal(state.items, wholesaleDiscounts, promoCalculation);

    setState(prev => ({
      ...prev,
      ...totals
    }));
  }, [state.items, state.promoCode, validatePromo, getProductDiscount]);

  // Save cart items to localStorage
  useEffect(() => {
    setLocalStorage('cart', state.items);
  }, [state.items]);

  return (
    <CartContext.Provider value={{
      ...state,
      updateQuantity,
      removeItem,
      applyPromoCode,
      removePromoCode,
      setIsOpen: (isOpen) => setState(prev => ({ ...prev, isOpen }))
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};