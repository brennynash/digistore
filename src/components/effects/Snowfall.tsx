import React, { useEffect } from 'react';
import { useThemeContext } from '../../context/ThemeContext';

export const Snowfall = () => {
  const { currentTheme } = useThemeContext();

  useEffect(() => {
    if (currentTheme !== 'christmas') return;

    // Create snowflakes
    const createSnowflake = () => {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      snowflake.style.left = Math.random() * 100 + 'vw';
      snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
      snowflake.style.opacity = Math.random().toString();
      snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
      snowflake.innerHTML = '❄';
      return snowflake;
    };

    // Add snowflakes periodically
    const addSnowflake = () => {
      const snowflake = createSnowflake();
      document.body.appendChild(snowflake);

      // Remove snowflake after animation
      snowflake.addEventListener('animationend', () => {
        snowflake.remove();
      });
    };

    const interval = setInterval(addSnowflake, 200);

    return () => {
      clearInterval(interval);
      // Clean up existing snowflakes
      document.querySelectorAll('.snowflake').forEach(flake => flake.remove());
    };
  }, [currentTheme]);

  if (currentTheme !== 'christmas') return null;

  return null; // Component doesn't render anything directly
};