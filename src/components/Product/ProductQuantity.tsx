import React, { useState, useEffect } from 'react';
import { Product } from '../../types';
import { QuantitySelector } from './QuantitySelector/QuantitySelector';
import { useCartItem } from '../../hooks/useCartItem';

interface ProductQuantityProps {
  product: Product;
  priceDisplay: React.ReactNode;
}

export const ProductQuantity = ({ product, priceDisplay }: ProductQuantityProps) => {
  const { quantity, updateQuantity } = useCartItem(product);
  const [localQuantity, setLocalQuantity] = useState(quantity);

  useEffect(() => {
    setLocalQuantity(quantity);
  }, [quantity]);

  const handleQuantityChange = (newQuantity: number) => {
    setLocalQuantity(newQuantity);
    updateQuantity(newQuantity);
  };

  return (
    <div className="space-y-4">
      {React.cloneElement(priceDisplay as React.ReactElement, {
        quantity: localQuantity
      })}
      <QuantitySelector
        productId={product.id}
        initialValue={localQuantity}
        onQuantityChange={handleQuantityChange}
        inStock={product.inStock}
      />
    </div>
  );
};