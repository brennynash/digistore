import React from 'react';
import { MarqueeResponsive } from '../../../types/news';
import { Smartphone, Tablet, Monitor } from 'lucide-react';

interface ResponsiveSettingsProps {
  responsive: MarqueeResponsive;
  onChange: (responsive: MarqueeResponsive) => void;
}

export const ResponsiveSettings = ({ responsive, onChange }: ResponsiveSettingsProps) => {
  const devices = [
    { key: 'mobile', icon: Smartphone, label: 'Mobile' },
    { key: 'tablet', icon: Tablet, label: 'Tablet' },
    { key: 'desktop', icon: Monitor, label: 'Desktop' }
  ] as const;

  const handleChange = <K extends keyof MarqueeResponsive>(
    device: K,
    updates: Partial<MarqueeResponsive[K]>
  ) => {
    onChange({
      ...responsive,
      [device]: { ...responsive[device], ...updates }
    });
  };

  return (
    <div className="space-y-6">
      {devices.map(({ key, icon: Icon, label }) => (
        <div key={key} className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon size={20} className="text-white/60" />
              <h3 className="text-white font-medium">{label}</h3>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={responsive[key].enabled}
                onChange={(e) => handleChange(key, { enabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white/30"></div>
            </label>
          </div>

          {responsive[key].enabled && (
            <div className="space-y-4 pl-7">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">
                  Speed
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={responsive[key].speed}
                  onChange={(e) => handleChange(key, { speed: Number(e.target.value) })}
                  className="w-full accent-white"
                />
                <div className="flex justify-between text-sm text-white/60">
                  <span>Slower</span>
                  <span>Faster</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">
                  Gap (pixels)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={responsive[key].gap}
                  onChange={(e) => handleChange(key, { gap: Number(e.target.value) })}
                  className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-2 text-white"
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};