import { useState, useEffect } from 'react';
import { sharedMetricsStore } from '../store/sharedMetrics';

export const useSharedMetrics = () => {
  const [metrics, setMetrics] = useState(sharedMetricsStore.getMetrics());

  useEffect(() => {
    return sharedMetricsStore.subscribe(newMetrics => {
      setMetrics(newMetrics);
    });
  }, []);

  const updateMetrics = (updates: { sales?: number; customers?: number }) => {
    sharedMetricsStore.updateMetrics(updates);
  };

  return {
    metrics,
    updateMetrics
  };
};