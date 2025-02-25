import React from 'react';
import { TitlePanelProps } from './types';
import { TitleContent } from './TitleContent';
import { SubtitleContent } from './SubtitleContent';
import { useResponsiveTitle } from './hooks/useResponsiveTitle';

export const TitlePanel = ({
  title,
  subtitle,
  align = 'center',
  size = 'default',
  className = '',
  variant = 'default',
  glitchEffect = false,
  currencyAnimation = false,
  children
}: TitlePanelProps) => {
  const { titleSize, subtitleSize } = useResponsiveTitle(size);

  return (
    <div 
      className={`py-4 ${
        align === 'center' ? 'text-center' : 'text-left'
      } ${className}`}
    >
      <TitleContent
        title={title}
        size={titleSize}
        variant={variant}
        glitchEffect={glitchEffect}
        currencyAnimation={currencyAnimation}
      />
      
      {subtitle && (
        <SubtitleContent
          subtitle={subtitle}
          size={subtitleSize}
          variant={variant}
        />
      )}

      {children && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  );
};