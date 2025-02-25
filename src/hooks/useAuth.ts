import { useState } from 'react';
import { authStore } from '../store/authStore';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      return await authStore.login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authStore.logout();
  };

  return {
    isLoading,
    error,
    login,
    logout,
    isAuthenticated: authStore.isAuthenticated()
  };
};