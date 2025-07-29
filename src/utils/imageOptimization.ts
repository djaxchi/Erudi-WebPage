// Image optimization utilities for better performance

// Preload critical images
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject();
    img.src = src;
  });
};

// Preload multiple images
export const preloadImages = (srcs: string[]): Promise<void[]> => {
  return Promise.all(srcs.map(preloadImage));
};

// Critical images that should be preloaded
export const CRITICAL_IMAGES = [
    '/Erudi/images/erudi-logo.png',

  '/Erudi/images/youssefL.png',
  '/Erudi/images/YoussefC.png',
  '/Erudi/images/djalil.png',
  '/Erudi/images/rayan.png',
  '/Erudi/images/sami.png',
  '/Erudi/images/nabil.png',
  '/Erudi/images/about-us-image-1.png',
  '/Erudi/images/about-us-image-2.png',
  '/Erudi/images/about-us-image-3.png',
];

// Generate responsive image URLs based on screen size
export const getOptimizedImageSrc = (baseSrc: string, _width?: number) => {
  // In a real app, you might have different image sizes
  // For now, we'll return the original src
  return baseSrc;
};

// Check if image is in viewport and should be loaded
export const isImageInViewport = (element: HTMLImageElement): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};
