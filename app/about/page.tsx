'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Mountain, Heart, Shield, Star } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function AboutPage() {
  useScrollReveal();

  const values = [
    { icon: <Mountain size={28} />, title: 'Mountain Soul', desc: 'Every corner of our hotel is designed to connect you with the raw beauty of the Himalayas.' },
    { icon: <Heart size={28} />, title: 'Genuine Hospitality', desc: 'Warmth and care are at the heart of everything we do — from check-in to checkout.' },
    { icon: <Shield size={28} />, title: 'Guest Safety', desc: 'Your safety is our priority. 24/7 security, mountain-weather monitoring, and emergency support.' },
    { icon: <Star size={28} />, title: 'Quality First', desc: 'From linens to local cuisine, we choose quality in every small detail of your stay.' },
  ];

  const team = [
    { name: 'Mr. Asif Malik', role: 'General Manager', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300' },
    { name: 'Ms. Huma Baig', role: 'Head Chef', img: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=300' },
    { name: 'Mr. Tariq Ahmed', role: 'Guest Relations', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300' },
  ];

  const stats = [
    { num: '12+', label: 'Years of Excellence' },
    { num: '5,000+', label: 'Happy Guests' },
    { num: '4.8★', label: 'Average Rating' },
    { num: '6', label: 'Room Categories' },
  ];

  return (
    <>
      {/* Hero */}
      <section style={{ position: 'relative', height: '55vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <Image src="https://images.unsplash.com/photo-1517840901100-8179e982acb7?w=1800" alt="About" fill style={{ objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(13,27,42,0.72)' }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <p style={{ color: '#a38057', fontSize: '0.7rem', letterSpacing: '0.3em', fontFamily: 'var(--font-sans)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Our Story</p>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 400, color: '#f5f0e8' }}>About Hotel One Plus</h1>
          <div className="gold-divider" style={{ marginTop: '1rem' }} />
        </div>
      </section>

      {/* Story */}
      <section className="section-pad" style={{ background: '#0d1b2a' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div className="reveal-left">
              <p style={{ color: '#a38057', fontSize: '0.7rem', letterSpacing: '0.3em', fontFamily: 'var(--font-sans)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Est. 2012</p>
              <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 400, color: '#f5f0e8', marginBottom: '1.5rem' }}>
                Born from the Mountains,<br />Built for Travelers
              </h2>
              <p style={{ color: '#8a9ab0', lineHeight: 1.9, marginBottom: '1.25rem', fontSize: '0.95rem' }}>
                Hotel One Plus was founded in 2012 with a singular vision: to offer travelers a luxury sanctuary in one of Pakistan's most breathtaking landscapes — the Naran Valley of Kaghan.
              </p>
              <p style={{ color: '#8a9ab0', lineHeight: 1.9, marginBottom: '1.25rem', fontSize: '0.95rem' }}>
                What started as a humble guesthouse has grown into a full-service boutique hotel with 6 room categories, a restaurant, spa, and a range of outdoor adventures — all while keeping the spirit of mountain warmth at its core.
              </p>
              <p style={{ color: '#8a9ab0', lineHeight: 1.9, fontSize: '0.95rem' }}>
                Today, we welcome families, honeymooners, trekkers, and corporate travelers from across Pakistan and beyond, offering each guest a tailor-made experience unlike anywhere else.
              </p>
            </div>
            <div className="reveal-right" style={{ position: 'relative' }}>
              <Image src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800" alt="Hotel" width={550} height={420} style={{ width: '100%', height: 'auto', display: 'block' }} />
              <div style={{ position: 'absolute', bottom: '-1.5rem', right: '-1.5rem', background: '#0a1520', border: '1px solid rgba(163,128,87,0.3)', padding: '1.5rem', maxWidth: '200px' }}>
                <div style={{ color: '#b8956b', fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-sans)' }}>8,200</div>
                <div style={{ color: '#8a9ab0', fontSize: '0.8rem', fontFamily: 'var(--font-sans)' }}>Feet above sea level</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: 'linear-gradient(135deg, #a38057 0%, #8a6420 100%)', padding: '3rem 2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem', textAlign: 'center' }}>
          {stats.map(s => (
            <div key={s.num} className="reveal">
              <div className="gold-shimmer" style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-sans)',
                /* override shimmer colors for dark-on-gold context */
                background: 'linear-gradient(90deg,#0d1b2a 0%,#2a1a00 40%,#4a3000 50%,#2a1a00 60%,#0d1b2a 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                backgroundSize: '200% auto', animation: 'shimmer 4s linear infinite',
              }}>{s.num}</div>
              <div style={{ color: 'rgba(13,27,42,0.75)', fontSize: '0.85rem', fontFamily: 'var(--font-sans)', letterSpacing: '0.05em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="section-pad" style={{ background: '#0a1520' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ color: '#a38057', fontSize: '0.7rem', letterSpacing: '0.3em', fontFamily: 'var(--font-sans)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>What We Stand For</p>
            <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 400, color: '#f5f0e8', marginBottom: '1rem' }}>Our Core Values</h2>
            <div className="gold-divider" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            {values.map((v, i) => (
              <div key={v.title} className={`reveal reveal-delay-${i+1}`} style={{ background: '#162032', border: '1px solid rgba(163,128,87,0.15)', padding: '2.5rem 2rem', textAlign: 'center' }}>
                <div style={{ color: '#a38057', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>{v.icon}</div>
                <h4 style={{ color: '#cda882', fontSize: '1.05rem', fontWeight: 400, marginBottom: '0.75rem' }}>{v.title}</h4>
                <p style={{ color: '#8a9ab0', fontSize: '0.88rem', lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-pad" style={{ background: '#0d1b2a' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p style={{ color: '#a38057', fontSize: '0.7rem', letterSpacing: '0.3em', fontFamily: 'var(--font-sans)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>The People Behind the Experience</p>
            <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 400, color: '#f5f0e8', marginBottom: '1rem' }}>Meet Our Team</h2>
            <div className="gold-divider" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            {team.map((m, i) => (
              <div key={m.name} className={`reveal reveal-delay-${i+1}`} style={{ textAlign: 'center' }}>
                <div style={{ position: 'relative', width: '140px', height: '140px', margin: '0 auto 1.25rem', borderRadius: '50%', overflow: 'hidden', border: '3px solid rgba(163,128,87,0.4)' }}>
                  <Image src={m.img} alt={m.name} fill style={{ objectFit: 'cover' }} />
                </div>
                <h4 style={{ color: '#cda882', fontSize: '1rem', fontWeight: 400, marginBottom: '0.3rem' }}>{m.name}</h4>
                <p style={{ color: '#8a9ab0', fontSize: '0.8rem', fontFamily: 'var(--font-sans)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#0a1520', borderTop: '1px solid rgba(163,128,87,0.2)', borderBottom: '1px solid rgba(163,128,87,0.2)', padding: '4rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.5rem)', fontWeight: 400, color: '#f5f0e8', marginBottom: '1rem' }}>Experience It Yourself</h2>
        <p style={{ color: '#8a9ab0', fontSize: '1rem', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
          Come stay with us and discover why thousands of guests return to Hotel One Plus every year.
        </p>
        <Link href="/rooms" className="btn-gold" style={{ textDecoration: 'none' }}>Book Your Stay</Link>
      </section>
    </>
  );
}