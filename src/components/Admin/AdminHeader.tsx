import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Package, Newspaper, Type, Tag, Ticket, LogOut, BarChart2, Image } from 'lucide-react';
import { ThemeSelector } from './ThemeSettings/ThemeSelector';
import { useAuth } from '../../hooks/useAuth';
import { HeaderMetrics } from './Analytics/HeaderMetrics';

export const AdminHeader = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const showMetrics = location.pathname === '/admin/dashboard';

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { to: '', label: 'Dashboard', icon: BarChart2 },
    { to: 'products', label: 'Products', icon: Package },
    { to: 'news', label: 'News', icon: Newspaper },
    { to: 'title', label: 'Title', icon: Type },
    { to: 'discounts', label: 'Discounts', icon: Tag },
    { to: 'gifs', label: 'GIFs', icon: Image },
    { to: 'promos', label: 'Promos', icon: Ticket }
  ];

  return (
    <header className="bg-black/95 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <nav className="flex items-center gap-4">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to || '.'}
                className={({ isActive }) => `
                  px-4 py-2 rounded-lg flex items-center gap-2
                  ${isActive ? 'glass-effect text-white' : 'text-white/60 hover:text-white'}
                `}
              >
                <Icon size={20} />
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <ThemeSelector />
            <button
              onClick={handleLogout}
              className="glass-effect px-4 py-2 rounded-lg text-white hover:bg-white/10 flex items-center gap-2"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
        {showMetrics && <HeaderMetrics />}
      </div>
    </header>
  );
};