import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';
import { products as defaultProducts } from '../data/products';
import { productStore } from '../store/productStore';

interface ProductContextType {
  products: Product[];
  isLoading: boolean;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
  resetToDefaults: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const loadedProducts = productStore.getProducts();
        setProducts(loadedProducts);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
    return productStore.subscribe(setProducts);
  }, []);

  const addProduct = (product: Omit<Product, 'id'>) => {
    productStore.addProduct(product);
  };

  const updateProduct = (productId: string, updates: Partial<Product>) => {
    productStore.updateProduct(productId, updates);
  };

  const deleteProduct = (productId: string) => {
    productStore.deleteProduct(productId);
  };

  const resetToDefaults = () => {
    productStore.resetToDefaults(defaultProducts);
  };

  return (
    <ProductContext.Provider value={{
      products,
      isLoading,
      addProduct,
      updateProduct,
      deleteProduct,
      resetToDefaults
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};