import { setLocalStorage } from '../../utils/storage';
import { InitializationResult } from '../types';
import { initLogger } from '../utils/logger';
import { WholesaleDiscount } from '../../types/discount';
import { DEFAULT_DISCOUNT_TIERS } from '../../constants/discountTiers';

const DEFAULT_DISCOUNTS: WholesaleDiscount[] = [];

export const initializeDiscounts = (): InitializationResult => {
  try {
    // Initialize with empty discounts array
    setLocalStorage('wholesaleDiscounts', DEFAULT_DISCOUNTS);
    initLogger.info('Wholesale discounts initialized successfully');
    return { success: true };
  } catch (error) {
    initLogger.error('Failed to initialize discounts', error);
    return { success: false, error: 'Failed to initialize discounts' };
  }
};