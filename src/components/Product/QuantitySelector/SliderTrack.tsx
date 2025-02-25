import React, { useRef } from 'react';
import { motion } from '@react-spring/web';

interface SliderTrackProps {
  value: number;
  steps: number[];
  onChange: (value: number) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
  children: React.ReactNode;
}

export const SliderTrack = ({
  value,
  steps,
  onChange,
  onDragStart,
  onDragEnd,
  children
}: SliderTrackProps) => {
  const max = steps[steps.length - 1];
  const percentage = (value / max) * 100;
  const trackRef = useRef<HTMLDivElement>(null);

  const getClosestStep = (percentage: number) => {
    const targetValue = (percentage * max);
    // Round to nearest 10
    return Math.round(targetValue / 10) * 10;
  };

  const handleInteraction = (clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    onChange(getClosestStep(percentage));
  };

  return (
    <div 
      ref={trackRef}
      className="relative h-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
      role="slider"
      aria-valuemin={steps[0]}
      aria-valuemax={steps[steps.length - 1]}
      aria-valuenow={value}
      tabIndex={0}
      onKeyDown={(e) => {
        const step = 10;
        if (e.key === 'ArrowRight') {
          onChange(Math.min(max, value + step));
        } else if (e.key === 'ArrowLeft') {
          onChange(Math.max(0, value - step));
        }
      }}
      onMouseDown={(e) => {
        onDragStart();
        handleInteraction(e.clientX);
        
        const handleMouseMove = (e: MouseEvent) => {
          handleInteraction(e.clientX);
        };
        
        const handleMouseUp = () => {
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('mouseup', handleMouseUp);
          onDragEnd();
        };
        
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
      }}
      onTouchStart={(e) => {
        onDragStart();
        handleInteraction(e.touches[0].clientX);
        
        const handleTouchMove = (e: TouchEvent) => {
          handleInteraction(e.touches[0].clientX);
        };
        
        const handleTouchEnd = () => {
          window.removeEventListener('touchmove', handleTouchMove);
          window.removeEventListener('touchend', handleTouchEnd);
          onDragEnd();
        };
        
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchend', handleTouchEnd);
      }}
    >
      <div 
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-white/20 via-white/25 to-white/30 transition-all duration-150 rounded-full z-[1]"
        style={{ width: `${percentage}%` }}
      />

      {/* Show major step markers (every 100) */}
      {steps.filter(step => step % 100 === 0).map((step) => (
        <div
          key={step}
          className="absolute top-1/2 -translate-y-1/2 w-0.5 h-4 bg-white/30 z-[1]"
          style={{ left: `${(step / max) * 100}%` }}
        />
      ))}
      
      {/* Show minor step markers (every 50) */}
      {steps.filter(step => step % 50 === 0 && step % 100 !== 0).map((step) => (
        <div
          key={step}
          className="absolute top-1/2 -translate-y-1/2 w-px h-2 bg-white/20 z-[1]"
          style={{ left: `${(step / max) * 100}%` }}
        />
      ))}
      
      <div
        className="absolute inset-y-0 z-[2]"
        style={{ left: `${percentage}%` }}
      >
        {children}
      </div>
    </div>
  );
};