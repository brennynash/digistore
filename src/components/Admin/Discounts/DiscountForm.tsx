import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
import { DiscountRule, DiscountType } from '../../../types/discount';
import { GlassCard } from '../../ui/GlassCard';
import { calculateDiscount } from '../../../utils/discountCalculator';

interface DiscountFormProps {
  productId: string;
  productPrice: number;
  onSubmit: (discount: Omit<DiscountRule, 'id'>) => void;
  onClose: () => void;
}

export const DiscountForm = ({ productId, productPrice, onSubmit, onClose }: DiscountFormProps) => {
  const [type, setType] = useState<DiscountType>('percentage');
  const [value, setValue] = useState(0);
  const [minQuantity, setMinQuantity] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [previewQuantity, setPreviewQuantity] = useState(1);

  const preview = calculateDiscount(productPrice, previewQuantity, {
    id: '',
    productId,
    type,
    value,
    minQuantity,
    period: { startDate, endDate },
    active: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      productId,
      type,
      value,
      minQuantity,
      period: { startDate, endDate },
      active: true
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <GlassCard className="w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Add Discount</h3>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Discount Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as DiscountType)}
                  className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-2 text-white"
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  {type === 'percentage' ? 'Percentage' : 'Amount'} Value
                </label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                  min={0}
                  max={type === 'percentage' ? 100 : undefined}
                  step={type === 'percentage' ? 1 : 0.01}
                  className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-2 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Minimum Quantity
                </label>
                <input
                  type="number"
                  value={minQuantity}
                  onChange={(e) => setMinQuantity(Number(e.target.value))}
                  min={1}
                  className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-2 text-white"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-2 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-2 text-white"
                  required
                />
              </div>

              <div className="p-4 bg-white/5 rounded-lg space-y-2">
                <h4 className="font-medium text-white">Preview</h4>
                <div className="flex gap-4 items-center">
                  <input
                    type="number"
                    value={previewQuantity}
                    onChange={(e) => setPreviewQuantity(Number(e.target.value))}
                    min={1}
                    className="w-24 bg-white/5 border-2 border-white/10 rounded-lg px-2 py-1 text-white text-sm"
                  />
                  <div className="text-sm">
                    <div className="text-white/60">Original: €{preview.originalPrice.toFixed(2)}</div>
                    <div className="text-green-400">Savings: €{preview.savings.toFixed(2)}</div>
                    <div className="text-white font-medium">Final: €{preview.finalPrice.toFixed(2)}</div>
                  </div>
                </div>
                {!preview.isValid && (
                  <div className="text-red-400 text-sm">{preview.error}</div>
                )}
              </div>
            </div>
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
              Add Discount
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};