import React from 'react';
import { SubtitleContentProps } from './types';

export const SubtitleContent = ({ subtitle, size, variant }: SubtitleContentProps) => {
  const baseStyles = 'mt-2';
  
  const variantStyles = {
    default: 'text-gray-400',
    gradient: 'text-gray-400/80',
    outlined: 'text-gray-400/90'
  };

  return (
    <p className={`${size} ${baseStyles} ${variantStyles[variant]}`}>
      {subtitle}
    </p>
  );
};