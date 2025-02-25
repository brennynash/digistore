import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
import { GlassCard } from '../../ui/GlassCard';
import { GifFormData } from '../../../types/gif';

interface GifFormProps {
  onSubmit: (data: GifFormData) => void;
  onClose: () => void;
}

export const GifForm = ({ onSubmit, onClose }: GifFormProps) => {
  const [formData, setFormData] = useState<GifFormData>({
    title: '',
    description: '',
    image: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <GlassCard className="w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Add Custom GIF</h3>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-2 text-white resize-none h-24"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              GIF URL
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={e => setFormData(prev => ({ ...prev, image: e.target.value }))}
              className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-2 text-white"
              placeholder="https://media.giphy.com/..."
              required
            />
            <p className="mt-1 text-xs text-white/40">
              Supported: Giphy, Tenor, or any direct GIF URL
            </p>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-white hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="glass-effect px-6 py-2 rounded-lg text-white hover:bg-white/10 flex items-center gap-2"
            >
              <Save size={20} />
              Add GIF
            </button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};