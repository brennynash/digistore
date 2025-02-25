import React from 'react';
import { Product } from '../types';
import { BentoBox } from './ui/BentoBox';
import { Rating } from './ui/Rating';
import { ProductQuantity } from './Product/ProductQuantity';
import { PriceDisplay } from './Product/PriceDisplay';
import { imageOptimizer } from '../utils/performance';

export const ProductCard = ({ id, title, description, price, rating, image, inStock }: Product) => {
  return (
    <BentoBox className="overflow-hidden group">
      <div className="relative h-[280px]">
        <img 
          src={imageOptimizer(image, 800)} 
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute top-3 left-3">
          <Rating value={rating} />
        </div>
      </div>
      
      {/* Rest of the component remains the same */}
    </BentoBox>
  );
};