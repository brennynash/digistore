import React, { useState } from 'react';
import { Plus, Settings, Trash2 } from 'lucide-react';
import { useCustomization } from '../../../context/CustomizationContext';
import { useProducts } from '../../../context/ProductContext';
import { CustomizationForm } from './CustomizationForm';
import { CustomizationOption } from '../../../types/customization';
import { GlassCard } from '../../ui/GlassCard';
import { ConfirmDialog } from '../../ui/ConfirmDialog';

export const CustomizationManager = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [deletingOption, setDeletingOption] = useState<{productId: string, optionId: string} | null>(null);
  
  const { products } = useProducts();
  const { getProductCustomizations, removeCustomization } = useCustomization();

  const handleDeleteOption = () => {
    if (deletingOption) {
      removeCustomization(deletingOption.productId, deletingOption.optionId);
      setDeletingOption(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Settings size={24} />
          Product Customization
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => {
          const customizations = getProductCustomizations(product.id);
          const isSelected = selectedProduct === product.id;

          return (
            <GlassCard
              key={product.id}
              className={`p-4 ${isSelected ? 'border-white/30 ring-2 ring-white/20' : ''}`}
            >
              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-white mb-2">{product.title}</h3>
                  <div className="space-y-2">
                    {customizations.map(option => (
                      <div
                        key={option.id}
                        className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2"
                      >
                        <div>
                          <span className="text-white text-sm">{option.name}</span>
                          <span className="text-white/60 text-xs ml-2">
                            +€{option.price.toFixed(2)}
                          </span>
                        </div>
                        <button
                          onClick={() => setDeletingOption({ productId: product.id, optionId: option.id })}
                          className="p-1.5 rounded-lg hover:bg-white/10 text-red-400 hover:text-red-300"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      setSelectedProduct(product.id);
                      setShowForm(true);
                    }}
                    className="w-full mt-4 glass-effect py-2 rounded-lg text-white text-sm hover:bg-white/10 flex items-center justify-center gap-2"
                  >
                    <Plus size={16} />
                    Add Option
                  </button>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {showForm && selectedProduct && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md">
            <CustomizationForm
              productId={selectedProduct}
              onClose={() => {
                setShowForm(false);
                setSelectedProduct(null);
              }}
            />
          </div>
        </div>
      )}

      {deletingOption && (
        <ConfirmDialog
          title="Delete Customization Option"
          message="Are you sure you want to delete this customization option? This action cannot be undone."
          confirmLabel="Delete"
          confirmVariant="danger"
          onConfirm={handleDeleteOption}
          onCancel={() => setDeletingOption(null)}
        />
      )}
    </div>
  );
};