import { PromoCode, PromoMetrics } from '../types/promo';
import { getLocalStorage, setLocalStorage } from '../utils/storage';
import { calculatePromoDiscount } from '../utils/promoCalculator';

class PromoStore {
  private static instance: PromoStore;
  private promoCodes: PromoCode[];
  private listeners: Set<(codes: PromoCode[]) => void>;

  private constructor() {
    this.promoCodes = getLocalStorage('promoCodes') || [];
    this.listeners = new Set();
  }

  static getInstance(): PromoStore {
    if (!PromoStore.instance) {
      PromoStore.instance = new PromoStore();
    }
    return PromoStore.instance;
  }

  private save(): void {
    setLocalStorage('promoCodes', this.promoCodes);
    this.notifyListeners();
  }

  getPromoCodes(): PromoCode[] {
    return [...this.promoCodes];
  }

  getPromoCode(code: string): PromoCode | null {
    return this.promoCodes.find(p => p.code === code && p.status === 'active') || null;
  }

  getMetrics(promoId: string): PromoMetrics {
    const promo = this.promoCodes.find(p => p.id === promoId);
    if (!promo) {
      return {
        usageCount: 0,
        totalSavings: 0,
        averageDiscount: 0,
        lastUsed: null
      };
    }

    return {
      usageCount: promo.usageCount,
      totalSavings: promo.totalSavings,
      averageDiscount: promo.usageCount ? promo.totalSavings / promo.usageCount : 0,
      lastUsed: promo.usageCount ? Date.now() : null
    };
  }

  addPromoCode(code: Omit<PromoCode, 'id' | 'createdAt' | 'usageCount' | 'totalSavings'>): void {
    const newCode: PromoCode = {
      ...code,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      usageCount: 0,
      totalSavings: 0
    };
    this.promoCodes.push(newCode);
    this.save();
  }

  updatePromoCode(id: string, updates: Partial<PromoCode>): void {
    this.promoCodes = this.promoCodes.map(code => 
      code.id === id ? { ...code, ...updates } : code
    );
    this.save();
  }

  deletePromoCode(id: string): void {
    this.promoCodes = this.promoCodes.filter(code => code.id !== id);
    this.save();
  }

  applyPromoCode(code: string, price: number): PromoCalculation {
    const promoCode = this.getPromoCode(code);
    const calculation = calculatePromoDiscount(price, promoCode);

    if (calculation.isValid && promoCode) {
      this.updatePromoCode(promoCode.id, {
        usageCount: promoCode.usageCount + 1,
        totalSavings: promoCode.totalSavings + calculation.discountAmount
      });
    }

    return calculation;
  }

  subscribe(listener: (codes: PromoCode[]) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.getPromoCodes()));
  }
}

export const promoStore = PromoStore.getInstance();