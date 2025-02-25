import React from 'react';
import { NewsSettings } from '../../../types/news';

interface NotificationSettingsProps {
  settings: NewsSettings['notifications'];
  autoMarkRead: boolean;
  onChange: (settings: Partial<NewsSettings>) => void;
}

export const NotificationSettings = ({ settings, autoMarkRead, onChange }: NotificationSettingsProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-white">Notification Settings</h3>

      <div className="space-y-4">
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.sound}
              onChange={(e) => onChange({
                notifications: { ...settings, sound: e.target.checked }
              })}
              className="rounded border-white/10 bg-white/5 text-white"
            />
            <span className="text-sm text-white/80">Enable Sound</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.desktop}
              onChange={(e) => onChange({
                notifications: { ...settings, desktop: e.target.checked }
              })}
              className="rounded border-white/10 bg-white/5 text-white"
            />
            <span className="text-sm text-white/80">Desktop Notifications</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.autoHide}
              onChange={(e) => onChange({
                notifications: { ...settings, autoHide: e.target.checked }
              })}
              className="rounded border-white/10 bg-white/5 text-white"
            />
            <span className="text-sm text-white/80">Auto-hide Notifications</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={autoMarkRead}
              onChange={(e) => onChange({ autoMarkRead: e.target.checked })}
              className="rounded border-white/10 bg-white/5 text-white"
            />
            <span className="text-sm text-white/80">Auto-mark as Read</span>
          </label>
        </div>

        {settings.autoHide && (
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Hide Delay (seconds)
            </label>
            <input
              type="number"
              min={1}
              max={30}
              value={settings.hideDelay}
              onChange={(e) => onChange({
                notifications: { ...settings, hideDelay: Number(e.target.value) }
              })}
              className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-2 text-white"
            />
          </div>
        )}
      </div>
    </div>
  );
};