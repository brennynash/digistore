import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BentoBox } from './ui/BentoBox';

import { gifStore } from '../store/gifStore';

const DEFAULT_GIFS = [
  {
    id: 1,
    image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmZiMzM5MjBmZDZiZjBiZjM4ZjBmZjM4ZjQ5ZjM4ZjQ5ZjM4ZjQ5ZiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/3oKIPEqDGUULpEU0aQ/giphy.gif',
    title: 'Premium Digital Products',
    description: 'Experience the best quality digital products at unbeatable prices'
  },
  {
    id: 2,
    image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmZiMzM5MjBmZDZiZjBiZjM4ZjBmZjM4ZjQ5ZjM4ZjQ5ZjM4ZjQ5ZiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/xT9IgzoKnwFNmISR8I/giphy.gif',
    title: 'Secure Transactions',
    description: 'Your security is our top priority with encrypted payment methods'
  },
  {
    id: 3,
    image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmZiMzM5MjBmZDZiZjBiZjM4ZjBmZjM4ZjQ5ZjM4ZjQ5ZjM4ZjQ5ZiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/l46Cy1rHbQ92uuLXa/giphy.gif',
    title: '24/7 Support',
    description: 'Our dedicated team is here to help you around the clock'
  }
];

export const GifSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [gifs, setGifs] = useState(DEFAULT_GIFS);

  useEffect(() => {
    return gifStore.subscribe(customGifs => {
      const activeCustomGifs = customGifs.filter(gif => gif.active);
      setGifs([...DEFAULT_GIFS, ...activeCustomGifs]);
    });
  }, []);

  const slideProps = useSpring({
    transform: `translateX(-${currentIndex * 100}%)`,
    config: { tension: 280, friction: 60 }
  });

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setStartX('touches' in e ? e.touches[0].clientX : e.clientX);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const diff = startX - currentX;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < gifs.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setIsDragging(false);
      } else if (diff < 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
        setIsDragging(false);
      }
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const navigate = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === 'next' && currentIndex < gifs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <div className="relative overflow-hidden">
        <animated.div
          className="flex"
          style={slideProps}
          onMouseDown={(e) => {
            e.currentTarget.style.cursor = 'grabbing';
            handleDragStart(e);
          }}
          onMouseMove={(e) => {
            if (isDragging) {
              e.currentTarget.style.cursor = 'grabbing';
            }
            handleDragMove(e);
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.cursor = 'grab';
            handleDragEnd();
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.cursor = 'grab';
            handleDragEnd();
          }}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          className="flex cursor-grab"
        >
          {gifs.map((gif) => (
            <div key={gif.id} className="w-full flex-shrink-0">
              <BentoBox className="aspect-[16/9] sm:aspect-[28/9] relative overflow-hidden group mx-2">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <img
                  src={gif.image}
                  alt={gif.title}
                  className="w-full h-full object-cover transform-gpu transition-all duration-700
                    scale-105 group-hover:scale-100 brightness-[0.85] group-hover:brightness-100"
                />
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="text-center transform-gpu transition-all duration-500 group-hover:translate-y-[-8px]">
                    <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2 sm:mb-4">{gif.title}</h2>
                    <p className="text-sm sm:text-base text-white/80 max-w-lg mx-auto px-4">
                      {gif.description}
                    </p>
                  </div>
                </div>
              </BentoBox>
            </div>
          ))}
        </animated.div>

        {/* Navigation Buttons */}
        <button
          onClick={() => navigate('prev')}
          className={`absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/50 text-white
            transition-all duration-200 backdrop-blur-sm ${
              currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black/70 hover:scale-110'
            }`}
          disabled={currentIndex === 0}
        >
          <ChevronLeft size={24} />
        </button>
        
        <button
          onClick={() => navigate('next')}
          className={`absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/50 text-white
            transition-all duration-200 backdrop-blur-sm ${
              currentIndex === gifs.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black/70 hover:scale-110'
            }`}
          disabled={currentIndex === gifs.length - 1}
        >
          <ChevronRight size={24} />
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {gifs.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/70 backdrop-blur-sm hover:scale-110'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};