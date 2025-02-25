import React from 'react';
import { useWordPress } from '../context/WordPressContext';
import { ProductCard3D } from './Product/Card/ProductCard3D';
import { LoadingSpinner } from './ui/LoadingSpinner';

export const ProductGrid = () => {
  const { products, loading, error } = useWordPress();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-white/60">Error loading products: {error}</p>
      </div>
    );
  }

  // Transform WooCommerce products to match your ProductCard3D format
  const formattedProducts = products.map(product => {
    const regularPrice = parseFloat(product.regular_price || '0');
    const salePrice = product.sale_price ? parseFloat(product.sale_price) : undefined;
    // Use sale_price as base price if available, otherwise use regular_price
    const basePrice = salePrice || regularPrice;
    const ratingValue = Number(product.average_rating || 5);
    const quantity = 1; // Default quantity

    return {
      id: product.id.toString(),
      title: product.name,
      description: product.short_description?.rendered || '',
      price: isNaN(basePrice) ? 0 : basePrice,
      basePrice: isNaN(basePrice) ? 0 : basePrice, // Store original base price (sale price if available)
      regularPrice: isNaN(regularPrice) ? 0 : regularPrice, // Store original regular price
      totalPrice: isNaN(basePrice) ? 0 : basePrice * quantity,
      image: product.images?.[0]?.src || '/placeholder-image.jpg',
      category: product.categories?.[0]?.name || 'Uncategorized',
      rating: ratingValue,
      ratingCount: Number(product.rating_count || 0),
      stats: {
        rating: ratingValue,
        reviews: Number(product.rating_count || 0)
      },
      inStock: product.stock_status === 'instock',
      onSale: !!product.sale_price,
      salePrice: salePrice,
      quantity,
      maxQuantity: parseInt(product.stock_quantity || '10'),
      reviews: product.reviews || [],
      tags: product.categories?.map(cat => cat.name) || [],
      currency: 'USD',
      discountPercentage: salePrice ? Math.round(((regularPrice - salePrice) / regularPrice) * 100) : 0,
      // Update prices based on quantity
      updatePrices: (newQuantity: number) => ({
        price: basePrice * newQuantity,
        regularPrice: regularPrice * newQuantity,
        totalPrice: basePrice * newQuantity
      })
    };
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-2 sm:p-4">
      {formattedProducts.map((product) => (
        <ProductCard3D key={product.id} {...product} />
      ))}
    </div>
  );
};