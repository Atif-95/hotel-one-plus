'use client';
import { useEffect } from 'react';

export function useScrollReveal(deps: unknown[] = []) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    // Small delay so dynamically rendered elements are in the DOM
    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
        observer.observe(el);
      });
    }, 50);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}