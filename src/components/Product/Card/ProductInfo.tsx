import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSpring, animated } from '@react-spring/web';
import { TextScramble } from './TextScramble';
import { useHoverScramble } from '../../../hooks/useHoverScramble';
import { PriceDisplay } from '../PriceDisplay';
import { ProductQuantity } from '../ProductQuantity';
import { Product } from '../../../types';

interface ProductInfoProps {
  product: Product;
}

const getProductSections = (product: Product) => {
  switch (product.id) {
    case 'premium-streaming':
      return {
        description: 'Stream your favorite content in Ultra HD with our premium streaming service.',
        features: 'No ads • Multiple devices • Offline downloads • HDR content',
        details: '4K streaming • Dolby Atmos • 5 profiles • Unlimited viewing'
      };
    case 'music-plus':
      return {
        description: 'Enjoy millions of songs ad-free with high-quality audio streaming.',
        features: 'Hi-Fi quality • Lyrics • Custom playlists • Background play',
        details: 'Lossless audio • 90M+ songs • Offline mode • Cross-platform'
      };
    case 'family-entertainment':
      return {
        description: 'The perfect entertainment package for the whole family.',
        features: 'Kid-safe content • Parental controls • Educational shows',
        details: '7 profiles • Content filters • Learning hub • Family sharing'
      };
    case 'creative-suite-pro':
      return {
        description: 'Professional creative tools for designers and artists.',
        features: 'Advanced editing • Cloud storage • Pro templates • Plugins',
        details: 'All apps included • 1TB storage • Priority support'
      };
    case 'gaming-ultimate':
      return {
        description: 'Access hundreds of premium games with our ultimate gaming pass.',
        features: 'New releases • Cloud gaming • Exclusive content • Rewards',
        details: 'Day-one access • Online multiplayer • Monthly rewards'
      };
    case 'premium-bundle':
      return {
        description: 'Get the best value with our all-in-one premium bundle.',
        features: 'All services included • Priority support • VIP perks',
        details: 'Unlimited access • Premium support • Special events'
      };
    default:
      return {
        description: product.description,
        features: 'Premium quality digital product with instant delivery.',
        details: 'Secure access • Lifetime updates • Multiple devices'
      };
  }
};

const INFO_SECTIONS = [
  { id: 'description', label: 'Description' },
  { id: 'features', label: 'Features' },
  { id: 'details', label: 'Details' }
] as const;

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const { scramble, triggerScramble } = useHoverScramble();
  const autoSlideInterval = useRef<NodeJS.Timeout>();

  const slideProps = useSpring({
    transform: `translateX(-${currentSection * 100}%)`,
    config: { tension: 280, friction: 60 }
  });

  useEffect(() => {
    // Start auto-slide
    const startAutoSlide = () => {
      autoSlideInterval.current = setInterval(() => {
        if (!isPaused) {
          setCurrentSection(prev => 
            prev === INFO_SECTIONS.length - 1 ? 0 : prev + 1
          );
        }
      }, 3000); // Slide every 3 seconds
    };

    startAutoSlide();

    return () => {
      if (autoSlideInterval.current) {
        clearInterval(autoSlideInterval.current);
      }
    };
  }, [isPaused]);

  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    setStartX('touches' in e ? e.touches[0].clientX : e.clientX);
    setIsPaused(true);
  };

  const handleDragMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    
    const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const diff = startX - currentX;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentSection < INFO_SECTIONS.length - 1) {
        setCurrentSection(currentSection + 1);
        setIsDragging(false);
      } else if (diff < 0 && currentSection > 0) {
        setCurrentSection(currentSection - 1);
        setIsDragging(false);
      }
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  const navigate = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentSection > 0) {
      setCurrentSection(currentSection - 1);
      setIsPaused(true);
      setTimeout(() => setIsPaused(false), 5000); // Resume auto-slide after 5 seconds
    } else if (direction === 'next' && currentSection < INFO_SECTIONS.length - 1) {
      setCurrentSection(currentSection + 1);
      setIsPaused(true);
      setTimeout(() => setIsPaused(false), 5000); // Resume auto-slide after 5 seconds
    }
  };

  const renderContent = (section: string) => {
    const sections = getProductSections(product);
    switch (section) {
      case 'description':
        return sections.description;
      case 'features':
        return sections.features;
      case 'details':
        return sections.details;
      default:
        return sections.description;
    }
  };

  return (
    <div className="p-5 space-y-4 backdrop-blur-sm transform-gpu transition-all duration-700">
      <div className="transform-gpu transition-transform duration-500 group-hover:translate-y-[-4px]">
        <h3 className="text-xl font-bold text-white overflow-hidden product-title" data-text={product.title}>
          <TextScramble 
            text={product.title}
            className="product-title"
            scramble={scramble}
          />
        </h3>
        
        <div className="relative mt-2 overflow-hidden">
          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mb-2">
            {INFO_SECTIONS.map((section, index) => (
              <button
                key={section.id}
                onClick={() => setCurrentSection(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSection ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* Swipeable Content */}
          <animated.div
            className="flex cursor-grab"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={slideProps}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            {INFO_SECTIONS.map(section => (
              <div
                key={section.id}
                className="w-full flex-shrink-0 px-1"
                style={{ perspective: 1000 }}
              >
                <p className="text-white/60 text-sm min-h-[3rem] overflow-hidden">
                  <TextScramble 
                    text={renderContent(section.id)}
                    scramble={scramble}
                  />
                </p>
              </div>
            ))}
          </animated.div>

          {/* Navigation Buttons */}
          <button
            onClick={() => navigate('prev')}
            className={`absolute left-0 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/20 text-white/60
              transition-all duration-200 ${currentSection === 0 ? 'opacity-0' : 'hover:bg-black/40 hover:text-white'}`}
            disabled={currentSection === 0}
          >
            <ChevronLeft size={16} />
          </button>
          
          <button
            onClick={() => navigate('next')}
            className={`absolute right-0 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/20 text-white/60
              transition-all duration-200 ${currentSection === INFO_SECTIONS.length - 1 ? 'opacity-0' : 'hover:bg-black/40 hover:text-white'}`}
            disabled={currentSection === INFO_SECTIONS.length - 1}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      
      <div className="transform-gpu transition-transform duration-500 group-hover:translate-y-[-2px]">
        <ProductQuantity
          product={product}
          priceDisplay={
            <PriceDisplay
              productId={product.id}
              basePrice={product.price}
              quantity={0}
            />
          }
        />
      </div>
    </div>
  );
};