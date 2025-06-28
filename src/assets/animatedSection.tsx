import { useIntersectionObserver } from './useIntersectionObserver';    

// Animated reveal
export const AnimatedSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const [ref, visible] = useIntersectionObserver();
  return (
    <div
      ref={typeof ref === 'boolean' ? undefined : ref}
      className={`transform transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};