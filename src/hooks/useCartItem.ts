import { useCallback } from 'react';
import { useCart } from './useCart';
import { Product } from '../types';

export const useCartItem = (product: Product) => {
  const { items, updateQuantity: updateCart } = useCart();
  
  const cartItem = items.find(item => item.id === product.id);
  
  const updateQuantity = useCallback((quantity: number) => {
    if (quantity === 0) {
      updateCart(product.id, 0); // This will remove the item
    } else if (!cartItem && quantity > 0) {
      // Add new item
      updateCart(product.id, quantity, {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity
      });
    } else {
      // Update existing item
      updateCart(product.id, quantity);
    }
  }, [product, cartItem, updateCart]);

  return {
    quantity: cartItem?.quantity || 0,
    updateQuantity,
    isInCart: !!cartItem
  };
};