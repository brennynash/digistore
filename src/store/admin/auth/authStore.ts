import { getLocalStorage, setLocalStorage } from '../../../utils/storage';
import { AuthState } from './types';

class AuthStore {
  private static instance: AuthStore;
  private state: AuthState;
  private listeners: Set<(state: AuthState) => void>;

  private constructor() {
    this.state = {
      session: getLocalStorage('adminSession'),
      isAuthenticated: false
    };
    this.state.isAuthenticated = !!this.state.session;
    this.listeners = new Set();
  }

  static getInstance(): AuthStore {
    if (!AuthStore.instance) {
      AuthStore.instance = new AuthStore();
    }
    return AuthStore.instance;
  }

  getState(): AuthState {
    return { ...this.state };
  }

  setSession(session: string | null): void {
    this.state = {
      session,
      isAuthenticated: !!session
    };
    setLocalStorage('adminSession', session);
    this.notifyListeners();
  }

  subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    const state = this.getState();
    this.listeners.forEach(listener => listener(state));
  }
}

export const authStore = AuthStore.getInstance();