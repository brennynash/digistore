import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { GlassCard } from '../../ui/GlassCard';
import { TitlePanel } from '../../ui/TitlePanel/TitlePanel';
import { useTitleSettings } from '../../../hooks/useTitleSettings';
import { TextSettings } from './TextSettings';
import { StyleSettings } from './StyleSettings';
import { EffectSettings } from './EffectSettings';

export const TitleSettingsPanel = () => {
  const { settings, updateSettings } = useTitleSettings();
  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleSave = () => {
    updateSettings(localSettings);
  };

  return (
    <div className="space-y-6">
      <TitlePanel
        title="Title Settings"
        subtitle="Customize your store's title appearance"
        align="left"
        size="small"
        variant="default"
      />

      <GlassCard className="p-6 space-y-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Preview</h3>
            <div className="p-6 bg-black/20 rounded-lg">
              <TitlePanel
                title={localSettings.titleText}
                subtitle={localSettings.subtitleText}
                align={localSettings.align}
                size={localSettings.size}
                variant={localSettings.variant}
                glitchEffect={localSettings.glitchEffect}
                cyberEffect={localSettings.cyberEffect}
              />
            </div>
          </div>

          <TextSettings
            settings={localSettings}
            onChange={setLocalSettings}
          />

          <StyleSettings
            settings={localSettings}
            onChange={setLocalSettings}
          />

          <EffectSettings
            settings={localSettings}
            onChange={setLocalSettings}
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full glass-effect text-white font-medium py-3 rounded-lg hover:bg-white/10 flex items-center justify-center gap-2"
        >
          <Save size={20} />
          Save Changes
        </button>
      </GlassCard>
    </div>
  );
};