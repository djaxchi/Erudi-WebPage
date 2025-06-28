import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const screenshots = [
  '/images/erudi-1.png',
  '/images/erudi-2.png',
  '/images/erudi-3.png',
  '/images/erudi-4.png',
  '/images/erudi-5.png',
];

interface Props {
  current: number;
}

export const ScreenshotCarousel: React.FC<Props> = ({ current }) => {
  // Compute circular offset
  const offset = (idx: number) => {
    let d = idx - current;
    if (d < 0) d += screenshots.length;
    return d;
  };

  // Predefined “deck” styles for top 3 layers
  const layerStyles = [
    { x: 0,  y: 0,    scale: 1,   opacity: 1,   z: 30 },
    { x: 40, y: -20,  scale: 0.9, opacity: 0.9, z: 20 },
    { x: 80, y: -40,  scale: 0.8, opacity: 0.8, z: 10 },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-visible">
      <AnimatePresence initial={false}>
        {screenshots.map((src, idx) => {
          const d = offset(idx);
          if (d > 2) return null; // only render top 3

          const { x, y, scale, opacity, z } = layerStyles[d];

          return (
            <motion.div
              key={idx}
              initial={{ x, y, scale, opacity }}
              animate={{ x, y, scale, opacity }}
              exit={{
                y: 200,
                x: 0,
                opacity: 0,
                transition: { duration: 0.3},
              }}
              transition={{
                type: 'spring',
                stiffness: 80,     // lower stiffness for slower spring
                damping: 10,       // gentle damping
                delay: d * 0.1,    // cascade effect: each layer delayed slightly
              }}
              className="absolute w-[80%] max-w-lg rounded-2xl shadow-lg bg-[#272727]"
              style={{ zIndex: z }}
            >
              <img
                src={src}
                alt={`Erudi screenshot ${idx + 1}`}
                className="w-full h-auto object-cover rounded-xl"
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
