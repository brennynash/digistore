import { getLocalStorage, setLocalStorage } from '../utils/storage';

class AuthStore {
  private static instance: AuthStore;
  private session: string | null = null;

  private constructor() {
    this.session = getLocalStorage('adminSession');
  }

  static getInstance(): AuthStore {
    if (!AuthStore.instance) {
      AuthStore.instance = new AuthStore();
    }
    return AuthStore.instance;
  }

  async login(email: string, password: string): Promise<boolean> {
    // For demo purposes - replace with real authentication
    if (email === 'admin@example.com' && password === 'admin123') {
      this.session = crypto.randomUUID();
      setLocalStorage('adminSession', this.session);
      return true;
    }
    throw new Error('Invalid credentials');
  }

  logout(): void {
    this.session = null;
    setLocalStorage('adminSession', null);
  }

  isAuthenticated(): boolean {
    return !!this.session;
  }
}

export const authStore = AuthStore.getInstance();