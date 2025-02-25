import type { SyncEvent } from './types';

class EventBus {
  private static instance: EventBus;
  private listeners: Set<(event: SyncEvent) => void>;

  private constructor() {
    this.listeners = new Set();
  }

  static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  subscribe(listener: (event: SyncEvent) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  emit(event: SyncEvent): void {
    this.listeners.forEach(listener => listener(event));
  }
}

export const eventBus = EventBus.getInstance();