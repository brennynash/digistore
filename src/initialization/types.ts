export interface InitializationResult {
  success: boolean;
  error?: string;
}

export interface InitialMetrics {
  sales: number;
  customers: number;
  lastUpdate: number;
}

export interface InitializationConfig {
  clearExistingData: boolean;
  logInitialization: boolean;
}