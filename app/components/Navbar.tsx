'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, MessageCircle } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Rooms', href: '/rooms' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const navBg = scrolled || (isMobile && open)
    ? 'rgba(13,27,42,0.98)'
    : 'transparent';

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: navBg,
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(184,137,42,0.2)' : 'none',
      transition: 'all 0.4s ease',
    }}>
      {/* Top bar — constrained width */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none', minWidth: 0 }}>
            <Image
              src="/logo.jpeg"
              alt="Hotel One Plus"
              width={isMobile ? 38 : 48}
              height={isMobile ? 38 : 48}
              style={{ borderRadius: '4px', border: '1px solid rgba(184,137,42,0.3)', flexShrink: 0 }}
            />
            <div style={{ minWidth: 0 }}>
              <div style={{
                color: '#d4a84b',
                fontSize: isMobile ? '0.78rem' : '1rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                fontFamily: 'var(--font-sans)',
                whiteSpace: 'nowrap',
              }}>
                HOTEL ONE PLUS
              </div>
              {!isMobile && (
                <div style={{ color: '#8a9ab0', fontSize: '0.58rem', letterSpacing: '0.2em', fontFamily: 'var(--font-sans)', textTransform: 'uppercase' }}>
                  Naran Valley, Pakistan
                </div>
              )}
            </div>
          </Link>

          {/* Desktop Links */}
          {!isMobile && (
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              {navLinks.map(l => (
                <Link key={l.href} href={l.href} style={{
                  color: '#e8c97a', textDecoration: 'none', fontSize: '0.78rem',
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  fontFamily: 'var(--font-sans)', fontWeight: 600,
                  transition: 'color 0.2s', whiteSpace: 'nowrap',
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#e8c97a')}
                >
                  {l.label}
                </Link>
              ))}
              <a href="https://wa.me/923111234567" target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                color: '#0d1b2a', background: 'linear-gradient(135deg, #b8892a, #d4a84b)',
                padding: '0.5rem 1.2rem', textDecoration: 'none', fontSize: '0.75rem',
                letterSpacing: '0.06em', fontFamily: 'var(--font-sans)', fontWeight: 700,
                whiteSpace: 'nowrap',
              }}>
                <MessageCircle size={13} />
                Book Now
              </a>
            </div>
          )}

          {/* Mobile Hamburger */}
          {isMobile && (
            <button onClick={() => setOpen(v => !v)} style={{
              background: 'none', border: 'none', color: '#d4a84b',
              cursor: 'pointer', padding: '0.5rem', flexShrink: 0,
            }}>
              {open ? <X size={26} /> : <Menu size={26} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu — full width, outside the constrained container */}
      {isMobile && open && (
        <div style={{
          background: 'rgba(10,21,32,0.99)',
          borderTop: '1px solid rgba(184,137,42,0.2)',
          padding: '0.5rem 1.5rem 1.5rem',
          width: '100%',
        }}>
          {navLinks.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              display: 'block', color: '#e8c97a', textDecoration: 'none',
              padding: '1rem 0', fontSize: '0.88rem', letterSpacing: '0.12em',
              textTransform: 'uppercase', fontFamily: 'var(--font-sans)',
              borderBottom: '1px solid rgba(184,137,42,0.1)',
            }}>
              {l.label}
            </Link>
          ))}
          <a href="https://wa.me/923111234567" target="_blank" rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              color: '#0d1b2a', background: 'linear-gradient(135deg, #b8892a, #d4a84b)',
              padding: '0.85rem', textDecoration: 'none', fontSize: '0.82rem',
              fontFamily: 'var(--font-sans)', fontWeight: 700, marginTop: '1.25rem',
              width: '100%',
            }}>
            <MessageCircle size={15} />
            Book Now on WhatsApp
          </a>
        </div>
      )}
    </nav>
  );
}