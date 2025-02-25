import React from 'react';
import { AlertCircle, Info, AlertTriangle, Clock } from 'lucide-react';
import { SystemEvent } from '../../../types/metrics';
import { GlassCard } from '../../ui/GlassCard';
import { useTransition, animated } from '@react-spring/web';

interface SystemEventsProps {
  events: SystemEvent[];
  isRefreshing?: boolean;
}

export const SystemEvents = ({ events, isRefreshing = false }: SystemEventsProps) => {
  const transitions = useTransition(events, {
    from: { opacity: 0, transform: 'translateX(-20px)' },
    enter: { opacity: 1, transform: 'translateX(0px)' },
    leave: { opacity: 0, transform: 'translateX(20px)' },
    keys: event => event.id,
  });

  const getIcon = (type: SystemEvent['type']) => {
    switch (type) {
      case 'error': return AlertCircle;
      case 'warning': return AlertTriangle;
      default: return Info;
    }
  };

  const getTypeStyles = (type: SystemEvent['type']) => {
    switch (type) {
      case 'error': return 'text-red-400';
      case 'warning': return 'text-yellow-400';
      default: return 'text-blue-400';
    }
  };

  return (
    <GlassCard className={`p-6 transition-opacity duration-300 ${isRefreshing ? 'opacity-50' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">System Events</h3>
        <div className="flex items-center gap-2 text-white/60 text-sm">
          <Clock size={16} className={isRefreshing ? 'animate-spin' : ''} />
          <span>Real-time updates</span>
        </div>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-auto">
        {transitions((style, event) => {
          const Icon = getIcon(event.type);
          const typeStyle = getTypeStyles(event.type);

          return (
            <animated.div style={style} key={event.id}>
              <div className="flex gap-3 p-3 bg-white/5 rounded-lg">
                <Icon size={20} className={typeStyle} />
                <div className="flex-1 min-w-0">
                  <p className="text-white">{event.message}</p>
                  <p className="text-white/40 text-xs mt-2">
                    {new Date(event.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            </animated.div>
          );
        })}
      </div>
    </GlassCard>
  );
};