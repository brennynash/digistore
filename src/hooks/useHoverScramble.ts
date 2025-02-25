import { useState, useCallback } from 'react';

export const useHoverScramble = () => {
  const [scramble, setScramble] = useState(false);

  const triggerScramble = useCallback(() => {
    setScramble(true);
    setTimeout(() => setScramble(false), 1000);
  }, []);

  return { scramble, triggerScramble };
};