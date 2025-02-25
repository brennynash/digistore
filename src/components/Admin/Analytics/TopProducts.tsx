import React from 'react';
import { Package } from 'lucide-react';
import { GlassCard } from '../../ui/GlassCard';
import { useProducts } from '../../../context/ProductContext';
import { useAnalytics } from '../../../context/AnalyticsContext';
import { formatCurrency } from '../../../utils/formatters';

export const TopProducts = () => {
  const { products } = useProducts();
  const { data } = useAnalytics();
  
  // Generate mock sales data based on analytics state
  // This ensures it resets when analytics are reset
  const topProducts = products
    .map(product => ({
      ...product,
      sales: Math.floor((data.sales.daily / products.length) * (Math.random() * 2)),
      growth: Math.floor(Math.random() * 100)
    }))
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);

  return (
    <GlassCard className="p-6">
      <h3 className="text-lg font-medium text-white mb-6">Top Products</h3>
      
      <div className="space-y-4">
        {topProducts.map((product) => (
          <div
            key={product.id}
            className="flex items-center gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-white font-medium truncate">{product.title}</h4>
              <p className="text-white/60 text-sm">
                {formatCurrency(product.price)}
              </p>
            </div>
            <div className="text-right">
              <div className="text-white font-medium">
                {product.sales} sales
              </div>
              <div className="text-green-400 text-sm">
                +{product.growth}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};