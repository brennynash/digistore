import React, { useEffect, useState } from 'react';
import { useThemeContext } from '../../context/ThemeContext';

export const LightEffects = () => {
  const { currentTheme } = useThemeContext();
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (currentTheme !== 'light' || !isActive) return;

    const maxElements = 10; // Maximum number of elements at a time
    let elementCount = 0;

    const createFloatingElement = (type: 'diamond' | 'balloon') => {
      if (elementCount >= maxElements) return;

      const element = document.createElement('div');
      element.className = `light-${type}`;
      element.style.left = Math.random() * 100 + 'vw';
      element.style.top = '0';
      element.style.animationDuration = Math.random() * 4 + 3 + 's';
      element.style.opacity = (Math.random() * 0.3 + 0.2).toString();
      element.style.fontSize = Math.random() * 15 + 20 + 'px';
      element.innerHTML = type === 'diamond' ? '💎' : '🎈';
      elementCount++;
      return element;
    };

    const addElement = () => {
      if (!isActive) return;
      if (elementCount >= maxElements) return;

      const type = Math.random() > 0.6 ? 'balloon' : 'diamond';
      const element = createFloatingElement(type);
      if (element) {
        document.body.appendChild(element);
        element.addEventListener('animationend', () => {
          element.remove();
          elementCount--;
        });
      }
    };

    const interval = setInterval(addElement, 800); // Slower interval

    // Clean up function
    return () => {
      clearInterval(interval);
      setIsActive(false);
      document.querySelectorAll('.light-diamond, .light-balloon')
        .forEach(el => el.remove());
    };
  }, [currentTheme, isActive]);

  return null;
};