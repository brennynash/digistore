import { DEFAULT_TITLE_SETTINGS } from '../constants/titleSettings';
import { DEFAULT_NEWS_SETTINGS } from '../constants/newsSettings';
import { setLocalStorage } from '../utils/storage';

export const initializeSettings = () => {
  // Initialize with default settings
  setLocalStorage('titleSettings', DEFAULT_TITLE_SETTINGS);
  setLocalStorage('newsSettings', DEFAULT_NEWS_SETTINGS);
  
  // Log initialization
  console.info('Settings initialized with defaults');
};