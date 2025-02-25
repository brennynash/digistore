import React, { useState } from 'react';
import { Plus, Search, RefreshCw } from 'lucide-react';
import { useProducts } from '../../../context/ProductContext';
import { GlassCard } from '../../ui/GlassCard';
import { ProductForm } from './ProductForm';
import { ConfirmDialog } from '../../ui/ConfirmDialog';
import { Product } from '../../../types';
import { ProductCard } from './ProductCard';
import { StockAlerts } from './StockAlerts';

export const ProductList = () => {
  const { products, deleteProduct, resetToDefaults } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReset = () => {
    resetToDefaults();
    setShowResetConfirm(false);
  };

  return (
    <div className="space-y-6">
      <StockAlerts />

      <div className="flex justify-between items-center">
        <div className="relative flex-1 max-w-md">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border-2 border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/40"
          />
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setShowResetConfirm(true)}
            className="glass-effect px-4 py-2 rounded-lg text-white flex items-center gap-2 hover:bg-white/10"
          >
            <RefreshCw size={20} />
            Reset Defaults
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            className="glass-effect px-4 py-2 rounded-lg text-white flex items-center gap-2 hover:bg-white/10"
          >
            <Plus size={20} />
            Add Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={() => setEditingProduct(product)}
            onDelete={() => setDeletingProduct(product)}
          />
        ))}
      </div>

      {(showAddForm || editingProduct) && (
        <ProductForm
          product={editingProduct}
          onClose={() => {
            setShowAddForm(false);
            setEditingProduct(null);
          }}
        />
      )}

      {deletingProduct && (
        <ConfirmDialog
          title="Delete Product"
          message={`Are you sure you want to delete "${deletingProduct.title}"? This action cannot be undone.`}
          confirmLabel="Delete"
          confirmVariant="danger"
          onConfirm={() => {
            deleteProduct(deletingProduct.id);
            setDeletingProduct(null);
          }}
          onCancel={() => setDeletingProduct(null)}
        />
      )}

      {showResetConfirm && (
        <ConfirmDialog
          title="Reset to Defaults"
          message="Are you sure you want to reset all products to their default state? This action cannot be undone."
          confirmLabel="Reset"
          confirmVariant="danger"
          onConfirm={handleReset}
          onCancel={() => setShowResetConfirm(false)}
        />
      )}
    </div>
  );
};