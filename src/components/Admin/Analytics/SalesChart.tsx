import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { GlassCard } from '../../ui/GlassCard';
import { DateRangePicker } from './DateRangePicker';
import { useAnalytics } from '../../../context/AnalyticsContext';
import { formatCurrency } from '../../../utils/formatters';

export const SalesChart = () => {
  const [dateRange, setDateRange] = useState<'day' | 'week' | 'month'>('week');
  const { data } = useAnalytics();

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-white">Sales Trend</h3>
        <div className="flex items-center gap-2">
          <Calendar size={20} className="text-white/60" />
          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
            options={[
              { value: 'day', label: 'Daily' },
              { value: 'week', label: 'Weekly' },
              { value: 'month', label: 'Monthly' }
            ]}
          />
        </div>
      </div>

      <div className="h-[300px] flex items-center justify-center">
        <div className="text-white/60">
          Chart visualization would go here
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-sm text-white/60">Total Sales</div>
          <div className="text-lg font-medium text-white">
            {formatCurrency(data.sales.monthly)}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-white/60">Average Order</div>
          <div className="text-lg font-medium text-white">
            {formatCurrency(data.sales.monthly / data.users.activeUsers)}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-white/60">Growth</div>
          <div className="text-lg font-medium text-green-400">
            +{((data.sales.monthly - data.sales.previousMonthly) / data.sales.previousMonthly * 100).toFixed(1)}%
          </div>
        </div>
      </div>
    </GlassCard>
  );
}