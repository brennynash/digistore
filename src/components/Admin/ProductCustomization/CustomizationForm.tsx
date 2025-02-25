import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { CustomizationFormData } from '../../../types/customization';
import { useCustomization } from '../../../context/CustomizationContext';
import { GlassCard } from '../../ui/GlassCard';

interface CustomizationFormProps {
  productId: string;
  onClose: () => void;
}

export const CustomizationForm = ({ productId, onClose }: CustomizationFormProps) => {
  const { addCustomization } = useCustomization();
  const [formData, setFormData] = useState<CustomizationFormData>({
    name: '',
    type: 'select',
    required: false,
    price: 0,
    values: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const option = {
      id: crypto.randomUUID(),
      ...formData,
    };
    addCustomization(productId, option);
    onClose();
  };

  return (
    <GlassCard className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">Add Customization Option</h3>
        <button
          onClick={onClose}
          className="text-white/60 hover:text-white"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Option Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-2 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Price Addition (€)
          </label>
          <input
            type="number"
            value={formData.price}
            onChange={e => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
            className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-2 text-white"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.required}
            onChange={e => setFormData(prev => ({ ...prev, required: e.target.checked }))}
            className="rounded border-white/10 bg-white/5 text-white"
          />
          <label className="text-sm font-medium text-white/80">
            Required Option
          </label>
        </div>

        <button
          type="submit"
          className="w-full glass-effect text-white font-medium py-3 rounded-lg hover:bg-white/10 flex items-center justify-center gap-2"
        >
          <Save size={20} />
          Save Option
        </button>
      </form>
    </GlassCard>
  );
};