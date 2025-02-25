import React from 'react';
import { X } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface ConfirmDialogProps {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  confirmVariant?: 'primary' | 'danger';
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog = ({
  title,
  message,
  confirmLabel,
  cancelLabel = 'Cancel',
  confirmVariant = 'primary',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <GlassCard className="w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <button
            onClick={onCancel}
            className="text-white/60 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
        
        <p className="text-white/80 mb-6">{message}</p>
        
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-white hover:bg-white/5"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`glass-effect px-4 py-2 rounded-lg text-white ${
              confirmVariant === 'danger'
                ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400'
                : 'hover:bg-white/10'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </GlassCard>
    </div>
  );
};