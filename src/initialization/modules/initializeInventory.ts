import { InventoryStatus } from '../../types/inventory';
import { products } from '../../data/products';
import { setLocalStorage } from '../../utils/storage';
import { InitializationResult } from '../types';
import { initLogger } from '../utils/logger';

const DEFAULT_LOW_STOCK_THRESHOLD = 50;

export const initializeInventory = (): InitializationResult => {
  try {
    const initialInventory: Record<string, InventoryStatus> = {};

    // Initialize inventory for each product
    products.forEach(product => {
      initialInventory[product.id] = {
        quantity: product.inStock ? 100 : 0,
        lowStockThreshold: DEFAULT_LOW_STOCK_THRESHOLD,
        status: product.inStock ? 'IN_STOCK' : 'OUT_OF_STOCK',
        lastUpdated: Date.now()
      };
    });

    setLocalStorage('inventory', initialInventory);
    setLocalStorage('stockAlerts', []);
    
    initLogger.info('Inventory system initialized successfully');
    return { success: true };
  } catch (error) {
    initLogger.error('Failed to initialize inventory system', error);
    return { success: false, error: 'Failed to initialize inventory system' };
  }
};