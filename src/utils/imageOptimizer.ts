interface ImageOptions {
  width?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
}

export const optimizeImage = (url: string, options: ImageOptions = {}): string => {
  if (!url) return '';
  
  // Only optimize images from supported domains
  if (!url.includes('images.unsplash.com')) return url;
  
  const params = new URLSearchParams();
  
  if (options.width) {
    params.append('w', options.width.toString());
  }
  
  if (options.quality) {
    params.append('q', options.quality.toString());
  }
  
  params.append('fm', options.format || 'webp');
  params.append('auto', 'format,compress');
  params.append('fit', 'crop');
  
  return `${url}?${params.toString()}`;
};

export const generateSrcSet = (url: string, sizes: number[]): string => {
  return sizes
    .map(size => `${optimizeImage(url, { width: size })} ${size}w`)
    .join(', ');
};

export const LazyImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}> = ({ src, alt, className, sizes = '100vw' }) => {
  const srcSet = generateSrcSet(src, [400, 800, 1200]);
  
  return (
    <img
      src={optimizeImage(src)}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
    />
  );
};