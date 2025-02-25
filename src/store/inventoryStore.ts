import { InventoryStatus, InventoryUpdate, StockAlert } from '../types/inventory';
import { getLocalStorage, setLocalStorage } from '../utils/storage';

class InventoryStore {
  private static instance: InventoryStore;
  private inventory: Record<string, InventoryStatus>;
  private alerts: StockAlert[];
  private listeners: Set<(inventory: Record<string, InventoryStatus>) => void>;
  private alertListeners: Set<(alerts: StockAlert[]) => void>;

  private constructor() {
    this.inventory = getLocalStorage('inventory') || {};
    this.alerts = getLocalStorage('stockAlerts') || [];
    this.listeners = new Set();
    this.alertListeners = new Set();
  }

  static getInstance(): InventoryStore {
    if (!InventoryStore.instance) {
      InventoryStore.instance = new InventoryStore();
    }
    return InventoryStore.instance;
  }

  getInventory(): Record<string, InventoryStatus> {
    return { ...this.inventory };
  }

  getProductStock(productId: string): InventoryStatus | null {
    return this.inventory[productId] || null;
  }

  updateStock(updates: InventoryUpdate[]): void {
    updates.forEach(({ productId, quantity }) => {
      const current = this.inventory[productId];
      if (!current) return;

      const status = this.calculateStatus(quantity, current.lowStockThreshold);
      this.inventory[productId] = {
        ...current,
        quantity,
        status,
        lastUpdated: Date.now()
      };

      this.checkAndCreateAlert(productId, quantity, status);
    });

    this.save();
  }

  private calculateStatus(quantity: number, threshold: number): InventoryStatus['status'] {
    if (quantity <= 0) return 'OUT_OF_STOCK';
    if (quantity <= threshold) return 'LOW_STOCK';
    return 'IN_STOCK';
  }

  private checkAndCreateAlert(productId: string, quantity: number, status: InventoryStatus['status']): void {
    if (status === 'LOW_STOCK' || status === 'OUT_OF_STOCK') {
      const alert: StockAlert = {
        id: crypto.randomUUID(),
        productId,
        type: status === 'OUT_OF_STOCK' ? 'OUT_OF_STOCK' : 'LOW_STOCK',
        quantity,
        timestamp: Date.now(),
        acknowledged: false
      };

      this.alerts = [alert, ...this.alerts];
      this.saveAlerts();
    }
  }

  getAlerts(acknowledged = false): StockAlert[] {
    return this.alerts.filter(alert => alert.acknowledged === acknowledged);
  }

  acknowledgeAlert(alertId: string): void {
    this.alerts = this.alerts.map(alert =>
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    );
    this.saveAlerts();
  }

  private save(): void {
    setLocalStorage('inventory', this.inventory);
    this.notifyListeners();
  }

  private saveAlerts(): void {
    setLocalStorage('stockAlerts', this.alerts);
    this.notifyAlertListeners();
  }

  subscribe(listener: (inventory: Record<string, InventoryStatus>) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  subscribeToAlerts(listener: (alerts: StockAlert[]) => void): () => void {
    this.alertListeners.add(listener);
    return () => this.alertListeners.delete(listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.getInventory()));
  }

  private notifyAlertListeners(): void {
    this.alertListeners.forEach(listener => listener(this.alerts));
  }
}

export const inventoryStore = InventoryStore.getInstance();