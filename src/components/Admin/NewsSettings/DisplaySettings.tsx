import React from 'react';
import { GlassCard } from '../../ui/GlassCard';
import { useNews } from '../../../hooks/useNews';

export const DisplaySettings = () => {
  const { settings, updateSettings } = useNews();

  const handleDisplayChange = (updates: Partial<typeof settings.display>) => {
    updateSettings({
      ...settings,
      display: { ...settings.display, ...updates }
    });
  };

  return (
    <GlassCard className="p-6">
      <h2 className="text-xl font-bold text-white mb-6">Display Settings</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Maximum Items
          </label>
          <input
            type="number"
            min={1}
            max={20}
            value={settings.display.maxItems}
            onChange={(e) => handleDisplayChange({ maxItems: Number(e.target.value) })}
            className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-2 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Animation Speed (ms)
          </label>
          <input
            type="range"
            min={100}
            max={1000}
            step={100}
            value={settings.display.animationSpeed}
            onChange={(e) => handleDisplayChange({ animationSpeed: Number(e.target.value) })}
            className="w-full accent-white"
          />
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.display.showEmoji}
              onChange={(e) => handleDisplayChange({ showEmoji: e.target.checked })}
              className="rounded border-white/10 bg-white/5 text-white"
            />
            <span className="text-sm text-white/80">Show Emoji</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.display.showTimestamp}
              onChange={(e) => handleDisplayChange({ showTimestamp: e.target.checked })}
              className="rounded border-white/10 bg-white/5 text-white"
            />
            <span className="text-sm text-white/80">Show Timestamp</span>
          </label>
        </div>
      </div>
    </GlassCard>
  );
};