import React from 'react';
import { CartItem } from '../../types';
import { CartItems } from './CartItems';
import { CartForm } from './CartForm';
import { CartSummary } from './CartSummary';

interface CartOrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

export const CartOrderSummary = ({
  items,
  subtotal,
  discount,
  total,
  onUpdateQuantity,
  onRemoveItem
}: CartOrderSummaryProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full max-h-[calc(100vh-12rem)] overflow-hidden">
      {/* Left Column - Items */}
      <div className="flex flex-col min-h-0">
        <h2 className="text-xl font-semibold text-white mb-4 sticky top-0 bg-black/95 backdrop-blur-sm py-2 z-10">
          Order Summary
        </h2>
        <div className="overflow-y-auto flex-1 pr-2 -mr-2">
          <CartItems
            items={items}
            onUpdateQuantity={onUpdateQuantity}
            onRemoveItem={onRemoveItem}
          />
        </div>
      </div>

      {/* Right Column - Form & Summary */}
      <div className="flex flex-col min-h-0">
        <div className="overflow-y-auto flex-1 pr-2 -mr-2">
          <CartForm />
        </div>
        <div className="sticky bottom-0 bg-black/95 backdrop-blur-sm pt-4 mt-4">
          <CartSummary
            items={items}
            subtotal={subtotal}
            discount={discount}
            total={total}
          />
        </div>
      </div>
    </div>
  );
};