import React from 'react';
import { Rating } from '../../ui/Rating';
import { StockIndicator } from '../StockIndicator';
import { imageOptimizer } from '../../../utils/performance';

interface ProductImageProps {
  id: string;
  title: string;
  image: string;
  rating: number;
}

export const ProductImage = ({ id, title, image, rating }: ProductImageProps) => {
  return (
    <div className="relative h-[280px] transform-gpu transition-all duration-700">
      <div className="absolute inset-0 rounded-t-2xl overflow-hidden">
        <img
          src={imageOptimizer(image, 800)}
          alt={title}
          className="w-full h-full object-cover transform-gpu transition-all duration-700 filter
            scale-110 group-hover:scale-100 contrast-125 group-hover:brightness-110
            group-hover:translate-z-12"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 
          transform-gpu transition-transform duration-700 group-hover:translate-z-8" />
      </div>

      <div className="absolute top-3 left-3 transform-gpu transition-all duration-500 
        group-hover:translate-y-1 group-hover:translate-z-16 z-10">
        <Rating value={rating} />
      </div>

      <div className="absolute top-3 right-3 transform-gpu transition-all duration-500 
        group-hover:translate-y-1 group-hover:translate-z-16 z-10">
        <StockIndicator productId={id} />
      </div>
    </div>
  );
};