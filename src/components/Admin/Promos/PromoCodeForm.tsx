import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
import { PromoCode, DiscountType } from '../../../types/promo';
import { GlassCard } from '../../ui/GlassCard';

interface PromoCodeFormProps {
  initialData?: Partial<PromoCode>;
  onSubmit: (data: Omit<PromoCode, 'id' | 'createdAt'>) => void;
  onClose: () => void;
}

export const PromoCodeForm = ({ initialData, onSubmit, onClose }: PromoCodeFormProps) => {
  const [formData, setFormData] = useState({
    code: initialData?.code || '',
    discountType: initialData?.discountType || 'percentage',
    discountValue: initialData?.discountValue || 0,
    status: initialData?.status || 'active'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <GlassCard className="w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">
            {initialData ? 'Edit Promo Code' : 'Create Promo Code'}
          </h3>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Code
            </label>
            <input
              type="text"
              value={formData.code}
              onChange={e => setFormData(prev => ({ ...prev, code: e.target.value }))}
              className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-2 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Discount Type
            </label>
            <select
              value={formData.discountType}
              onChange={e => setFormData(prev => ({ 
                ...prev, 
                discountType: e.target.value as DiscountType 
              }))}
              className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-2 text-white"
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed Amount</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Discount Value
            </label>
            <input
              type="number"
              value={formData.discountValue}
              onChange={e => setFormData(prev => ({ 
                ...prev, 
                discountValue: Number(e.target.value) 
              }))}
              min={0}
              max={formData.discountType === 'percentage' ? 100 : undefined}
              className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-2 text-white"
              required
            />
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
              {initialData ? 'Save Changes' : 'Create Promo Code'}
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};