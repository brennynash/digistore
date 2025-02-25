import { Product } from '../types';
import { getLocalStorage, setLocalStorage } from '../utils/storage';
import { initLogger } from '../initialization/utils/logger';

class ProductStore {
  private static instance: ProductStore;
  private products: Product[];
  private listeners: Set<(products: Product[]) => void>;

  private constructor() {
    this.products = [];
    this.listeners = new Set();
    this.loadProducts();
  }

  static getInstance(): ProductStore {
    if (!ProductStore.instance) {
      ProductStore.instance = new ProductStore();
    }
    return ProductStore.instance;
  }

  private loadProducts(): void {
    try {
      const savedProducts = getLocalStorage('products');
      if (savedProducts) {
        this.products = savedProducts;
      }
    } catch (error) {
      initLogger.error('Failed to load products', error);
    }
  }

  private saveProducts(): void {
    try {
      setLocalStorage('products', this.products);
      this.notifyListeners();
    } catch (error) {
      initLogger.error('Failed to save products', error);
    }
  }

  getProducts(): Product[] {
    return [...this.products];
  }

  addProduct(product: Omit<Product, 'id'>): Product {
    const newProduct: Product = {
      ...product,
      id: crypto.randomUUID()
    };
    this.products = [...this.products, newProduct];
    this.saveProducts();
    return newProduct;
  }

  updateProduct(productId: string, updates: Partial<Product>): void {
    const index = this.products.findIndex(p => p.id === productId);
    if (index === -1) {
      initLogger.error(`Product not found: ${productId}`);
      return;
    }

    this.products = this.products.map(product =>
      product.id === productId
        ? { ...product, ...updates }
        : product
    );
    
    this.saveProducts();
  }

  deleteProduct(productId: string): void {
    this.products = this.products.filter(product => product.id !== productId);
    this.saveProducts();
  }

  updateProducts(products: Product[]): void {
    this.products = [...products];
    this.saveProducts();
  }

  subscribe(listener: (products: Product[]) => void): () => void {
    this.listeners.add(listener);
    // Initial call with current state
    listener(this.getProducts());
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    const products = this.getProducts();
    this.listeners.forEach(listener => listener(products));
  }

  resetToDefaults(defaultProducts: Product[]): void {
    this.products = [...defaultProducts];
    this.saveProducts();
    initLogger.info('Products reset to defaults');
  }
}

export const productStore = ProductStore.getInstance();