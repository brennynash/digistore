export interface SyncData {
  products?: any[];
  news?: any[];
  discounts?: any[];
}

export interface SyncResult {
  success: boolean;
  error?: string;
  code?: string;
}

export interface SyncEvent {
  type: 'products' | 'news' | 'discounts';
  status: 'started' | 'completed' | 'failed';
  error?: string;
}