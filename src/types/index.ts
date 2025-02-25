// Export all types from a central location
export type { Product, CartItem, CartContextType, MarqueeProps } from './base';
export type { NewsItem, NewsSettings, NewsFeedProps } from './news';
export type { WholesaleDiscount, DiscountTier, DiscountCalculation } from './discount';
export type { DashboardMetrics, SystemEvent, Metric } from './metrics';
export type { TitleSettings } from './title';
export type { CustomizationOption, ProductCustomization } from './customization';
export type { InventoryStatus, InventoryUpdate, StockAlert } from './inventory';

export interface Product {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  inStock: boolean;
}