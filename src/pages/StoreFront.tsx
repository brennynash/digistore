import React from 'react';
import { NewsMarquee } from '../components/NewsMarquee';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { GifSection } from '../components/GifSection';
import { ProductGrid } from '../components/ProductGrid';
import { Stats } from '../components/Stats';
import { PaymentMarquee } from '../components/PaymentMarquee';
import { CartSidebar } from '../components/Cart/CartSidebar';
import { ErrorBoundary } from '../components/ErrorBoundary';

export const StoreFront = () => {
  return (
    <div className="min-h-screen bg-black grid-pattern">
      <ErrorBoundary>
        <NewsMarquee />
        <Header />

        <main className="max-w-7xl mx-auto px-6 py-4 sm:py-8 space-y-6 sm:space-y-12">
          <Hero />
          <GifSection />
          <ProductGrid />
          <Stats />
        </main>

        <PaymentMarquee />
        <CartSidebar />
      </ErrorBoundary>
    </div>
  );
};