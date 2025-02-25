import React from 'react';
import { Product } from '../types';
import { BentoBox } from './ui/BentoBox';
import { Rating } from './ui/Rating';
import { ProductQuantity } from './Product/ProductQuantity';
import { PriceDisplay } from './Product/PriceDisplay';
import { StockIndicator } from './Product/StockIndicator';

export const ProductCard = ({ id, title, description, price, rating, image, inStock }: Product) => {
  return (
    <BentoBox className="overflow-hidden group">
      <div className="relative h-[280px]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute top-3 left-3">
          <Rating value={rating} />
        </div>
        <div className="absolute top-3 right-3">
          <StockIndicator productId={id} />
        </div>
      </div>

      <div className="p-5 space-y-4 bg-black/40 backdrop-blur-sm">
        <div>
          <h3 className="text-xl font-bold text-white truncate hover:text-clip group-hover:text-white/90 transition-colors">
            {title}
          </h3>
          <p className="text-gray-400 text-sm mt-1 line-clamp-2">{description}</p>
        </div>

        <ProductQuantity
          product={{ id, title, description, price, rating, image, inStock }}
          priceDisplay={
            <PriceDisplay
              productId={id}
              basePrice={price}
              quantity={0}
            />
          }
        />
      </div>
    </BentoBox>
  );
};