import { clearLocalStorage } from '../../utils/storage';
import { InitializationResult } from '../types';
import { initLogger } from '../utils/logger';

export const clearExistingData = (): InitializationResult => {
  try {
    clearLocalStorage();
    initLogger.info('Existing data cleared successfully');
    return { success: true };
  } catch (error) {
    initLogger.error('Failed to clear existing data', error);
    return { success: false, error: 'Failed to clear existing data' };
  }
};