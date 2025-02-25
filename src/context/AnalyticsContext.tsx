import React, { createContext, useContext, useState } from 'react';
import { AnalyticsData } from '../types/analytics';
import { getLocalStorage, setLocalStorage } from '../utils/storage';

interface AnalyticsContextType {
  data: AnalyticsData;
  refreshData: (reset?: boolean) => Promise<void>;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

const INITIAL_DATA: AnalyticsData = {
  sales: {
    daily: 0,
    weekly: 0,
    monthly: 0,
    previousDaily: 0,
    previousWeekly: 0,
    previousMonthly: 0
  },
  users: {
    activeUsers: 0,
    newSignups: 0,
    engagementRate: 0,
    previousActiveUsers: 0,
    previousNewSignups: 0,
    previousEngagementRate: 0
  },
  logs: []
};

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AnalyticsData>(() => {
    const saved = getLocalStorage('analyticsData');
    return saved || INITIAL_DATA;
  });

  const refreshData = async (reset = false) => {
    if (reset) {
      setData(INITIAL_DATA);
      setLocalStorage('analyticsData', INITIAL_DATA);
      return;
    }

    // Generate mock data for demo
    const mockData: AnalyticsData = {
      sales: {
        daily: Math.floor(Math.random() * 5000) + 1000,
        weekly: Math.floor(Math.random() * 25000) + 5000,
        monthly: Math.floor(Math.random() * 100000) + 20000,
        previousDaily: data.sales.daily,
        previousWeekly: data.sales.weekly,
        previousMonthly: data.sales.monthly
      },
      users: {
        activeUsers: Math.floor(Math.random() * 1000) + 200,
        newSignups: Math.floor(Math.random() * 100) + 20,
        engagementRate: Math.random() * 30 + 40,
        previousActiveUsers: data.users.activeUsers,
        previousNewSignups: data.users.newSignups,
        previousEngagementRate: data.users.engagementRate
      },
      logs: data.logs
    };

    setData(mockData);
    setLocalStorage('analyticsData', mockData);
  };

  return (
    <AnalyticsContext.Provider value={{ data, refreshData }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};