import { TitleSize } from '../types';

export const useResponsiveTitle = (size: TitleSize) => {
  const sizes = {
    small: {
      title: 'text-3xl sm:text-4xl',
      subtitle: 'text-base sm:text-lg'
    },
    default: {
      title: 'text-4xl sm:text-5xl',
      subtitle: 'text-lg sm:text-xl'
    },
    large: {
      title: 'text-5xl sm:text-6xl',
      subtitle: 'text-xl sm:text-2xl'
    }
  };

  return {
    titleSize: sizes[size].title,
    subtitleSize: sizes[size].subtitle
  };
};