'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryItem { id: number; url: string; caption: string; category: string; }

const CATS = ['All', 'Scenery', 'Hotel', 'Rooms', 'Dining', 'Activities'];

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [cat, setCat] = useState('All');
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => { fetch('/db.json').then(r => r.json()).then((d: { gallery: GalleryItem[] }) => setGallery(d.gallery)); }, []);

  const filtered = cat === 'All' ? gallery : gallery.filter(g => g.category === cat.toLowerCase());
  const current = lightbox !== null ? filtered[lightbox] : null;

  const prev = () => setLightbox(l => l !== null ? (l - 1 + filtered.length) % filtered.length : null);
  const next = () => setLightbox(l => l !== null ? (l + 1) % filtered.length : null);

  return (
    <>
      {/* Hero */}
      <section style={{ position: 'relative', height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <Image src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1800" alt="Gallery" fill style={{ objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(13,27,42,0.72)' }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <p style={{ color: '#a38057', fontSize: '0.7rem', letterSpacing: '0.3em', fontFamily: 'var(--font-sans)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Visual Journey</p>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 400, color: '#f5f0e8' }}>Photo Gallery</h1>
          <div className="gold-divider" style={{ marginTop: '1rem' }} />
        </div>
      </section>

      {/* Category filter */}
      <section style={{ background: '#0a1520', padding: '1.5rem 0', borderBottom: '1px solid rgba(163,128,87,0.15)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              background: cat === c ? 'linear-gradient(135deg,#a38057,#b8956b)' : 'transparent',
              border: '1px solid rgba(163,128,87,0.4)', color: cat === c ? '#0d1b2a' : '#b8956b',
              padding: '0.5rem 1.75rem', cursor: 'pointer', fontSize: '0.72rem',
              letterSpacing: '0.12em', fontFamily: 'var(--font-sans)', fontWeight: 600,
              textTransform: 'uppercase', transition: 'all 0.25s ease',
              borderRadius: '2rem',
            }}>{c}</button>
          ))}
        </div>
      </section>

      {/* Masonry grid */}
      <section className="section-pad" style={{ background: '#0d1b2a' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ columns: '2 280px', gap: '1rem' }}>
            {filtered.map((item, idx) => (
              <div key={item.id} style={{ breakInside: 'avoid', marginBottom: '1rem', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
                onClick={() => setLightbox(idx)}
                className="card-hover"
              >
                <Image src={item.url} alt={item.caption} width={600} height={400}
                  style={{ width: '100%', height: 'auto', display: 'block', transition: 'transform 0.4s' }}
                />
                <div style={{
                  position: 'absolute', inset: 0, background: 'rgba(13,27,42,0)',
                  transition: 'background 0.3s', display: 'flex', alignItems: 'flex-end',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(13,27,42,0.55)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(13,27,42,0)'; }}
                >
                  <div style={{ padding: '1rem', opacity: 0, transition: 'opacity 0.3s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget.parentElement as HTMLElement).style.background = 'rgba(13,27,42,0.55)'; }}
                  >
                    <p style={{ color: '#f5f0e8', fontSize: '0.85rem', fontWeight: 600 }}>{item.caption}</p>
                    <p style={{ color: '#b8956b', fontSize: '0.7rem', letterSpacing: '0.1em', fontFamily: 'var(--font-sans)', textTransform: 'uppercase' }}>{item.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {current && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setLightbox(null)}
        >
          <button onClick={e => { e.stopPropagation(); prev(); }} style={{ position: 'absolute', left: '1rem', background: 'rgba(163,128,87,0.2)', border: '1px solid rgba(163,128,87,0.4)', color: '#b8956b', padding: '0.75rem', cursor: 'pointer' }}>
            <ChevronLeft size={24} />
          </button>
          <div style={{ maxWidth: '80vw', maxHeight: '80vh', position: 'relative' }} onClick={e => e.stopPropagation()}>
            <Image src={current.url} alt={current.caption} width={1200} height={800}
              style={{ maxWidth: '80vw', maxHeight: '75vh', objectFit: 'contain' }}
            />
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <p style={{ color: '#f5f0e8', fontSize: '1rem' }}>{current.caption}</p>
              <p style={{ color: '#a38057', fontSize: '0.75rem', letterSpacing: '0.15em', fontFamily: 'var(--font-sans)', textTransform: 'uppercase' }}>{current.category}</p>
            </div>
          </div>
          <button onClick={e => { e.stopPropagation(); next(); }} style={{ position: 'absolute', right: '1rem', background: 'rgba(163,128,87,0.2)', border: '1px solid rgba(163,128,87,0.4)', color: '#b8956b', padding: '0.75rem', cursor: 'pointer' }}>
            <ChevronRight size={24} />
          </button>
          <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: '1px solid rgba(163,128,87,0.4)', color: '#b8956b', padding: '0.5rem', cursor: 'pointer' }}>
            <X size={20} />
          </button>
          <p style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)', color: '#8a9ab0', fontSize: '0.8rem', fontFamily: 'var(--font-sans)' }}>
            {(lightbox ?? 0) + 1} / {filtered.length}
          </p>
        </div>
      )}
    </>
  );
}
