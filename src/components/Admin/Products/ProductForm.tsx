import React, { useState, useRef } from 'react';
import { Save, Upload, X } from 'lucide-react';
import { Product } from '../../../types';
import { GlassCard } from '../../ui/GlassCard';
import { useProducts } from '../../../context/ProductContext';
import { useInventory } from '../../../hooks/useInventory';
import { InventoryField } from './InventoryField';

interface ProductFormProps {
  product?: Product | null;
  onClose: () => void;
}

export const ProductForm = ({ product, onClose }: ProductFormProps) => {
  const { addProduct, updateProduct } = useProducts();
  const { getStockStatus, updateStock } = useInventory();
  const stockStatus = product ? getStockStatus(product.id) : null;

  const [formData, setFormData] = useState({
    title: product?.title || '',
    description: product?.description || '',
    subtitle: product?.subtitle || '',
    price: product?.price || 0,
    image: product?.image || '',
    rating: product?.rating || 5.0,
    quantity: stockStatus?.quantity || 0,
    lowStockThreshold: stockStatus?.lowStockThreshold || 50
  });

  const [imagePreview, setImagePreview] = useState(product?.image || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { quantity, lowStockThreshold, ...productData } = formData;
    
    try {
      if (product) {
        // Update existing product
        updateProduct(product.id, {
          ...productData,
          inStock: quantity > 0
        });
        
        // Update inventory
        updateStock([{
          productId: product.id,
          quantity,
          lowStockThreshold
        }]);
      } else {
        // Add new product
        const newProduct = await addProduct({
          ...productData,
          inStock: quantity > 0
        });
        
        // Initialize inventory for new product
        if (newProduct) {
          updateStock([{
            productId: newProduct.id,
            quantity,
            lowStockThreshold
          }]);
        }
      }
      
      onClose();
    } catch (error) {
      console.error('Failed to save product:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <GlassCard className="w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">
            {product ? 'Edit Product' : 'Add Product'}
          </h3>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form fields remain the same */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Product Name
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-2 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Subtitle
              </label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={e => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-2 text-white"
                placeholder="Optional subtitle"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Price (€)
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
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-2 text-white"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Image URL
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={e => setFormData(prev => ({ ...prev, image: e.target.value }))}
              className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-2 text-white"
              required
            />
          </div>

          <InventoryField
            quantity={formData.quantity}
            threshold={formData.lowStockThreshold}
            onChange={quantity => setFormData(prev => ({ ...prev, quantity }))}
            onThresholdChange={threshold => setFormData(prev => ({ ...prev, lowStockThreshold: threshold }))}
          />

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
              {product ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};