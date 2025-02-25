import React from 'react';
import { Loader2 } from 'lucide-react';

export const LazyLoadingSpinner = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <Loader2 size={24} className="text-white/60 animate-spin" />
  </div>
);