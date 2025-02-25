import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { GlassCard } from '../../ui/GlassCard';
import { AnimatedMetric } from './AnimatedMetric';
import { useSpring, animated } from '@react-spring/web';

interface MetricCardProps {
  title: string;
  value: number;
  previousValue: number;
  format?: (value: number) => string;
  icon: React.ElementType;
  isRefreshing?: boolean;
}

export const MetricCard = ({ 
  title, 
  value, 
  previousValue, 
  format = (v) => v.toString(), 
  icon: Icon,
  isRefreshing = false
}: MetricCardProps) => {
  const percentageChange = ((value - previousValue) / previousValue) * 100;
  const isPositive = percentageChange >= 0;

  const pulseAnimation = useSpring({
    from: { opacity: isRefreshing ? 0.5 : 1 },
    to: { opacity: 1 },
    config: { tension: 300, friction: 10 },
  });

  return (
    <animated.div style={pulseAnimation}>
      <GlassCard className="p-6 transform transition-transform hover:scale-102">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium text-white/80">{title}</h3>
            <div className="text-3xl font-bold text-white mt-2">
              <AnimatedMetric value={value} formatter={format} />
            </div>
            <div className={`flex items-center gap-1 mt-2 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <AnimatedMetric 
                value={Math.abs(percentageChange)} 
                formatter={(v) => `${v.toFixed(1)}%`}
              />
            </div>
          </div>
          <div className={`p-3 rounded-lg bg-white/5 transition-transform ${isRefreshing ? 'animate-spin' : ''}`}>
            <Icon size={24} className="text-white/60" />
          </div>
        </div>
      </GlassCard>
    </animated.div>
  );
};