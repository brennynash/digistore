import React, { createContext, useContext, useState, useCallback } from 'react';
import { DashboardMetrics, SystemEvent } from '../types/metrics';
import { getLocalStorage, setLocalStorage } from '../utils/storage';

interface MetricsContextType {
  metrics: DashboardMetrics;
  events: SystemEvent[];
  resetMetrics: () => Promise<void>;
  refreshMetrics: () => Promise<void>;
  updateMetrics: (newMetrics: DashboardMetrics) => void;
  lastRefresh: number;
}

const MetricsContext = createContext<MetricsContextType | undefined>(undefined);

const generateInitialMetrics = (): DashboardMetrics => ({
  sales: {
    current: 0,
    previous: 0,
    timestamp: Date.now()
  },
  activeUsers: {
    current: 0,
    previous: 0,
    timestamp: Date.now()
  },
  customers: {
    current: 0,
    previous: 0,
    timestamp: Date.now()
  }
});

export const MetricsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [metrics, setMetrics] = useState<DashboardMetrics>(() => {
    const saved = getLocalStorage('dashboardMetrics');
    return saved || generateInitialMetrics();
  });
  
  const [events, setEvents] = useState<SystemEvent[]>([]);
  const [lastRefresh, setLastRefresh] = useState(Date.now());

  const addEvent = useCallback((type: SystemEvent['type'], message: string) => {
    const newEvent: SystemEvent = {
      id: crypto.randomUUID(),
      type,
      message,
      timestamp: Date.now()
    };
    setEvents(prev => [newEvent, ...prev].slice(0, 100));
  }, []);

  const updateMetrics = useCallback((newMetrics: DashboardMetrics) => {
    setMetrics(prev => {
      const updated = { ...newMetrics };
      
      // Calculate and log significant changes
      Object.entries(updated).forEach(([key, value]) => {
        const prevValue = prev[key as keyof DashboardMetrics];
        const change = ((value.current - prevValue.current) / prevValue.current) * 100;
        
        if (Math.abs(change) > 10) {
          addEvent(
            change > 0 ? 'info' : 'warning',
            `${key} ${change > 0 ? 'increased' : 'decreased'} by ${Math.abs(change).toFixed(1)}%`
          );
        }
      });

      setLocalStorage('dashboardMetrics', updated);
      return updated;
    });
  }, [addEvent]);

  const resetMetrics = useCallback(async () => {
    const resetData = {
      sales: { current: 0, previous: metrics.sales.current, timestamp: Date.now() },
      activeUsers: { current: 0, previous: metrics.activeUsers.current, timestamp: Date.now() },
      customers: { current: 0, previous: metrics.customers.current, timestamp: Date.now() }
    };
    
    setMetrics(resetData);
    setLastRefresh(Date.now());
    addEvent('info', 'Metrics have been reset');
    setLocalStorage('dashboardMetrics', resetData);
  }, [metrics, addEvent]);

  const refreshMetrics = useCallback(async () => {
    const currentMetrics = { ...metrics };
    
    // Store current values as previous before updating
    Object.keys(currentMetrics).forEach(key => {
      const metricKey = key as keyof DashboardMetrics;
      currentMetrics[metricKey].previous = currentMetrics[metricKey].current;
      currentMetrics[metricKey].current = Math.floor(Math.random() * 1000); // Simulated data
      currentMetrics[metricKey].timestamp = Date.now();
    });

    setMetrics(currentMetrics);
    setLastRefresh(Date.now());
    addEvent('info', 'Metrics have been refreshed');
    setLocalStorage('dashboardMetrics', currentMetrics);
  }, [metrics, addEvent]);

  return (
    <MetricsContext.Provider value={{
      metrics,
      events,
      resetMetrics,
      refreshMetrics,
      updateMetrics,
      lastRefresh
    }}>
      {children}
    </MetricsContext.Provider>
  );
};

export const useMetrics = () => {
  const context = useContext(MetricsContext);
  if (!context) {
    throw new Error('useMetrics must be used within a MetricsProvider');
  }
  return context;
};