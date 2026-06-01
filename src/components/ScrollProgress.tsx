import { useEffect, useRef } from 'react';

const ScrollProgress: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.max(0, Math.min(100, (y / max) * 100)) : 0;
      el.style.width = pct + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 h-[2px] z-[100]"
      style={{
        width: '0%',
        background: 'linear-gradient(90deg, #10b981, #6ee7b7)',
        boxShadow: '0 0 12px rgba(52,211,153,0.22)',
        transition: 'width .15s linear',
      }}
    />
  );
};

export default ScrollProgress;
