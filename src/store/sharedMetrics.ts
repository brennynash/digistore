import { getLocalStorage, setLocalStorage } from '../utils/storage';

interface SharedMetrics {
  sales: number;
  customers: number;
  lastUpdate: number;
}

class SharedMetricsStore {
  private static instance: SharedMetricsStore;
  private metrics: SharedMetrics;
  private listeners: Set<(metrics: SharedMetrics) => void>;

  private constructor() {
    this.metrics = getLocalStorage('sharedMetrics') || {
      sales: 0,
      customers: 0,
      lastUpdate: Date.now()
    };
    this.listeners = new Set();
  }

  static getInstance(): SharedMetricsStore {
    if (!SharedMetricsStore.instance) {
      SharedMetricsStore.instance = new SharedMetricsStore();
    }
    return SharedMetricsStore.instance;
  }

  getMetrics(): SharedMetrics {
    return { ...this.metrics };
  }

  updateMetrics(updates: Partial<SharedMetrics>) {
    this.metrics = {
      ...this.metrics,
      ...updates,
      lastUpdate: Date.now()
    };
    setLocalStorage('sharedMetrics', this.metrics);
    this.notifyListeners();
  }

  subscribe(listener: (metrics: SharedMetrics) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.getMetrics()));
  }
}

export const sharedMetricsStore = SharedMetricsStore.getInstance();