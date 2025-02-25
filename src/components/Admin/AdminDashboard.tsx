import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { GlassCard } from '../ui/GlassCard';
import { LogOut, Users, Activity, Package, BarChart2, Newspaper, Type, Tag, Ticket, Palette } from 'lucide-react';
import { ProductList } from './Products/ProductList';
import { Dashboard } from './Analytics/Dashboard';
import { NewsSettingsPanel } from './NewsSettings/NewsSettingsPanel';
import { TitleSettingsPanel } from './TitleSettings/TitleSettingsPanel';
import { DiscountPanel } from './Discounts/DiscountPanel';
import { ThemePanel } from './ThemeSettings/ThemePanel';
import { PromoCodeManager } from './Promos/PromoCodeManager';
import { TitlePanel } from '../ui/TitlePanel/TitlePanel';

type TabType = 'overview' | 'products' | 'news' | 'title' | 'discounts' | 'promos' | 'theme';

export const AdminDashboard = () => {
  const { logout } = useAdmin();
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductList />;
      case 'news':
        return <NewsSettingsPanel />;
      case 'title':
        return <TitleSettingsPanel />;
      case 'discounts':
        return <DiscountPanel />;
      case 'theme':
        return <ThemePanel />;
      case 'promos':
        return <PromoCodeManager />;
      case 'overview':
      default:
        return <Dashboard />;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart2 },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'discounts', label: 'Discounts', icon: Tag },
    { id: 'theme', label: 'Theme', icon: Palette },
    { id: 'promos', label: 'Promo Codes', icon: Ticket },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'title', label: 'Title', icon: Type }
  ] as const;

  return (
    <div className="min-h-screen admin-dashboard grid-pattern p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex-1">
            <TitlePanel
              title="Admin Dashboard"
              subtitle="Manage your digital store"
              align="left"
              size="small"
              variant="gradient"
            >
              <nav className="flex gap-2 mt-6 flex-wrap">
                {tabs.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`px-4 py-2 rounded-lg text-white flex items-center gap-2 transition-all ${
                      activeTab === id
                        ? 'glass-effect shadow-lg admin-nav-button active'
                        : 'admin-nav-button hover:bg-white/5'
                    }`}
                  >
                    <Icon size={20} />
                    {label}
                  </button>
                ))}
              </nav>
            </TitlePanel>
          </div>
          <button
            onClick={logout}
            className="glass-effect px-4 py-2 rounded-lg text-white flex items-center gap-2 hover:bg-white/10 transition-all ml-4"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};