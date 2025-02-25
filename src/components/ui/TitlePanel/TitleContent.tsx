import React from 'react';
import { TitleContentProps } from './types';
import { GlitchText } from './GlitchText';
import { CyberEffect } from './CyberEffect';

export const TitleContent = ({ 
  title, 
  size, 
  variant,
  glitchEffect,
  cyberEffect 
}: TitleContentProps) => {
  const baseStyles = 'font-bold tracking-tight';
  
  const variantStyles = {
    default: 'text-white',
    gradient: 'text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60',
    outlined: 'text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]'
  };

  const glitchStyles = {
    default: 'text-white',
    gradient: 'text-white',
    outlined: 'text-white'
  };

  const content = (
    <CyberEffect
      text={title}
      enabled={cyberEffect}
      className={variantStyles[variant]}
    />
  );

  if (glitchEffect) {
    return (
      <h1 className={`${size} ${baseStyles} relative`}>
        <GlitchText
          text={title}
          className={variantStyles[variant]}
          glitchClassName={`${size} ${baseStyles} ${glitchStyles[variant]} select-none pointer-events-none`}
        />
      </h1>
    );
  }

  return (
    <h1 className={`${size} ${baseStyles} ${variantStyles[variant]}`}>
      {content}
    </h1>
  );
};