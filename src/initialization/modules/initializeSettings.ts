import { DEFAULT_TITLE_SETTINGS } from '../../constants/titleSettings';
import { DEFAULT_NEWS_SETTINGS } from '../../constants/newsSettings';
import { setLocalStorage } from '../../utils/storage';
import { InitializationResult } from '../types';
import { initLogger } from '../utils/logger';

export const initializeSettings = (): InitializationResult => {
  try {
    // Initialize with default settings
    setLocalStorage('titleSettings', DEFAULT_TITLE_SETTINGS);
    setLocalStorage('newsSettings', DEFAULT_NEWS_SETTINGS);
    
    initLogger.info('Settings initialized successfully');
    return { success: true };
  } catch (error) {
    initLogger.error('Failed to initialize settings', error);
    return { success: false, error: 'Failed to initialize settings' };
  }
};