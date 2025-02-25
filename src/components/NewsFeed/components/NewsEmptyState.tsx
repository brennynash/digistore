import React from 'react';
import { Bell } from 'lucide-react';

export const NewsEmptyState = () => (
  <div className="py-12 text-center">
    <Bell size={32} className="mx-auto mb-4 text-white/40" />
    <p className="text-white/60">No new notifications</p>
  </div>
);