import React from 'react';
import { Tag } from 'lucide-react';

interface CartPromoProps {
  promoInput: string;
  promoCode: string | null;
  onPromoInputChange: (value: string) => void;
  onApplyPromo: () => void;
  onRemovePromo: () => void;
}

export const CartPromo = ({
  promoInput,
  promoCode,
  onPromoInputChange,
  onApplyPromo,
  onRemovePromo
}: CartPromoProps) => (
  <div className="space-y-4">
    <div className="flex gap-2">
      <input
        type="text"
        value={promoInput}
        onChange={(e) => onPromoInputChange(e.target.value)}
        placeholder="Enter promo code"
        className="flex-1 bg-white/5 border-2 border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/20"
      />
      <button
        onClick={onApplyPromo}
        className="glass-effect px-4 rounded-lg text-white flex items-center gap-2"
      >
        <Tag size={16} />
        Apply
      </button>
    </div>

    {promoCode && (
      <div className="flex items-center justify-between bg-green-400/10 text-green-400 px-4 py-2 rounded-lg">
        <div className="flex items-center gap-2">
          <Tag size={16} />
          <span>Code {promoCode} applied</span>
        </div>
        <button
          onClick={onRemovePromo}
          className="text-sm hover:text-green-300"
        >
          Remove
        </button>
      </div>
    )}
  </div>
);