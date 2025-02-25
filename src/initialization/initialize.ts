import { InitializationConfig, InitializationResult } from './types';
import { clearExistingData } from './modules/clearData';
import { initializeProducts } from './modules/initializeProducts';
import { initializeSettings } from './modules/initializeSettings';
import { initializeMetrics } from './modules/initializeMetrics';
import { initializeDiscounts } from './modules/initializeDiscounts';
import { initializeInventory } from './modules/initializeInventory';
import { validateInitialization } from './utils/validation';
import { initLogger } from './utils/logger';

const DEFAULT_CONFIG: InitializationConfig = {
  clearExistingData: true,
  logInitialization: true
};

export const initializeApplication = async (
  config: InitializationConfig = DEFAULT_CONFIG
): Promise<boolean> => {
  const results: InitializationResult[] = [];

  try {
    // Clear existing data if configured
    if (config.clearExistingData) {
      results.push(await clearExistingData());
    }

    // Initialize all modules
    results.push(
      await initializeProducts(),
      await initializeSettings(),
      await initializeMetrics(),
      await initializeDiscounts(),
      await initializeInventory() // Added inventory initialization
    );

    const success = validateInitialization(results);

    if (success) {
      initLogger.info('Application initialized successfully');
    } else {
      initLogger.error('Application initialization failed');
    }

    return success;
  } catch (error) {
    initLogger.error('Critical initialization error', error);
    return false;
  }
};