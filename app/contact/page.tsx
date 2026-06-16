'use client';
import { useState } from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) { alert('Please fill in required fields.'); return; }
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const info = [
    { icon: <MapPin size={20} />, label: 'Address', value: 'Main Naran Road, Naran Valley, Kaghan, KPK, Pakistan' },
    { icon: <Phone size={20} />, label: 'Phone', value: '+92-311-1234567' },
    { icon: <MessageCircle size={20} />, label: 'WhatsApp', value: '+92-311-1234567' },
    { icon: <Mail size={20} />, label: 'Email', value: 'info@hoteloneplus.com' },
    { icon: <Clock size={20} />, label: 'Office Hours', value: 'Daily: 8:00 AM – 10:00 PM' },
  ];

  return (
    <>
      {/* Hero */}
      <section style={{ position: 'relative', height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <Image src="https://images.unsplash.com/photo-1517840901100-8179e982acb7?w=1800" alt="Contact" fill style={{ objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(13,27,42,0.75)' }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <p style={{ color: '#b8892a', fontSize: '0.7rem', letterSpacing: '0.3em', fontFamily: 'var(--font-sans)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Get in Touch</p>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 400, color: '#f5f0e8' }}>Contact Us</h1>
          <div className="gold-divider" style={{ marginTop: '1rem' }} />
        </div>
      </section>

      {/* Content */}
      <section className="section-pad" style={{ background: '#0d1b2a' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '4rem', alignItems: 'start' }}>

            {/* Info */}
            <div>
              <p style={{ color: '#b8892a', fontSize: '0.7rem', letterSpacing: '0.3em', fontFamily: 'var(--font-sans)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Reach Us</p>
              <h2 style={{ fontSize: '2rem', fontWeight: 400, color: '#f5f0e8', marginBottom: '1rem' }}>We're Here to Help</h2>
              <p style={{ color: '#8a9ab0', lineHeight: 1.8, marginBottom: '2.5rem', fontSize: '0.92rem' }}>
                Have questions about bookings, facilities, or activities? Our team is available daily to assist you. Reach us via phone, WhatsApp, or email — we typically respond within 2 hours.
              </p>

              {info.map(i => (
                <div key={i.label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(184,137,42,0.1)' }}>
                  <div style={{ color: '#b8892a', flexShrink: 0, marginTop: '2px' }}>{i.icon}</div>
                  <div>
                    <div style={{ color: '#d4a84b', fontSize: '0.7rem', letterSpacing: '0.15em', fontFamily: 'var(--font-sans)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{i.label}</div>
                    <div style={{ color: '#c8c0b0', fontSize: '0.92rem' }}>{i.value}</div>
                  </div>
                </div>
              ))}

              {/* WhatsApp CTA */}
              <a href="https://wa.me/923111234567" target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: '#25d366', color: '#ffffff', textDecoration: 'none',
                padding: '0.75rem 1.5rem', fontSize: '0.8rem', fontFamily: 'var(--font-sans)',
                fontWeight: 700, letterSpacing: '0.06em', marginTop: '0.5rem',
              }}>
                <MessageCircle size={16} /> Chat on WhatsApp
              </a>
            </div>

            {/* Form */}
            <div style={{ background: '#162032', border: '1px solid rgba(184,137,42,0.2)', padding: '2.5rem' }}>
              <h3 style={{ color: '#e8c97a', fontSize: '1.3rem', fontWeight: 400, marginBottom: '0.5rem' }}>Send a Message</h3>
              <p style={{ color: '#8a9ab0', fontSize: '0.85rem', marginBottom: '2rem' }}>Fill the form and we'll get back to you shortly.</p>

              {sent && (
                <div style={{ background: 'rgba(184,137,42,0.15)', border: '1px solid rgba(184,137,42,0.4)', color: '#e8c97a', padding: '1rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                  ✓ Message sent! We'll reply within 24 hours.
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,200px),1fr))', gap: '1rem', marginBottom: '1rem' }}>
                {[
                  { label: 'Full Name *', key: 'name', type: 'text', placeholder: 'Your name', col: 1 },
                  { label: 'Email *', key: 'email', type: 'email', placeholder: 'your@email.com', col: 1 },
                  { label: 'Phone', key: 'phone', type: 'tel', placeholder: '+92-xxx-xxxxxxx', col: 1 },
                  { label: 'Subject', key: 'subject', type: 'text', placeholder: 'Booking inquiry...', col: 1 },
                ].map(f => (
                  <div key={f.key} style={{ gridColumn: 'span 1' }}>
                    <label style={{ display: 'block', color: '#d4a84b', fontSize: '0.65rem', letterSpacing: '0.15em', fontFamily: 'var(--font-sans)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder} value={(form as Record<string, string>)[f.key]}
                      onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(184,137,42,0.3)', color: '#f5f0e8', padding: '0.7rem 1rem', fontSize: '0.9rem', outline: 'none' }}
                    />
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', color: '#d4a84b', fontSize: '0.65rem', letterSpacing: '0.15em', fontFamily: 'var(--font-sans)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>Message *</label>
                <textarea rows={5} placeholder="Tell us how we can help you..." value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(184,137,42,0.3)', color: '#f5f0e8', padding: '0.7rem 1rem', fontSize: '0.9rem', outline: 'none', resize: 'vertical', fontFamily: 'var(--font-serif)' }}
                />
              </div>

              <button className="btn-gold" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                onClick={handleSubmit}>
                <Send size={14} /> Send Message
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Map embed placeholder */}
      <section style={{ background: '#0a1520', padding: '0' }}>
        <div style={{ width: '100%', height: '350px', background: '#162032', border: '1px solid rgba(184,137,42,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
          <MapPin size={40} color="#b8892a" />
          <p style={{ color: '#e8c97a', fontSize: '1rem' }}>Naran Valley, Kaghan, KPK</p>
          <p style={{ color: '#8a9ab0', fontSize: '0.85rem', fontFamily: 'var(--font-sans)' }}>Coordinates: 34.9°N 73.65°E</p>
          <a href="https://maps.google.com/?q=Naran+Valley+KPK+Pakistan" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ textDecoration: 'none', marginTop: '0.5rem' }}>
            Open in Google Maps
          </a>
        </div>
      </section>
    </>
  );
}
