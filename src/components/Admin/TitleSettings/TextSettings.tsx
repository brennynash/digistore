import React from 'react';
import { TitleSettings } from '../../../types/title';

interface TextSettingsProps {
  settings: TitleSettings;
  onChange: (settings: TitleSettings) => void;
}

export const TextSettings = ({ settings, onChange }: TextSettingsProps) => {
  const handleChange = (field: keyof Pick<TitleSettings, 'titleText' | 'subtitleText'>, value: string) => {
    onChange({
      ...settings,
      [field]: value
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white">Text Content</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Title Text
          </label>
          <input
            type="text"
            value={settings.titleText}
            onChange={(e) => handleChange('titleText', e.target.value)}
            className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-2 text-white"
            placeholder="Enter title text..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Subtitle Text
          </label>
          <input
            type="text"
            value={settings.subtitleText}
            onChange={(e) => handleChange('subtitleText', e.target.value)}
            className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-2 text-white"
            placeholder="Enter subtitle text..."
          />
        </div>
      </div>
    </div>
  );
};