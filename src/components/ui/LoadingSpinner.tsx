import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <Loader2 size={48} className="text-white animate-spin" />
  </div>
);