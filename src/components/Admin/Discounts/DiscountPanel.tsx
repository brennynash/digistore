import React, { useState } from 'react';
import { Plus, Tag } from 'lucide-react';
import { useProducts } from '../../../context/ProductContext';
import { useDiscount } from '../../../context/DiscountContext';
import { WholesaleDiscountForm } from './WholesaleDiscountForm';
import { GlassCard } from '../../ui/GlassCard';
import { TitlePanel } from '../../ui/TitlePanel/TitlePanel';
import { DiscountTier } from '../../../types/discount';

export const DiscountPanel = () => {
  const { products } = useProducts();
  const { wholesaleDiscounts, addWholesaleDiscount, deleteWholesaleDiscount } = useDiscount();
  const [selectedProduct, setSelectedProduct] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (tiers: DiscountTier[]) => {
    if (selectedProduct) {
      addWholesaleDiscount(selectedProduct, tiers);
      setShowForm(false);
      setSelectedProduct('');
    }
  };

  return (
    <div className="space-y-6">
      <TitlePanel
        title="Wholesale Discount Management"
        subtitle="Configure tiered quantity discounts"
        align="left"
        size="small"
        variant="default"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <GlassCard className="p-6">
          <h3 className="text-lg font-medium text-white mb-4">Add Wholesale Discount</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Select Product
              </label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-2 text-white"
              >
                <option value="">Choose a product...</option>
                {products.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.title}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setShowForm(true)}
              disabled={!selectedProduct}
              className="w-full glass-effect text-white font-medium py-2 rounded-lg hover:bg-white/10 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Plus size={20} />
              Configure Tiers
            </button>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-lg font-medium text-white mb-4">Active Wholesale Discounts</h3>
          <div className="space-y-4">
            {wholesaleDiscounts.map(discount => {
              const product = products.find(p => p.id === discount.productId);
              return (
                <div key={discount.id} className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Tag size={20} className="text-white/60" />
                      <span className="text-white font-medium">{product?.title}</span>
                    </div>
                    <button
                      onClick={() => deleteWholesaleDiscount(discount.id)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {discount.tiers.map((tier, index) => (
                      <div key={index} className="bg-white/5 rounded p-2">
                        <div className="text-white/60">
                          {tier.minQuantity}-{tier.maxQuantity} units
                        </div>
                        <div className="text-white font-medium">
                          {tier.percentage}% off
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            {wholesaleDiscounts.length === 0 && (
              <div className="text-white/60 text-center py-4">
                No active wholesale discounts
              </div>
            )}
          </div>
        </GlassCard>
      </div>

      {showForm && (
        <WholesaleDiscountForm
          productId={selectedProduct}
          onSubmit={handleSubmit}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};