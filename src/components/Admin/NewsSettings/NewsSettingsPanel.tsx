import React from 'react';
import { TitlePanel } from '../../ui/TitlePanel/TitlePanel';
import { NewsItemManager } from './NewsItemManager';
import { DisplaySettings } from './DisplaySettings';
import { useNews } from '../../../hooks/useNews';

export const NewsSettingsPanel = () => {
  const { settings, updateSettings } = useNews();

  return (
    <div className="space-y-6">
      <TitlePanel
        title="News Feed Settings"
        subtitle="Manage your news feed content and appearance"
        align="left"
        size="small"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NewsItemManager />
        <DisplaySettings />
      </div>
    </div>
  );
};