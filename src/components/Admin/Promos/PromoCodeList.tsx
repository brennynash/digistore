import React from 'react';
import { Edit2, Trash2, Tag, TrendingUp } from 'lucide-react';
import { PromoCode } from '../../../types/promo';
import { GlassCard } from '../../ui/GlassCard';
import { usePromoCode } from '../../../hooks/usePromoCode';
import { formatNumber } from '../../../utils/formatters';

interface PromoCodeListProps {
  promoCodes: PromoCode[];
  onEdit: (code: PromoCode) => void;
  onDelete: (code: PromoCode) => void;
}

export const PromoCodeList = ({ promoCodes, onEdit, onDelete }: PromoCodeListProps) => {
  const { getMetrics } = usePromoCode();

  const getStatusColor = (status: PromoCode['status']) => {
    return status === 'active' 
      ? 'bg-green-400/10 text-green-400'
      : 'bg-red-400/10 text-red-400';
  };

  return (
    <div className="space-y-4">
      {promoCodes.map(code => {
        const metrics = getMetrics(code.id);
        
        return (
          <GlassCard key={code.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Tag size={20} className="text-white/60" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-white">{code.code}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(code.status)}`}>
                      {code.status}
                    </span>
                  </div>
                  <div className="text-sm text-white/60">
                    {code.discountType === 'percentage' 
                      ? `${code.discountValue}% off` 
                      : `€${code.discountValue} off`}
                  </div>
                  {metrics.usageCount > 0 && (
                    <div className="flex items-center gap-4 mt-2 text-xs text-white/40">
                      <span className="flex items-center gap-1">
                        <TrendingUp size={12} />
                        {formatNumber(metrics.usageCount)} uses
                      </span>
                      <span>€{formatNumber(metrics.totalSavings)} saved</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(code)}
                  className="p-2 rounded-lg hover:bg-white/5 text-white/60 hover:text-white"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => onDelete(code)}
                  className="p-2 rounded-lg hover:bg-white/5 text-red-400 hover:text-red-300"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
};