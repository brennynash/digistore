import React from 'react';
import { DollarSign, ShoppingBag, TrendingUp, Users } from 'lucide-react';
import { useAnalytics } from '../../../context/AnalyticsContext';
import { formatCurrency } from '../../../utils/formatters';
import { GlassCard } from '../../ui/GlassCard';

export const HeaderMetrics = () => {
  const { data } = useAnalytics();
  const { sales, users } = data;

  const metrics = [
    {
      icon: DollarSign,
      value: formatCurrency(sales.daily),
      label: "Today's Revenue"
    },
    {
      icon: ShoppingBag,
      value: sales.daily,
      label: "Today's Orders"
    },
    {
      icon: Users,
      value: users.activeUsers,
      label: 'Active Users'
    },
    {
      icon: TrendingUp,
      value: `${users.engagementRate.toFixed(1)}%`,
      label: 'Conversion Rate'
    }
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mt-4 mb-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <GlassCard key={index} className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/5">
              <Icon size={20} className="text-white/60" />
            </div>
            <div>
              <div className="text-lg font-medium text-white">{metric.value}</div>
              <div className="text-sm text-white/60">{metric.label}</div>
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
};