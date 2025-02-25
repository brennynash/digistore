import React, { useRef, useEffect } from 'react';
import { Product } from '../../../types';
import { BentoBox } from '../../ui/BentoBox';
import { ProductImage } from './ProductImage';
import { useHoverScramble } from '../../../hooks/useHoverScramble';
import { ProductInfo } from './ProductInfo';

const MAX_ROTATION = 12;
const LAYER_DEPTH = 50; // Controls the intensity of the 3D effect

export const ProductCard3D = (product: Product) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { triggerScramble } = useHoverScramble();

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = Math.min(MAX_ROTATION, Math.max(-MAX_ROTATION, ((y - centerY) / centerY) * -MAX_ROTATION));
      const rotateY = Math.min(MAX_ROTATION, Math.max(-MAX_ROTATION, ((x - centerX) / centerX) * MAX_ROTATION));

      // Calculate depth effect based on cursor position
      const distanceFromCenter = Math.sqrt(
        Math.pow((x - centerX) / centerX, 2) +
        Math.pow((y - centerY) / centerY, 2)
      );

      const depth = Math.max(0, 1 - distanceFromCenter) * LAYER_DEPTH;

      card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale3d(1.02, 1.02, 1.02)
        translateZ(${depth}px)
      `;

      card.style.transition = 'none';
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1) translateZ(0)';
      card.style.transition = 'transform 0.5s ease-out';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="transition-transform duration-300 ease-out cursor-grab active:cursor-grabbing"
      onMouseEnter={triggerScramble}
    >
      <BentoBox className="overflow-hidden group transform-gpu transition-all duration-700
        hover:shadow-[0_0_40px_rgba(0,0,0,0.2)] preserve-3d">
        <div className="matrix-overlay" />
        <ProductImage
          id={product.id}
          title={product.title}
          image={product.image}
          rating={product.rating}
        />
        <div className="transform-gpu transition-all duration-700 group-hover:translate-z-4">
          <ProductInfo product={product} />
        </div>
      </BentoBox>
    </div>
  );
};