import { useState, useEffect } from 'react';
import { InventoryStatus, StockAlert, InventoryUpdate } from '../types/inventory';
import { inventoryStore } from '../store/inventoryStore';

export const useInventory = (productId?: string) => {
  const [inventory, setInventory] = useState<Record<string, InventoryStatus>>(
    inventoryStore.getInventory()
  );
  const [alerts, setAlerts] = useState<StockAlert[]>(
    inventoryStore.getAlerts(false)
  );

  useEffect(() => {
    const unsubInventory = inventoryStore.subscribe(setInventory);
    const unsubAlerts = inventoryStore.subscribeToAlerts(setAlerts);
    return () => {
      unsubInventory();
      unsubAlerts();
    };
  }, []);

  const getStockStatus = (id: string) => inventory[id] || null;
  const getProductStock = () => productId ? inventory[productId] : null;
  const acknowledgeAlert = (alertId: string) => inventoryStore.acknowledgeAlert(alertId);
  const updateStock = (updates: InventoryUpdate[]) => inventoryStore.updateStock(updates);
  
  return {
    inventory,
    alerts,
    getStockStatus,
    getProductStock,
    acknowledgeAlert,
    updateStock
  };
};