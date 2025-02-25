import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard = ({ children, className = '' }: GlassCardProps) => {
  return (
    <div className={`bg-black/95 backdrop-blur-lg rounded-2xl border-2 border-white/10 shadow-2xl ${className}`}>
      {children}
    </div>
  );
};