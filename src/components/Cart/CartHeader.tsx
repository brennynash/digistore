import React from 'react';
import { X, ShoppingCart } from 'lucide-react';
import { Crown3D } from '../icons/Crown3D';

interface CartHeaderProps {
  itemCount: number;
  userPhrase: string | null;
  onClose: () => void;
}

export const CartHeader = ({ itemCount, userPhrase, onClose }: CartHeaderProps) => (
  <div className="flex justify-between items-center mb-6">
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <ShoppingCart size={24} className="text-white" />
        <span className="text-white font-medium">{itemCount}</span>
      </div>
      {userPhrase && (
        <div className="flex items-center gap-2 glass-effect px-3 py-1.5 rounded-lg">
          <Crown3D />
          <span className="text-white text-sm">{userPhrase}</span>
        </div>
      )}
    </div>
    <button
      onClick={onClose}
      className="text-white/60 hover:text-white"
    >
      <X size={24} />
    </button>
  </div>
);