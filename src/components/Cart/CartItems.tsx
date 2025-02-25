import React, { useState } from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem } from '../../types';
import { BentoBox } from '../ui/BentoBox';

interface CartItemsProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

export const CartItems = ({ items, onUpdateQuantity, onRemoveItem }: CartItemsProps) => {
  const [itemToRemove, setItemToRemove] = useState<string | null>(null);

  const handleQuantityChange = (id: string, currentQuantity: number, increment: boolean) => {
    const newQuantity = increment
      ? Math.min(3000, currentQuantity + 10)  // Max 3000
      : Math.max(0, currentQuantity - 10);    // Min 0
    onUpdateQuantity(id, newQuantity);
  };

  const handleRemoveClick = (id: string) => {
    setItemToRemove(id);
    onRemoveItem(id);
  };

  return (
    <div className="space-y-4">
      {items.length === 0 ? (
        <div className="text-center py-8 text-white/60">
          Your cart is empty
        </div>
      ) : (
        items.map(item => (
          <BentoBox key={item.id} className="p-4 transition-all duration-300 hover:scale-[1.02]">
            <div className="flex gap-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-white truncate hover:text-clip hover:text-white/90 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400">€{(item.price || 0).toFixed(2)}</p>
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity, false)}
                    className="p-1 rounded-lg glass-effect hover:bg-white/10 transition-colors cursor-pointer"
                    disabled={item.quantity === 0}
                  >
                    <Minus size={16} className="text-white" />
                  </button>
                  <span className="text-white font-medium min-w-[3ch] text-center">
                    {item.quantity || 0}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity, true)}
                    className="p-1 rounded-lg glass-effect hover:bg-white/10 transition-colors cursor-pointer"
                    disabled={item.quantity >= 3000}
                  >
                    <Plus size={16} className="text-white" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveClick(item.id)}
                    style={{
                      cursor: 'pointer',
                      pointerEvents: 'auto'
                    }}
                    className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg 
                      bg-red-900/40 hover:bg-red-800/50 active:bg-red-700/60
                      text-red-200 font-medium select-none !cursor-pointer
                      transition-all duration-150 ease-in-out backdrop-blur-sm
                      pointer-events-auto z-50"
                  >
                    <Trash2 size={18} className="pointer-events-none" />
                    <span className="pointer-events-none">Remove</span>
                  </button>
                </div>
              </div>
            </div>
          </BentoBox>
        ))
      )}
    </div>
  );
};