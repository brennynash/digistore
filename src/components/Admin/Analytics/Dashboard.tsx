import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { useAnalytics } from '../../../context/AnalyticsContext';
import { KPISection } from './KPISection';
import { SalesChart } from './SalesChart';
import { TopProducts } from './TopProducts';

export const Dashboard = () => {
  const { refreshData } = useAnalytics();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshData();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleReset = async () => {
    setIsRefreshing(true);
    await refreshData(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end gap-2">
        <button
          onClick={handleReset}
          className="glass-effect px-4 py-2 rounded-lg text-white hover:bg-white/10"
          disabled={isRefreshing}
        >
          Reset
        </button>
        <button
          onClick={handleRefresh}
          className="glass-effect px-4 py-2 rounded-lg text-white hover:bg-white/10 flex items-center gap-2"
          disabled={isRefreshing}
        >
          <RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>
      
      <KPISection />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <TopProducts />
      </div>
    </div>
  );
};