'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Users, Maximize, Bed, Check, MessageCircle } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface Room {
  id: number; name: string; type: string; price: number; capacity: number;
  size: string; bed: string; available: boolean; image: string;
  amenities: string[]; description: string;
}

const FILTERS = ['All', 'Standard', 'Deluxe', 'Suite', 'Premium'];

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filter, setFilter] = useState('All');

  useScrollReveal();

  useEffect(() => { fetch('/db.json').then(r => r.json()).then((d: { rooms: Room[] }) => setRooms(d.rooms)); }, []);

  const filtered = filter === 'All' ? rooms : rooms.filter(r => r.type === filter.toLowerCase());

  return (
    <>
      {/* Page Hero */}
      <section style={{ position: 'relative', height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <Image src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1800" alt="Rooms" fill style={{ objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(13,27,42,0.75)' }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <p style={{ color: '#a38057', fontSize: '0.7rem', letterSpacing: '0.3em', fontFamily: 'var(--font-sans)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Accommodation</p>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 400, color: '#f5f0e8' }}>Rooms & Suites</h1>
          <div className="gold-divider" style={{ marginTop: '1rem' }} />
        </div>
      </section>

      {/* Filters */}
      <section style={{ background: '#0a1520', padding: '1.5rem 0', borderBottom: '1px solid rgba(163,128,87,0.15)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{
            display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center',
            background: 'rgba(255,255,255,0.03)', borderRadius: '4px', padding: '0.75rem 1rem',
          }}>
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                background: filter === f ? 'linear-gradient(135deg,#a38057,#b8956b)' : 'transparent',
                border: '1px solid rgba(163,128,87,0.4)', color: filter === f ? '#0d1b2a' : '#b8956b',
                padding: '0.5rem 1.75rem', cursor: 'pointer', fontSize: '0.72rem',
                letterSpacing: '0.12em', fontFamily: 'var(--font-sans)', fontWeight: 600,
                textTransform: 'uppercase', transition: 'all 0.25s ease',
                borderRadius: '2rem',
              }}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="section-pad" style={{ background: '#0d1b2a' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', gap: '2rem' }}>
            {filtered.map(room => (
              <div key={room.id} className="card-hover reveal" style={{ background: '#162032', border: '1px solid rgba(163,128,87,0.15)', overflow: 'hidden' }}>
                <div style={{ position: 'relative', height: '240px' }}>
                  <Image src={room.image} alt={room.name} fill style={{ objectFit: 'cover' }} />
                  {/* Gradient overlay with type badge */}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,27,42,0.7) 0%, transparent 55%)', zIndex: 1 }} />
                  <div style={{ position: 'absolute', bottom: '0.75rem', left: '1rem', zIndex: 2, background: 'rgba(13,27,42,0.85)', border: '1px solid rgba(163,128,87,0.4)', color: '#b8956b', fontSize: '0.65rem', padding: '0.3rem 0.8rem', fontFamily: 'var(--font-sans)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {room.type}
                  </div>
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 2, background: room.available ? 'rgba(34,139,34,0.85)' : 'rgba(180,50,50,0.85)', color: '#fff', fontSize: '0.65rem', padding: '0.3rem 0.8rem', fontFamily: 'var(--font-sans)', fontWeight: 700 }}>
                    {room.available ? '✓ Available' : '✗ Booked'}
                  </div>
                </div>
                <div style={{ padding: '1.75rem' }}>
                  <h3 style={{ color: '#cda882', fontSize: '1.2rem', fontWeight: 400, marginBottom: '0.75rem' }}>{room.name}</h3>
                  <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem' }}>
                    <span style={{ color: '#8a9ab0', fontSize: '0.8rem', fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Users size={13} /> {room.capacity} Guests
                    </span>
                    <span style={{ color: '#8a9ab0', fontSize: '0.8rem', fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Maximize size={13} /> {room.size}
                    </span>
                    <span style={{ color: '#8a9ab0', fontSize: '0.8rem', fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Bed size={13} /> {room.bed}
                    </span>
                  </div>
                  <p style={{ color: '#8a9ab0', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>{room.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.5rem' }}>
                    {room.amenities.slice(0, 5).map(a => (
                      <span key={a} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#8a9ab0', fontSize: '0.72rem', fontFamily: 'var(--font-sans)' }}>
                        <Check size={11} color="#a38057" /> {a}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid rgba(163,128,87,0.1)' }}>
                    <div>
                      <span style={{ color: '#b8956b', fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-sans)' }}>
                        PKR {room.price.toLocaleString()}
                      </span>
                      <span style={{ color: '#8a9ab0', fontSize: '0.75rem', fontFamily: 'var(--font-sans)' }}>/night</span>
                    </div>
                    {room.available ? (
                      <a
                        href={`https://wa.me/923111234567?text=${encodeURIComponent(`Hi! I'd like to book the ${room.name} (PKR ${room.price.toLocaleString()}/night). Please confirm availability.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-gold"
                        style={{ fontSize: '0.7rem', padding: '0.6rem 1.3rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                      >
                        <MessageCircle size={12} /> Book Now
                      </a>
                    ) : (
                      <span className="btn-gold" style={{ fontSize: '0.7rem', padding: '0.6rem 1.3rem', opacity: 0.45, cursor: 'not-allowed' }}>Unavailable</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}