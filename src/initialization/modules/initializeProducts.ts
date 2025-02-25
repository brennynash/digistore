import { products } from '../../data/products';
import { setLocalStorage } from '../../utils/storage';
import { InitializationResult } from '../types';
import { initLogger } from '../utils/logger';

export const initializeProducts = (): InitializationResult => {
  try {
    setLocalStorage('products', products);
    initLogger.info('Products initialized successfully');
    return { success: true };
  } catch (error) {
    initLogger.error('Failed to initialize products', error);
    return { success: false, error: 'Failed to initialize products' };
  }
};