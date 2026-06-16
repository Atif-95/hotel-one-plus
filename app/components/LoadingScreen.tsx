'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';

    const t1 = setTimeout(() => setFading(true), 800);
    const t2 = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = '';
      window.scrollTo(0, 0);
    }, 1200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = '';
    };
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#060e16',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: fading ? 0 : 1,
      transition: 'opacity 0.4s ease',
      pointerEvents: fading ? 'none' : 'all',
    }}>
      <div style={{ animation: 'logoReveal 0.6s ease forwards', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Image src="/logo.jpeg" alt="Hotel One Plus" width={72} height={72}
          style={{ borderRadius: '8px', border: '1px solid rgba(163,128,87,0.4)', marginBottom: '1.25rem' }} />
        <div style={{ color: '#b8956b', fontSize: '0.75rem', letterSpacing: '0.35em', fontFamily: 'var(--font-sans)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
          HOTEL ONE PLUS
        </div>
        <div style={{ color: '#8a9ab0', fontSize: '0.6rem', letterSpacing: '0.2em', fontFamily: 'var(--font-sans)', marginBottom: '1.5rem' }}>
          NARAN VALLEY, PAKISTAN
        </div>
        <div style={{ width: '160px', height: '1px', background: 'rgba(163,128,87,0.2)', borderRadius: '1px', overflow: 'hidden' }}>
          <div style={{ height: '100%', background: 'linear-gradient(90deg, #a38057, #cda882)', animation: 'barGrow 0.7s ease forwards' }} />
        </div>
      </div>
    </div>
  );
}