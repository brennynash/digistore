export interface SalesMetric {
  daily: number;
  weekly: number;
  monthly: number;
  previousDaily: number;
  previousWeekly: number;
  previousMonthly: number;
}

export interface UserMetric {
  activeUsers: number;
  newSignups: number;
  engagementRate: number;
  previousActiveUsers: number;
  previousNewSignups: number;
  previousEngagementRate: number;
}

export interface SystemLog {
  id: string;
  timestamp: number;
  type: 'info' | 'warning' | 'error';
  message: string;
  details?: string;
}

export interface AnalyticsData {
  sales: SalesMetric;
  users: UserMetric;
  logs: SystemLog[];
}