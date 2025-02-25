import React from 'react';

interface BentoBoxProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const BentoBox = ({ children, className = '', hover = true }: BentoBoxProps) => {
  return (
    <div className={`bento-box ${hover ? 'bento-box-hover' : ''} ${className}`}>
      {children}
    </div>
  );
};