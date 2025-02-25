import React, { useState } from 'react';
import { Save, Plus, Minus } from 'lucide-react';
import { DiscountTier } from '../../../types/discount';
import { DEFAULT_DISCOUNT_TIERS } from '../../../constants/discountTiers';
import { GlassCard } from '../../ui/GlassCard';

interface WholesaleDiscountFormProps {
  productId: string;
  onSubmit: (tiers: DiscountTier[]) => void;
  onClose: () => void;
}

export const WholesaleDiscountForm = ({ productId, onSubmit, onClose }: WholesaleDiscountFormProps) => {
  const [tiers, setTiers] = useState<DiscountTier[]>(DEFAULT_DISCOUNT_TIERS);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(tiers);
  };

  const updateTier = (index: number, updates: Partial<DiscountTier>) => {
    setTiers(current => current.map((tier, i) => 
      i === index ? { ...tier, ...updates } : tier
    ));
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <GlassCard className="w-full max-w-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-6">Wholesale Discount Tiers</h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {tiers.map((tier, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 items-center">
                <div className="space-y-1">
                  <label className="text-sm text-white/80">Min Quantity</label>
                  <input
                    type="number"
                    value={tier.minQuantity}
                    onChange={(e) => updateTier(index, { minQuantity: Number(e.target.value) })}
                    className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-white/80">Max Quantity</label>
                  <input
                    type="number"
                    value={tier.maxQuantity}
                    onChange={(e) => updateTier(index, { maxQuantity: Number(e.target.value) })}
                    className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-3 py-2 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-white/80">Discount %</label>
                  <input
                    type="number"
                    value={tier.percentage}
                    onChange={(e) => updateTier(index, { percentage: Number(e.target.value) })}
                    min="0"
                    max="100"
                    className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-3 py-2 text-white"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-white hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="glass-effect px-6 py-2 rounded-lg text-white hover:bg-white/10 flex items-center gap-2"
            >
              <Save size={20} />
              Save Tiers
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};