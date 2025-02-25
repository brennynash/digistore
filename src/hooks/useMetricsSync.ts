import { useEffect } from 'react';
import { useMetrics } from '../context/MetricsContext';
import { useAnalytics } from '../context/AnalyticsContext';

export const useMetricsSync = () => {
  const { data: analyticsData } = useAnalytics();
  const { updateMetrics } = useMetrics();

  useEffect(() => {
    const syncMetrics = () => {
      const { sales, users } = analyticsData;
      
      updateMetrics({
        sales: {
          current: sales.daily,
          previous: sales.previousDaily,
          timestamp: Date.now()
        },
        activeUsers: {
          current: users.activeUsers,
          previous: users.previousActiveUsers,
          timestamp: Date.now()
        },
        customers: {
          current: users.newSignups,
          previous: users.previousNewSignups,
          timestamp: Date.now()
        }
      });
    };

    // Initial sync
    syncMetrics();

    // Set up interval for periodic sync
    const interval = setInterval(syncMetrics, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, [analyticsData, updateMetrics]);
};