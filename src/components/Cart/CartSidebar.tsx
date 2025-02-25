import React, { useRef, useState } from 'react';
import { Crown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { BentoBox } from '../ui/BentoBox';
import { GlassCard } from '../ui/GlassCard';
import { getLocalStorage } from '../../utils/storage';
import { CartHeader } from './CartHeader';
import { CartOrderSummary } from './CartOrderSummary';

export const CartSidebar = () => {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    subtotal,
    discount,
    total,
    isOpen,
    setIsOpen 
  } = useCart();

  const userPhrase = getLocalStorage('userPhrase');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-full max-w-6xl mx-auto p-4 h-[calc(100vh-2rem)] flex flex-col">
        <GlassCard className="flex-1 flex flex-col overflow-hidden">
          <div className="p-4 md:p-6 flex flex-col h-full">
            <CartHeader
              itemCount={items.length}
              userPhrase={userPhrase}
              onClose={() => setIsOpen(false)}
            />

            {!userPhrase ? (
              <div className="flex-1 flex items-center justify-center">
                <BentoBox className="p-8 text-center max-w-sm">
                  <Crown size={48} className="mx-auto mb-4 text-white/60" />
                  <h3 className="text-xl font-bold text-white mb-2">Guest Access Required</h3>
                  <p className="text-gray-400">Please click "Get Started" to continue shopping</p>
                </BentoBox>
              </div>
            ) : (
              <div className="flex-1 overflow-hidden mt-6">
                <CartOrderSummary
                  items={items}
                  subtotal={subtotal}
                  discount={discount}
                  total={total}
                  onUpdateQuantity={updateQuantity}
                  onRemoveItem={removeItem}
                />
              </div>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};