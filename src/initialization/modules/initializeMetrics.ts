import { setLocalStorage } from '../../utils/storage';
import { InitializationResult, InitialMetrics } from '../types';
import { initLogger } from '../utils/logger';

const DEFAULT_METRICS: InitialMetrics = {
  sales: 0,
  customers: 0,
  lastUpdate: Date.now()
};

export const initializeMetrics = (): InitializationResult => {
  try {
    setLocalStorage('sharedMetrics', DEFAULT_METRICS);
    initLogger.info('Metrics initialized successfully');
    return { success: true };
  } catch (error) {
    initLogger.error('Failed to initialize metrics', error);
    return { success: false, error: 'Failed to initialize metrics' };
  }
};