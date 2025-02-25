import { productStore } from '../productStore';
import { newsStore } from '../newsStore';
import { discountStore } from '../discountStore';
import { eventBus } from './eventBus';
import { SYNC_ERRORS } from '../../utils/errorHandler';
import type { SyncData, SyncResult, SyncEvent } from './types';

const SYNC_TIMEOUT = 30000; // 30 seconds timeout

class SyncManager {
  private static instance: SyncManager;
  private syncInProgress = false;
  private syncQueue: Array<() => Promise<void>> = [];
  private syncTimeout: NodeJS.Timeout | null = null;
  private syncStatus: Record<string, boolean> = {
    products: false,
    news: false,
    discounts: false
  };

  private constructor() {}

  private startSyncTimeout(): Promise<never> {
    return new Promise((_, reject) => {
      this.syncTimeout = setTimeout(() => {
        this.resetSync();
        reject(SYNC_ERRORS.TIMEOUT);
      }, SYNC_TIMEOUT);
    });
  }

  private clearSyncTimeout() {
    if (this.syncTimeout) {
      clearTimeout(this.syncTimeout);
      this.syncTimeout = null;
    }
  }

  private resetSync() {
    this.syncInProgress = false;
    this.clearSyncTimeout();
    this.resetSyncStatus();
  }

  static getInstance(): SyncManager {
    if (!SyncManager.instance) {
      SyncManager.instance = new SyncManager();
    }
    return SyncManager.instance;
  }

  private async processSyncQueue(): Promise<void> {
    if (this.syncQueue.length === 0) return;
    
    const nextSync = this.syncQueue.shift();
    if (nextSync) {
      try {
        await nextSync();
      } catch (error) {
        throw SYNC_ERRORS.FAILED;
      } finally {
        await this.processSyncQueue();
      }
    }
  }

  async syncAll(data: SyncData): Promise<SyncResult> {
    if (this.syncInProgress) {
      throw SYNC_ERRORS.IN_PROGRESS;
    }

    return this.performSync(data);
  }

  private async performSync(data: SyncData): Promise<SyncResult> {
    try {
      this.syncInProgress = true;
      const timeoutPromise = this.startSyncTimeout();
      
      const syncOperations = [
        data.products && this.syncProducts(data.products),
        data.news && this.syncNews(data.news),
        data.discounts && this.syncDiscounts(data.discounts)
      ].filter(Boolean);

      await Promise.race([
        Promise.all(syncOperations),
        timeoutPromise
      ]);

      return { success: true };
    } catch (error) {
      const syncError = error instanceof AppError ? error : SYNC_ERRORS.FAILED;
      return { 
        success: false, 
        error: syncError.message,
        code: syncError.code
      };
    } finally {
      this.resetSync();
      // Process any queued sync operations
      this.processSyncQueue();
    }
  }

  private resetSyncStatus(): void {
    Object.keys(this.syncStatus).forEach(key => {
      this.syncStatus[key] = false;
    });
  }

  private async syncProducts(products?: any[]): Promise<void> {
    if (!products) return;
    if (this.syncStatus.products) return;
    
    try {
      this.syncStatus.products = true;
      eventBus.emit({ type: 'products', status: 'started' });
      await productStore.updateProducts(products);
      eventBus.emit({ type: 'products', status: 'completed' });
    } catch (error) {
      eventBus.emit({ 
        type: 'products', 
        status: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    } finally {
      this.syncStatus.products = false;
    }
  }

  private async syncNews(news?: any[]): Promise<void> {
    if (!news) return;
    if (this.syncStatus.news) return;

    try {
      this.syncStatus.news = true;
      eventBus.emit({ type: 'news', status: 'started' });
      await newsStore.updateNews(news);
      eventBus.emit({ type: 'news', status: 'completed' });
    } catch (error) {
      eventBus.emit({ 
        type: 'news', 
        status: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    } finally {
      this.syncStatus.news = false;
    }
  }

  private async syncDiscounts(discounts?: any[]): Promise<void> {
    if (!discounts) return;
    if (this.syncStatus.discounts) return;

    try {
      this.syncStatus.discounts = true;
      eventBus.emit({ type: 'discounts', status: 'started' });
      await discountStore.updateDiscounts(discounts);
      eventBus.emit({ type: 'discounts', status: 'completed' });
    } catch (error) {
      eventBus.emit({ 
        type: 'discounts', 
        status: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    } finally {
      this.syncStatus.discounts = false;
    }
  }
}

export const syncManager = SyncManager.getInstance();