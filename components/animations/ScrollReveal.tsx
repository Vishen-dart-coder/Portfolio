'use client';

import { useEffect, useRef } from 'react';
import { revealOnScroll } from '@/lib/animations';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function ScrollReveal({ children, delay = 0, className }: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const animation = revealOnScroll(elementRef.current, {
      delay: delay > 0 ? delay : undefined,
    });

    return () => {
      animation.kill();
    };
  }, [delay]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
