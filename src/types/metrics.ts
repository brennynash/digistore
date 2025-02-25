export interface Metric {
  current: number;
  previous: number;
  timestamp: number;
}

export interface DashboardMetrics {
  sales: Metric;
  activeUsers: Metric;
  customers: Metric;
}

export interface SystemEvent {
  id: string;
  type: 'info' | 'warning' | 'error';
  message: string;
  timestamp: number;
}