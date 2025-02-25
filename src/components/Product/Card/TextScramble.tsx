import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';

interface TextScrambleProps {
  text: string;
  scramble?: boolean;
  className?: string;
  delay?: number;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
const CHAR_DURATION = 50; // Duration per character rotation
const REVEAL_DELAY = 30; // Delay between starting each character's animation

export const TextScramble: React.FC<TextScrambleProps> = ({ 
  text, 
  scramble = false,
  className = '',
  delay = 0
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const getRandomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

  useEffect(() => {
    if (!scramble) {
      setDisplayText(text);
      setIsAnimating(false);
      return;
    }

    setIsAnimating(true);
    const finalText = text;
    const textArray = new Array(finalText.length).fill('');
    const timers: NodeJS.Timeout[] = [];

    // Start animation for each character with a delay
    finalText.split('').forEach((targetChar, index) => {
      let iterations = 0;
      const maxIterations = 10 + Math.random() * 10; // Random number of iterations

      // Start character animation after delay
      const startTimer = setTimeout(() => {
        const intervalId = setInterval(() => {
          iterations++;
          
          // Update this character
          textArray[index] = iterations >= maxIterations ? targetChar : getRandomChar();
          setDisplayText(textArray.join(''));

          // Stop when we reach target character
          if (iterations >= maxIterations) {
            clearInterval(intervalId);
            // Check if this was the last character
            if (index === finalText.length - 1) {
              setIsAnimating(false);
            }
          }
        }, CHAR_DURATION);

        timers.push(intervalId);
      }, delay + index * REVEAL_DELAY);

      timers.push(startTimer);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [text, scramble, delay]);

  return (
    <span 
      className={`
        inline-block font-mono
        ${isAnimating ? 'text-yellow-400' : ''}
        ${className}
      `}
    >
      {displayText}
    </span>
  );
};