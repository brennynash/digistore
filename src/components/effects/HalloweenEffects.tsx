import React, { useEffect } from 'react';
import { useThemeContext } from '../../context/ThemeContext';

export const HalloweenEffects = () => {
  const { currentTheme } = useThemeContext();

  useEffect(() => {
    if (currentTheme !== 'halloween') return;

    const createSpookyElement = (type: 'spider' | 'pumpkin' | 'skull') => {
      const element = document.createElement('div');
      element.className = `halloween-${type}`;
      // Random position on screen
      element.style.left = Math.random() * 90 + 5 + 'vw';
      element.style.top = Math.random() * 90 + 5 + 'vh';
      element.style.animationDuration = Math.random() * 2 + 2 + 's';
      element.style.opacity = (Math.random() * 0.5 + 0.5).toString();
      element.style.fontSize = Math.random() * 10 + 20 + 'px';
      element.innerHTML = type === 'spider' ? '🕷️' : type === 'pumpkin' ? '🎃' : '💀';
      return element;
    };

    const addElement = () => {
      const rand = Math.random();
      const type = rand > 0.6 ? 'pumpkin' : rand > 0.3 ? 'spider' : 'skull';
      const element = createSpookyElement(type);
      document.body.appendChild(element);

      element.addEventListener('animationend', () => {
        element.remove();
      });
    };

    const interval = setInterval(addElement, 500);

    return () => {
      clearInterval(interval);
      document.querySelectorAll('.halloween-spider, .halloween-pumpkin, .halloween-skull')
        .forEach(el => el.remove());
    };
  }, [currentTheme]);

  return null;
};