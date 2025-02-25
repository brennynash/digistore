import React from 'react';
import { TitleSettings } from '../../../types/title';
import { TitleSize, TitleAlignment, TitleVariant } from '../../ui/TitlePanel/types';

interface StyleSettingsProps {
  settings: TitleSettings;
  onChange: (settings: TitleSettings) => void;
}

export const StyleSettings = ({ settings, onChange }: StyleSettingsProps) => {
  const sizes: TitleSize[] = ['small', 'default', 'large'];
  const alignments: TitleAlignment[] = ['left', 'center'];
  const variants: TitleVariant[] = ['default', 'gradient', 'outlined'];

  const handleChange = <K extends keyof TitleSettings>(field: K, value: TitleSettings[K]) => {
    onChange({
      ...settings,
      [field]: value
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white">Style Settings</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Size
          </label>
          <div className="grid grid-cols-3 gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => handleChange('size', size)}
                className={`px-4 py-2 rounded-lg ${
                  settings.size === size
                    ? 'glass-effect text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Alignment
          </label>
          <div className="grid grid-cols-2 gap-2">
            {alignments.map((align) => (
              <button
                key={align}
                onClick={() => handleChange('align', align)}
                className={`px-4 py-2 rounded-lg ${
                  settings.align === align
                    ? 'glass-effect text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {align.charAt(0).toUpperCase() + align.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Style Variant
          </label>
          <div className="grid grid-cols-3 gap-2">
            {variants.map((variant) => (
              <button
                key={variant}
                onClick={() => handleChange('variant', variant)}
                className={`px-4 py-2 rounded-lg ${
                  settings.variant === variant
                    ? 'glass-effect text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};