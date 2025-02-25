import React from 'react';
import { Users, ShoppingCart, Star } from 'lucide-react';
import { useSharedMetrics } from '../hooks/useSharedMetrics';
import { AnimatedMetric } from './Admin/Analytics/AnimatedMetric';

export const Stats = () => {
  const { metrics } = useSharedMetrics();

  return (
    <div className="grid grid-cols-3 gap-4 sm:gap-6">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/5">
          <ShoppingCart size={24} className="text-white" />
        </div>
        <div className="text-3xl font-bold text-white">
          <AnimatedMetric value={metrics.sales} />
        </div>
        <div className="text-gray-400 font-medium">Sales</div>
      </div>
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/5">
          <Users size={24} className="text-white" />
        </div>
        <div className="text-3xl font-bold text-white">
          <AnimatedMetric value={metrics.customers} />
        </div>
        <div className="text-gray-400 font-medium">Customers</div>
      </div>
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/5">
          <Star size={24} className="text-white" />
        </div>
        <div className="text-3xl font-bold text-white">
          <AnimatedMetric value={4.9} formatter={(v) => v.toFixed(1)} />
        </div>
        <div className="text-gray-400 font-medium">Trusted ★</div>
      </div>
    </div>
  );
};