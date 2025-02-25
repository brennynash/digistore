import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useSpring, animated, config } from '@react-spring/web';
import confetti from 'canvas-confetti';

interface AddToCartButtonProps {
  quantity: number;
  hasInteracted: boolean;
  onClick: () => void;
  inStock: boolean;
}

export const AddToCartButton = ({
  quantity,
  hasInteracted,
  inStock,
  onClick
}: AddToCartButtonProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const buttonSpring = useSpring({
    scale: isClicked ? 0.95 : 1,
    config: config.wobbly
  });

  const iconSpring = useSpring({
    rotate: isClicked ? 360 : 0,
    config: { tension: 300, friction: 10 }
  });

  const textSpring = useSpring({
    opacity: isClicked ? 0 : 1,
    transform: isClicked ? 'translateY(20px)' : 'translateY(0px)',
    config: { tension: 300, friction: 20 }
  });

  const emojiSpring = useSpring({
    opacity: isClicked ? 1 : 0,
    transform: isClicked ? 'translateY(0px)' : 'translateY(-20px)',
    config: { tension: 300, friction: 20 }
  });

  const maskSpring = useSpring({
    maskPosition: isHovered ? '100% 0' : '0% 0',
    config: { tension: 120, friction: 14 }
  });

  const handleClick = () => {
    if (quantity === 0) return;

    setIsClicked(true);

    confetti({
      particleCount: 30,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#646cff', '#ffffff', '#9333ea'],
      ticks: 100,
      gravity: 1.2,
      scalar: 0.8,
      shapes: ['circle']
    });

    setTimeout(() => {
      setIsClicked(false);
      onClick();
    }, 600);
  };

  if (!inStock) {
    return (
      <div className="w-full py-2.5 rounded-lg font-medium glass-effect text-gray-400 cursor-not-allowed opacity-50 text-center">
        Out of Stock
      </div>
    );
  }

  return (
    <animated.div style={buttonSpring} className="w-full">
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={quantity === 0}
        className="relative w-full py-3 rounded-lg font-medium overflow-hidden btn btn-glitch"
        data-text={quantity > 0 ? 'Add to Cart' : 'Select Quantity'}
      >
        {/* SVG Mask Definition */}
        <svg width="0" height="0">
          <defs>
            <linearGradient id="buttonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#646cff', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#9333ea', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#646cff', stopOpacity: 1 }} />
            </linearGradient>
            <mask id="buttonMask">
              <animated.rect
                x="0"
                y="0"
                width="200%"
                height="100%"
                fill="url(#buttonGradient)"
                style={{
                  transform: maskSpring.maskPosition.to(
                    x => `translateX(-${x})`
                  )
                }}
              />
            </mask>
          </defs>
        </svg>

        {/* Base Layer */}
        <div className={`
          absolute inset-0 glass-effect
          ${quantity > 0 ? 'opacity-100 btn-shine' : 'opacity-50'}
        `} />

        {/* Masked Layer */}
        <animated.div
          className="absolute inset-0 bg-gradient-to-r from-[#646cff] via-[#9333ea] to-[#646cff]"
          style={{
            mask: 'url(#buttonMask)',
            WebkitMask: 'url(#buttonMask)',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
        />

        {/* Content */}
        <div className="relative flex items-center justify-center gap-3">
          <animated.div style={iconSpring}>

          </animated.div>

          <div className="relative h-6 overflow-hidden">
            <animated.span
              style={textSpring}
              className="absolute inset-0 flex items-center justify-center transform-gpu"
            >
              {quantity > 0 ? 'Add to Cart' : 'Select Quantity'}
            </animated.span>

            <animated.span
              style={emojiSpring}
              className="absolute inset-0 flex items-center justify-center text-xl transform-gpu"
            >
              ✨
            </animated.span>
          </div>
        </div>
      </button>
    </animated.div>
  );
};