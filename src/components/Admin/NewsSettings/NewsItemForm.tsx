import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { GlassCard } from '../../ui/GlassCard';

interface NewsItemFormProps {
  onSubmit: (item: { title: string; preview: string; emoji: string; type: 'update' | 'alert' | 'promo' | 'info' }) => void;
  onClose: () => void;
}

export const NewsItemForm = ({ onSubmit, onClose }: NewsItemFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    preview: '',
    emoji: '📢',
    type: 'info' as const
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <GlassCard className="w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Add News Item</h3>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-2 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Preview Text
            </label>
            <textarea
              value={formData.preview}
              onChange={e => setFormData(prev => ({ ...prev, preview: e.target.value }))}
              className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-2 text-white resize-none h-24"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Emoji
              </label>
              <input
                type="text"
                value={formData.emoji}
                onChange={e => setFormData(prev => ({ ...prev, emoji: e.target.value }))}
                className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Type
              </label>
              <select
                value={formData.type}
                onChange={e => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-2 text-white"
              >
                <option value="info">Info</option>
                <option value="update">Update</option>
                <option value="alert">Alert</option>
                <option value="promo">Promo</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full glass-effect text-white font-medium py-3 rounded-lg hover:bg-white/10 flex items-center justify-center gap-2"
          >
            <Save size={20} />
            Add News Item
          </button>
        </form>
      </GlassCard>
    </div>
  );
};