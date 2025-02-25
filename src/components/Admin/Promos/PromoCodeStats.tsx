import React from 'react';
import { PromoStats } from '../../../types/promo';
import { GlassCard } from '../../ui/GlassCard';
import { AnimatedMetric } from '../Analytics/AnimatedMetric';

interface PromoCodeStatsProps {
  stats: PromoStats;
}

export const PromoCodeStats = ({ stats }: PromoCodeStatsProps) => {
  return (
    <GlassCard className="p-6">
      <h3 className="text-lg font-medium text-white mb-6">Performance Overview</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">
            <AnimatedMetric value={stats.totalUses} />
          </div>
          <div className="text-sm text-white/60 mt-1">Total Uses</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-white">
            <AnimatedMetric value={stats.uniqueCustomers} />
          </div>
          <div className="text-sm text-white/60 mt-1">Unique Customers</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-white">
            €<AnimatedMetric value={stats.totalSavings} />
          </div>
          <div className="text-sm text-white/60 mt-1">Total Savings</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-white">
            <AnimatedMetric 
              value={stats.conversionRate} 
              formatter={(v) => `${v.toFixed(1)}%`}
            />
          </div>
          <div className="text-sm text-white/60 mt-1">Conversion Rate</div>
        </div>
      </div>
    </GlassCard>
  );
};