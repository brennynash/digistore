import confetti from 'canvas-confetti';

export const useConfetti = () => {
  const triggerConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
        scalar: 1.2,
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#FFD700', '#E8E8E8', '#87CEEB'],
    });

    fire(0.2, {
      spread: 60,
      colors: ['#FFD700', '#E8E8E8', '#87CEEB'],
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ['#FFD700', '#E8E8E8', '#87CEEB'],
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: ['#FFD700', '#E8E8E8', '#87CEEB'],
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      colors: ['#FFD700', '#E8E8E8', '#87CEEB'],
    });
  };

  return { triggerConfetti };
};