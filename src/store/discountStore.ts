import { WholesaleDiscount } from '../types/discount';
import { getLocalStorage, setLocalStorage } from '../utils/storage';
import { initLogger } from '../initialization/utils/logger';

class DiscountStore {
  private static instance: DiscountStore;
  private discounts: WholesaleDiscount[];
  private listeners: Set<(discounts: WholesaleDiscount[]) => void>;

  private constructor() {
    this.discounts = [];
    this.listeners = new Set();
    this.loadDiscounts();
  }

  static getInstance(): DiscountStore {
    if (!DiscountStore.instance) {
      DiscountStore.instance = new DiscountStore();
    }
    return DiscountStore.instance;
  }

  private loadDiscounts(): void {
    try {
      const saved = getLocalStorage('wholesaleDiscounts');
      if (saved) {
        this.discounts = saved;
      }
    } catch (error) {
      initLogger.error('Failed to load discounts', error);
    }
  }

  private saveDiscounts(): void {
    try {
      setLocalStorage('wholesaleDiscounts', this.discounts);
      this.notifyListeners();
    } catch (error) {
      initLogger.error('Failed to save discounts', error);
    }
  }

  updateDiscounts(discounts: WholesaleDiscount[]): void {
    this.discounts = [...discounts];
    this.saveDiscounts();
  }

  getDiscounts(): WholesaleDiscount[] {
    return [...this.discounts];
  }

  addDiscount(productId: string, tiers: WholesaleDiscount['tiers']): void {
    // Remove any existing discount for this product
    this.discounts = this.discounts.filter(d => d.productId !== productId);
    
    const discount: WholesaleDiscount = {
      id: crypto.randomUUID(),
      productId,
      tiers,
      active: true
    };
    
    this.discounts.push(discount);
    this.saveDiscounts();
  }

  deleteDiscount(discountId: string): void {
    this.discounts = this.discounts.filter(d => d.id !== discountId);
    this.saveDiscounts();
  }

  subscribe(listener: (discounts: WholesaleDiscount[]) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.getDiscounts()));
  }

  resetDiscounts(): void {
    this.discounts = [];
    this.saveDiscounts();
  }
}

export const discountStore = DiscountStore.getInstance();