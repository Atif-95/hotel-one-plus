'use client';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      background: '#060e16',
      borderTop: '1px solid rgba(163,128,87,0.2)',
      padding: '4rem 0 0',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '3rem', paddingBottom: '3rem' }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <Image src="/logo.jpeg" alt="Hotel One Plus" width={48} height={48} style={{ borderRadius: '4px' }} />
              <div>
                <div style={{ color: '#b8956b', fontWeight: 700, letterSpacing: '0.1em', fontFamily: 'var(--font-sans)', fontSize: '0.95rem' }}>HOTEL ONE PLUS</div>
                <div style={{ color: '#8a9ab0', fontSize: '0.65rem', letterSpacing: '0.15em', fontFamily: 'var(--font-sans)' }}>NARAN VALLEY</div>
              </div>
            </div>
            <p style={{ color: '#8a9ab0', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              Where the mountains meet luxury. Experience the finest hospitality in the heart of Naran Valley at 8,200 feet.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                {
                  label: 'Facebook', href: '#',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  ),
                },
                {
                  label: 'Instagram', href: '#',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                    </svg>
                  ),
                },
                {
                  label: 'WhatsApp', href: 'https://wa.me/923111234567',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                    </svg>
                  ),
                },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                  width: '38px', height: '38px', border: '1px solid rgba(163,128,87,0.4)',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#b8956b', textDecoration: 'none', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#a38057'; e.currentTarget.style.color = '#0d1b2a'; e.currentTarget.style.borderColor = '#a38057'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#b8956b'; e.currentTarget.style.borderColor = 'rgba(163,128,87,0.4)'; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#b8956b', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-sans)', marginBottom: '1.5rem' }}>
              Quick Links
            </h4>
            {[
              { label: 'Home', href: '/' },
              { label: 'Our Rooms', href: '/rooms' },
              { label: 'Gallery', href: '/gallery' },
              { label: 'About Us', href: '/about' },
              { label: 'Contact', href: '/contact' },
            ].map(l => (
              <Link key={l.href} href={l.href} style={{
                display: 'block', color: '#8a9ab0', textDecoration: 'none',
                fontSize: '0.9rem', marginBottom: '0.6rem', transition: 'color 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = '#cda882')}
                onMouseLeave={e => (e.currentTarget.style.color = '#8a9ab0')}
              >
                — {l.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#b8956b', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-sans)', marginBottom: '1.5rem' }}>
              Contact Us
            </h4>
            {[
              { icon: <MapPin size={14} />, text: 'Main Naran Road, Naran Valley, KPK, Pakistan' },
              { icon: <Phone size={14} />, text: '+92-311-1234567' },
              { icon: <Mail size={14} />, text: 'info@hoteloneplus.com' },
              { icon: <Clock size={14} />, text: 'Check-in: 12PM | Check-out: 11AM' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', alignItems: 'flex-start' }}>
                <span style={{ color: '#a38057', marginTop: '3px', flexShrink: 0 }}>{item.icon}</span>
                <span style={{ color: '#8a9ab0', fontSize: '0.88rem', lineHeight: 1.5 }}>{item.text}</span>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ color: '#b8956b', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-sans)', marginBottom: '1.5rem' }}>
              Stay Updated
            </h4>
            <p style={{ color: '#8a9ab0', fontSize: '0.88rem', marginBottom: '1rem', lineHeight: 1.6 }}>
              Subscribe for seasonal offers and travel tips for Naran Valley.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <input type="email" placeholder="Your email address" style={{
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(163,128,87,0.3)',
                color: '#f5f0e8', padding: '0.7rem 1rem', fontSize: '0.85rem',
                outline: 'none', width: '100%',
              }} />
              <button className="btn-gold" style={{ width: '100%' }}>Subscribe</button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(163,128,87,0.15)',
          padding: '1.5rem 0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '0.5rem',
        }}>
          <p style={{ color: '#8a9ab0', fontSize: '0.8rem', fontFamily: 'var(--font-sans)' }}>
            © 2024 Hotel One Plus. All rights reserved.
          </p>
          <p style={{ color: '#8a9ab0', fontSize: '0.8rem', fontFamily: 'var(--font-sans)' }}>
            Naran Valley, Kaghan | KPK, Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
}
