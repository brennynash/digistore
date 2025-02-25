import React from 'react';
import { Zap, Terminal } from 'lucide-react';
import { TitleSettings } from '../../../types/title';

interface EffectSettingsProps {
  settings: TitleSettings;
  onChange: (settings: TitleSettings) => void;
}

export const EffectSettings = ({ settings, onChange }: EffectSettingsProps) => {
  const handleEffectChange = (effect: 'glitchEffect' | 'cyberEffect') => {
    onChange({
      ...settings,
      glitchEffect: effect === 'glitchEffect' ? !settings.glitchEffect : false,
      cyberEffect: effect === 'cyberEffect' ? !settings.cyberEffect : false
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white">Effects</h3>
      
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => handleEffectChange('glitchEffect')}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            settings.glitchEffect
              ? 'glass-effect text-white'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <Zap size={16} />
          Glitch Effect
        </button>

        <button
          type="button"
          onClick={() => handleEffectChange('cyberEffect')}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            settings.cyberEffect
              ? 'glass-effect text-white'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <Terminal size={16} />
          Cyber Effect
        </button>
      </div>
    </div>
  );
};