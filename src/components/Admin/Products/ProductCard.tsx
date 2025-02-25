import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Product } from '../../../types';
import { GlassCard } from '../../ui/GlassCard';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => (
  <GlassCard className="p-4">
    <div className="flex gap-4">
      <div className="w-20 h-20 rounded-lg overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-white">{product.title}</h3>
            {product.subtitle && (
              <p className="text-sm text-white/40 mb-1">{product.subtitle}</p>
            )}
            <p className="text-sm text-white/60 mb-2">{product.description}</p>
            <p className="text-white font-medium">€{product.price.toFixed(2)}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(product)}
              className="p-2 rounded-lg hover:bg-white/5 text-white/60 hover:text-white"
              aria-label="Edit product"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => onDelete(product)}
              className="p-2 rounded-lg hover:bg-white/5 text-red-400 hover:text-red-300"
              aria-label="Delete product"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
        <div className="mt-2">
          <span className={`text-xs px-2 py-1 rounded-full ${
            product.inStock ? 'bg-green-400/10 text-green-400' : 'bg-red-400/10 text-red-400'
          }`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>
    </div>
  </GlassCard>
);