import React, { createContext, useContext } from 'react';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { adminStore } from '../store/admin/adminStore';
import type { AdminChanges } from '../store/admin/types';

interface AdminContextType {
  isAdmin: boolean;
  verifyAdminAccess: (phrase: string, promoCode: string) => boolean;
  logout: () => void;
  applyChanges: (changes: AdminChanges) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, login, logout } = useAdminAuth();

  return (
    <AdminContext.Provider value={{
      isAdmin: isAuthenticated,
      verifyAdminAccess: login,
      logout,
      applyChanges: adminStore.applyChanges.bind(adminStore)
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};