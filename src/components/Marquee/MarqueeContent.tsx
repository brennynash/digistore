import React from 'react';

interface MarqueeContentProps {
  children: React.ReactNode;
  className?: string;
}

export const MarqueeContent = ({ children, className = '' }: MarqueeContentProps) => {
  return (
    <div className={`inline-flex items-center ${className}`}>
      {children}
    </div>
  );
};