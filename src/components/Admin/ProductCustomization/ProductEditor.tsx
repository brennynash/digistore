import React, { useState, useRef } from 'react';
import { Save, Upload, X } from 'lucide-react';
import { Product } from '../../../types';
import { GlassCard } from '../../ui/GlassCard';

interface ProductEditorProps {
  product: Product;
  onSave: (productId: string, updates: Partial<Product>) => void;
  onClose: () => void;
}

export const ProductEditor = ({ product, onSave, onClose }: ProductEditorProps) => {
  const [formData, setFormData] = useState({
    title: product.title,
    description: product.description,
    price: product.price,
    image: product.image
  });
  const [imagePreview, setImagePreview] = useState(product.image);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData(prev => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(product.id, formData);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <GlassCard className="w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Edit Product</h3>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div 
                className="relative aspect-square rounded-lg overflow-hidden bg-white/5 border-2 border-white/10 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <img
                  src={imagePreview}
                  alt={formData.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                  <Upload size={24} className="text-white" />
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />
              <p className="text-xs text-white/60 mt-2 text-center">
                Click to upload (JPG, PNG, WebP • Max 5MB)
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  maxLength={100}
                  className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-2 text-white"
                  required
                />
                <p className="text-xs text-white/60 mt-1">
                  {formData.title.length}/100 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  maxLength={500}
                  rows={4}
                  className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-2 text-white resize-none"
                  required
                />
                <p className="text-xs text-white/60 mt-1">
                  {formData.description.length}/500 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Price (€)
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={e => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                  min="0.01"
                  max="99999.99"
                  step="0.01"
                  className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-2 text-white"
                  required
                />
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
              Save Changes
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};