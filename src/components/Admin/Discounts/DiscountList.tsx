import React from 'react';
import { Trash2, Tag } from 'lucide-react';
import { DiscountRule } from '../../../types/discount';
import { GlassCard } from '../../ui/GlassCard';

interface DiscountListProps {
  discounts: DiscountRule[];
  onDelete: (discountId: string) => void;
}

export const DiscountList = ({ discounts, onDelete }: DiscountListProps) => {
  const isDiscountActive = (discount: DiscountRule) => {
    const now = new Date();
    const start = new Date(discount.period.startDate);
    const end = new Date(discount.period.endDate);
    return discount.active && now >= start && now <= end;
  };

  return (
    <div className="space-y-4">
      {discounts.map(discount => (
        <GlassCard key={discount.id} className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Tag size={20} className="text-white/60" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">
                    {discount.type === 'percentage' 
                      ? `${discount.value}% off`
                      : `€${discount.value} off`}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    isDiscountActive(discount)
                      ? 'bg-green-400/10 text-green-400'
                      : 'bg-red-400/10 text-red-400'
                  }`}>
                    {isDiscountActive(discount) ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="text-sm text-white/60">
                  Min. quantity: {discount.minQuantity} • 
                  Valid: {new Date(discount.period.startDate).toLocaleDateString()} - 
                  {new Date(discount.period.endDate).toLocaleDateString()}
                </div>
              </div>
            </div>
            <button
              onClick={() => onDelete(discount.id)}
              className="p-2 rounded-lg hover:bg-white/5 text-red-400 hover:text-red-300"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </GlassCard>
      ))}
    </div>
  );
};