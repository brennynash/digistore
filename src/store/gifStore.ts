import { GifItem } from '../types/gif';
import { getLocalStorage, setLocalStorage } from '../utils/storage';

class GifStore {
  private static instance: GifStore;
  private gifs: GifItem[];
  private listeners: Set<(gifs: GifItem[]) => void>;

  private constructor() {
    this.gifs = getLocalStorage('customGifs') || [];
    this.listeners = new Set();
  }

  static getInstance(): GifStore {
    if (!GifStore.instance) {
      GifStore.instance = new GifStore();
    }
    return GifStore.instance;
  }

  getGifs(): GifItem[] {
    return [...this.gifs].sort((a, b) => a.order - b.order);
  }

  addGif(data: Omit<GifItem, 'id' | 'order' | 'active'>): void {
    const newGif: GifItem = {
      id: crypto.randomUUID(),
      order: this.gifs.length,
      active: true,
      ...data
    };
    this.gifs.push(newGif);
    this.save();
  }

  updateGif(id: string, updates: Partial<GifItem>): void {
    this.gifs = this.gifs.map(gif => 
      gif.id === id ? { ...gif, ...updates } : gif
    );
    this.save();
  }

  deleteGif(id: string): void {
    this.gifs = this.gifs.filter(gif => gif.id !== id);
    this.save();
  }

  reorderGifs(gifIds: string[]): void {
    const orderedGifs = gifIds.map((id, index) => {
      const gif = this.gifs.find(g => g.id === id);
      return gif ? { ...gif, order: index } : null;
    }).filter((gif): gif is GifItem => gif !== null);

    const unchangedGifs = this.gifs.filter(gif => !gifIds.includes(gif.id));
    this.gifs = [...orderedGifs, ...unchangedGifs];
    this.save();
  }

  private save(): void {
    setLocalStorage('customGifs', this.gifs);
    this.notifyListeners();
  }

  subscribe(listener: (gifs: GifItem[]) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    const gifs = this.getGifs();
    this.listeners.forEach(listener => listener(gifs));
  }
}

export const gifStore = GifStore.getInstance();