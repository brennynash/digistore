import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { useInventory } from '../../../hooks/useInventory';
import { GlassCard } from '../../ui/GlassCard';
import { formatDistanceToNow } from '../../../utils/formatters';

export const StockAlerts = () => {
  const { alerts, acknowledgeAlert } = useInventory();
  const unacknowledgedAlerts = alerts.filter(alert => !alert.acknowledged);

  if (unacknowledgedAlerts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white flex items-center gap-2">
        <AlertTriangle size={20} className="text-yellow-400" />
        Stock Alerts
      </h3>

      <div className="space-y-2">
        {unacknowledgedAlerts.map(alert => (
          <GlassCard key={alert.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className={alert.type === 'OUT_OF_STOCK' ? 'text-red-400' : 'text-yellow-400'}>
                    {alert.type === 'OUT_OF_STOCK' ? 'Out of Stock' : 'Low Stock'}
                  </span>
                  <span className="text-white">
                    Quantity: {alert.quantity}
                  </span>
                </div>
                <div className="text-white/60 text-xs mt-1">
                  {formatDistanceToNow(alert.timestamp)}
                </div>
              </div>

              <button
                onClick={() => acknowledgeAlert(alert.id)}
                className="p-2 rounded-lg hover:bg-white/5 text-green-400"
              >
                <CheckCircle size={16} />
              </button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};