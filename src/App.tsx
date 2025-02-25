import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { ProductProvider } from './context/ProductContext';
import { NewsProvider } from './context/NewsContext';
import { DiscountProvider } from './context/DiscountContext';
import { CartProvider } from './context/CartContext';
import { MetricsProvider } from './context/MetricsContext';
import { AnalyticsProvider } from './context/AnalyticsContext';
import { AdminProvider } from './context/AdminContext';
import { ThemeProvider } from './context/ThemeContext';
import { PaymentProvider } from './context/PaymentContext';
import { Snowfall } from './components/effects/Snowfall';
import { HalloweenEffects } from './components/effects/HalloweenEffects';
import { LightEffects } from './components/effects/LightEffects';
import { WordPressProvider } from './context/WordPressContext';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ProductProvider>
          <NewsProvider>
            <DiscountProvider>
              <CartProvider>
                <PaymentProvider>
                  <MetricsProvider>
                    <AnalyticsProvider>
                      <AdminProvider>
                        <WordPressProvider>
                          <Snowfall />
                          <HalloweenEffects />
                          <LightEffects />
                          <AppRoutes />
                        </WordPressProvider>
                      </AdminProvider>
                    </AnalyticsProvider>
                  </MetricsProvider>
                </PaymentProvider>
              </CartProvider>
            </DiscountProvider>
          </NewsProvider>
        </ProductProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};