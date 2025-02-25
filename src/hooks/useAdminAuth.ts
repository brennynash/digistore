import { useState, useCallback, useEffect } from 'react';
import { validateAdminCredentials } from '../utils/adminAuth';
import { authStore } from '../store/admin/auth/authStore';
import type { AuthState } from '../store/admin/auth/types';

export const useAdminAuth = () => {
  const [authState, setAuthState] = useState<AuthState>(authStore.getState());

  useEffect(() => {
    return authStore.subscribe(setAuthState);
  }, []);

  const login = useCallback((phrase: string, promoCode: string): boolean => {
    try {
      const isValid = validateAdminCredentials(phrase, promoCode);
      if (isValid) {
        authStore.setSession(crypto.randomUUID());
      }
      return isValid;
    } catch (error) {
      console.error('Admin authentication failed:', error);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    authStore.setSession(null);
  }, []);

  return {
    isAuthenticated: authState.isAuthenticated,
    login,
    logout
  };
};