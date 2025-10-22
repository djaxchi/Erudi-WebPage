import React, { useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

export const AnimatedOrb: React.FC = () => {
  // Use springs for smooth, physics-based following
  const springConfig = { damping: 30, stiffness: 50, mass: 1 };
  const mouseX = useMotionValue(75);
  const mouseY = useMotionValue(15);
  
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  
  // Transform to percentage strings
  const left = useTransform(x, (value) => `${value}%`);
  const top = useTransform(y, (value) => `${value}%`);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Convert mouse position to percentage of viewport
      const xPercent = (e.clientX / window.innerWidth) * 100;
      const yPercent = (e.clientY / window.innerHeight) * 100;
      
      mouseX.set(xPercent);
      mouseY.set(yPercent);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="absolute pointer-events-none inset-0"
      style={{
        overflow: 'visible',
      }}
    >
      <motion.div
        className="absolute"
        style={{
          width: '500px',
          height: '500px',
          left,
          top,
          x: '-50%',
          y: '-50%',
          pointerEvents: 'none',
        }}
      >
        {/* Main glow orb - very faint and concentrated */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(16, 185, 129, 0.06) 15%, rgba(16, 185, 129, 0.03) 30%, transparent 50%)',
            filter: 'blur(50px)',
          }}
        />
        
        {/* Core bright spot - very faint */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.08) 10%, rgba(16, 185, 129, 0.04) 20%, transparent 40%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Inner bright core - very faint and small */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(52, 211, 153, 0.18) 0%, rgba(16, 185, 129, 0.09) 20%, transparent 50%)',
            filter: 'blur(25px)',
          }}
        />
      </motion.div>
    </motion.div>
  );
};
