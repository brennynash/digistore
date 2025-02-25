import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminHeader } from '../../components/Admin/AdminHeader';
import { ProductList } from '../../components/Admin/Products/ProductList';
import { NewsSettingsPanel } from '../../components/Admin/NewsSettings/NewsSettingsPanel';
import { TitleSettingsPanel } from '../../components/Admin/TitleSettings/TitleSettingsPanel';
import { DiscountPanel } from '../../components/Admin/Discounts/DiscountPanel';
import { GifManager } from '../../components/Admin/GifSettings/GifManager';
import { PromoCodeManager } from '../../components/Admin/Promos/PromoCodeManager';
import { Dashboard } from '../../components/Admin/Analytics/Dashboard';

export const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-black grid-pattern">
      <AdminHeader />
      
      <main className="max-w-7xl mx-auto px-6 py-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="products" element={<ProductList />} />
          <Route path="news" element={<NewsSettingsPanel />} />
          <Route path="title" element={<TitleSettingsPanel />} />
          <Route path="discounts" element={<DiscountPanel />} />
          <Route path="gifs" element={<GifManager />} />
          <Route path="promos" element={<PromoCodeManager />} />
        </Routes>
      </main>
    </div>
  );
};