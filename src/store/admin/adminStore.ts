import { getLocalStorage } from '../../utils/storage';
import { syncManager } from '../sync/syncManager';
import { authStore } from './auth/authStore';
import type { AdminChanges } from './types';

class AdminStore {
  private static instance: AdminStore;

  private constructor() {}

  static getInstance(): AdminStore {
    if (!AdminStore.instance) {
      AdminStore.instance = new AdminStore();
    }
    return AdminStore.instance;
  }

  isAuthenticated(): boolean {
    return authStore.getState().isAuthenticated;
  }

  async applyChanges(changes: AdminChanges): Promise<void> {
    if (!this.isAuthenticated()) return;

    const result = await syncManager.syncAll(changes);
    if (!result.success) {
      console.error('Failed to apply admin changes:', result.error);
    }
  }
}

export const adminStore = AdminStore.getInstance();