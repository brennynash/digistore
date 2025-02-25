import React, { Suspense, lazy, startTransition } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '../components/Admin/ProtectedRoute';
import { LazyLoadingSpinner } from '../components/ui/LazyLoadingSpinner';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { Products } from '../components/Products';

// Lazy load routes with preloading strategy
const StoreFront = lazy(() => {
  const component = import('../pages/StoreFront').then(module => ({
    default: module.StoreFront
  }));

  // Preload admin routes after main content
  startTransition(() => {
    import('../pages/admin/AdminLogin');
    import('../pages/admin/AdminDashboard');
  });

  return component;
});

// Lazy load other routes
const AdminLogin = lazy(() =>
  import('../pages/admin/AdminLogin').then(module => ({
    default: module.AdminLogin
  }))
);

const AdminDashboard = lazy(() =>
  import('../pages/admin/AdminDashboard').then(module => ({
    default: module.AdminDashboard
  }))
);

const LitepayCheckout = lazy(() =>
  import('./checkout/LitepayCheckout').then(module => ({
    default: module.LitepayCheckout
  }))
);

const ThankYou = lazy(() =>
  import('./checkout/ThankYou').then(module => ({
    default: module.ThankYou
  }))
);

export const AppRoutes = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LazyLoadingSpinner />}>
        <Routes>
          {/* Store Front */}
          <Route path="/" element={<StoreFront />} />

          {/* Checkout Routes */}
          <Route path="/checkout/litepay" element={<LitepayCheckout />} />
          <Route path="/checkout/thank-you" element={<ThankYou />} />

          {/* Admin Routes */}
          <Route path="/admin">
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="login" element={<AdminLogin />} />
            <Route path="dashboard/*" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
          </Route>

          {/* Products Route */}
          <Route path="/products" element={<Products />} />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};