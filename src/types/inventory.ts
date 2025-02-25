export interface InventoryStatus {
  quantity: number;
  lowStockThreshold: number;
  status: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
  lastUpdated: number;
}

export interface InventoryUpdate {
  productId: string;
  quantity: number;
}

export interface StockAlert {
  id: string;
  productId: string;
  type: 'LOW_STOCK' | 'OUT_OF_STOCK';
  quantity: number;
  timestamp: number;
  acknowledged: boolean;
}