import { NewsSettings } from '../types/news';
import { DEFAULT_NEWS_SETTINGS } from '../constants/newsSettings';

export const validateNewsSettings = (saved: any): NewsSettings => {
  try {
    return {
      ...DEFAULT_NEWS_SETTINGS,
      ...saved,
      marquee: {
        ...DEFAULT_NEWS_SETTINGS.marquee,
        ...saved?.marquee,
        animation: {
          ...DEFAULT_NEWS_SETTINGS.marquee.animation,
          ...saved?.marquee?.animation
        },
        responsive: {
          ...DEFAULT_NEWS_SETTINGS.marquee.responsive,
          ...saved?.marquee?.responsive
        }
      }
    };
  } catch (error) {
    console.error('Invalid news settings found, using defaults', error);
    return DEFAULT_NEWS_SETTINGS;
  }
};