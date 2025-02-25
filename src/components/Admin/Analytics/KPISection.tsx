import React from 'react';
import { DollarSign, ShoppingBag, TrendingUp, Users } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { useAnalytics } from '../../../context/AnalyticsContext';
import { formatCurrency } from '../../../utils/formatters';

export const KPISection = () => {
  const { data } = useAnalytics();
  const { sales, users } = data;

  const kpis = [
    {
      title: 'Total Revenue',
      value: sales.monthly,
      previousValue: sales.previousMonthly,
      icon: DollarSign,
      formatter: formatCurrency
    },
    {
      title: 'Orders',
      value: sales.daily,
      previousValue: sales.previousDaily,
      icon: ShoppingBag
    },
    {
      title: 'Conversion Rate',
      value: users.engagementRate,
      previousValue: users.previousEngagementRate,
      icon: TrendingUp,
      formatter: (value: number) => `${value.toFixed(1)}%`
    },
    {
      title: 'Active Users',
      value: users.activeUsers,
      previousValue: users.previousActiveUsers,
      icon: Users
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, index) => (
        <MetricCard key={index} {...kpi} />
      ))}
    </div>
  );
}