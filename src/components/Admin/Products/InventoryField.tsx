import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface InventoryFieldProps {
  quantity: number;
  threshold: number;
  onChange: (value: number) => void;
  onThresholdChange: (value: number) => void;
}

export const InventoryField = ({
  quantity,
  threshold,
  onChange,
  onThresholdChange
}: InventoryFieldProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Available Quantity
        </label>
        <input
          type="number"
          min="0"
          value={quantity}
          onChange={(e) => onChange(Math.max(0, parseInt(e.target.value) || 0))}
          className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-2 text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          Low Stock Alert Threshold
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="1"
            value={threshold}
            onChange={(e) => onThresholdChange(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-2 text-white"
          />
          {quantity <= threshold && quantity > 0 && (
            <div className="flex items-center gap-1 text-yellow-400">
              <AlertTriangle size={16} />
              <span className="text-sm">Low Stock</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};