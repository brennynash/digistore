// Performance monitoring and optimization utilities
export const measurePerformance = () => {
  if (typeof window === 'undefined') return null;
  
  const timing = window.performance.timing;
  const interactive = timing.domInteractive - timing.navigationStart;
  const dcl = timing.domContentLoadedEventEnd - timing.navigationStart;
  const complete = timing.loadEventEnd - timing.navigationStart;
  
  return {
    timeToInteractive: interactive,
    domContentLoaded: dcl,
    loadComplete: complete,
  };
};

export const imageOptimizer = (url: string, width?: number, quality = 80): string => {
  if (!url) return '';
  
  // Only optimize image URLs from supported domains
  if (!url.includes('images.unsplash.com')) return url;
  
  const params = new URLSearchParams();
  if (width) params.append('w', width.toString());
  params.append('q', quality.toString());
  params.append('auto', 'format');
  params.append('fit', 'crop');
  
  return `${url}?${params.toString()}`;
};