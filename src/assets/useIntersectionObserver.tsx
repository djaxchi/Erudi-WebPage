import { useEffect, useRef, useState } from 'react';

// Intersection Observer hook
export const useIntersectionObserver = (options = {}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        obs.disconnect();
      }
    }, { threshold: 0.15, ...options });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [options]);
  return [ref, visible];
};