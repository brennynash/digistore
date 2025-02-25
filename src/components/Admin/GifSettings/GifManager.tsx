import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { GifForm } from './GifForm';
import { GifList } from './GifList';
import { TitlePanel } from '../../ui/TitlePanel/TitlePanel';
import { ConfirmDialog } from '../../ui/ConfirmDialog';
import { gifStore } from '../../../store/gifStore';
import type { GifItem } from '../../../types/gif';

export const GifManager = () => {
  const [gifs, setGifs] = useState<GifItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [deletingGif, setDeletingGif] = useState<string | null>(null);

  useEffect(() => {
    return gifStore.subscribe(setGifs);
  }, []);

  const handleSubmit = (data: { title: string; description: string; image: string }) => {
    gifStore.addGif(data);
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setDeletingGif(id);
  };

  const confirmDelete = () => {
    if (deletingGif) {
      gifStore.deleteGif(deletingGif);
      setDeletingGif(null);
    }
  };

  const handleToggleActive = (id: string, active: boolean) => {
    gifStore.updateGif(id, { active });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <TitlePanel
          title="GIF Management"
          subtitle="Customize the GIF section on your store"
          align="left"
          size="small"
        />
        
        <button
          onClick={() => setShowForm(true)}
          className="glass-effect px-4 py-2 rounded-lg text-white hover:bg-white/10 flex items-center gap-2"
        >
          <Plus size={20} />
          Add GIF
        </button>
      </div>

      <GifList
        gifs={gifs}
        onDelete={handleDelete}
        onToggleActive={handleToggleActive}
      />

      {showForm && (
        <GifForm
          onSubmit={handleSubmit}
          onClose={() => setShowForm(false)}
        />
      )}

      {deletingGif && (
        <ConfirmDialog
          title="Delete GIF"
          message="Are you sure you want to delete this GIF? This action cannot be undone."
          confirmLabel="Delete"
          confirmVariant="danger"
          onConfirm={confirmDelete}
          onCancel={() => setDeletingGif(null)}
        />
      )}
    </div>
  );
};