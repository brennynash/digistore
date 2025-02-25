import React from 'react';
import { Star, StarHalf } from 'lucide-react';

interface RatingProps {
  value?: number;
  total?: number;
  showValue?: boolean;
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  value = 0,
  total = 5,
  showValue = true,
  className = ''
}) => {
  // Ensure value is a number
  const ratingValue = typeof value === 'number' ? value : Number(value || 0);

  // Calculate filled stars
  const filledStars = Math.floor(ratingValue);
  const hasHalfStar = ratingValue % 1 >= 0.5;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[...Array(total)].map((_, index) => {
        if (index < filledStars) {
          return <Star key={index} className="w-4 h-4 fill-yellow-400 text-yellow-400" />;
        } else if (index === filledStars && hasHalfStar) {
          return <StarHalf key={index} className="w-4 h-4 fill-yellow-400 text-yellow-400" />;
        }
        return <Star key={index} className="w-4 h-4 text-gray-300" />;
      })}
      {showValue && (
        <span className="ml-1 text-sm text-gray-600">
          {ratingValue.toFixed(1)}
        </span>
      )}
    </div>
  );
};