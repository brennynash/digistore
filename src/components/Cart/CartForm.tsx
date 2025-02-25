import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { BentoBox } from '../ui/BentoBox';
import { CartPromo } from './CartPromo';

export const CartForm = () => {
  const { promoCode, applyPromoCode, removePromoCode } = useCart();
  const [promoInput, setPromoInput] = useState('');
  const [district, setDistrict] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const handleApplyPromo = () => {
    if (applyPromoCode(promoInput)) {
      setPromoInput('');
    }
  };

  return (
    <BentoBox className="p-4 space-y-4">
      <CartPromo
        promoInput={promoInput}
        promoCode={promoCode}
        onPromoInputChange={setPromoInput}
        onApplyPromo={handleApplyPromo}
        onRemovePromo={removePromoCode}
      />

      <div className="space-y-4">
        <div>
          <label htmlFor="district" className="block text-sm font-medium text-white/80 mb-2">
            District
          </label>
          <input
            id="district"
            type="text"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            placeholder="Enter your district"
            className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/20"
          />
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-white/80 mb-2">
            Additional Notes
          </label>
          <textarea
            id="notes"
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            placeholder="Additional notes (optional)"
            className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/20 resize-none h-24"
          />
        </div>
      </div>
    </BentoBox>
  );
};