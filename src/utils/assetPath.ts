/**
 * Helper function to get the correct asset path based on the build environment
 * Works for both GitHub Pages (/Erudi/) and production (/)
 */
export const getAssetPath = (path: string): string => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Remove /Erudi/ prefix if present (for backward compatibility)
  const withoutBase = cleanPath.replace(/^Erudi\//, '');
  
  // Use Vite's BASE_URL which is set based on vite.config.ts
  return `${import.meta.env.BASE_URL}${withoutBase}`;
};
