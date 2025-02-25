import React from 'react';
import { AlertCircle, Info, AlertTriangle, Clock } from 'lucide-react';
import { SystemLog } from '../../../types/analytics';
import { GlassCard } from '../../ui/GlassCard';

interface SystemLogsProps {
  logs: SystemLog[];
}

export const SystemLogs = ({ logs }: SystemLogsProps) => {
  const getIcon = (type: SystemLog['type']) => {
    switch (type) {
      case 'error': return AlertCircle;
      case 'warning': return AlertTriangle;
      default: return Info;
    }
  };

  const getTypeStyles = (type: SystemLog['type']) => {
    switch (type) {
      case 'error': return 'text-red-400';
      case 'warning': return 'text-yellow-400';
      default: return 'text-blue-400';
    }
  };

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">System Logs</h3>
        <div className="flex items-center gap-2 text-white/60 text-sm">
          <Clock size={16} />
          <span>Real-time updates</span>
        </div>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-auto">
        {logs.map(log => {
          const Icon = getIcon(log.type);
          const typeStyle = getTypeStyles(log.type);

          return (
            <div key={log.id} className="flex gap-3 p-3 bg-white/5 rounded-lg">
              <Icon size={20} className={typeStyle} />
              <div className="flex-1 min-w-0">
                <p className="text-white">{log.message}</p>
                {log.details && (
                  <p className="text-white/60 text-sm mt-1">{log.details}</p>
                )}
                <p className="text-white/40 text-xs mt-2">
                  {new Date(log.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
};