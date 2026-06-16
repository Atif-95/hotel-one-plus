'use client';
import { useState } from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      {/* Tooltip */}
      <div style={{
        background: '#0d1f0f',
        border: '1px solid rgba(37,211,102,0.35)',
        color: '#ffffff',
        padding: '0.5rem 1rem',
        fontSize: '0.78rem',
        fontFamily: 'var(--font-sans)',
        whiteSpace: 'nowrap',
        boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'translateX(0)' : 'translateX(8px)',
        transition: 'opacity 0.2s ease, transform 0.2s ease',
        pointerEvents: 'none',
      }}>
        Chat with us on WhatsApp
      </div>

      {/* Button */}
      <a
        href="https://wa.me/923111234567"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: '56px',
          height: '56px',
          background: '#25d366',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
          flexShrink: 0,
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
          transition: 'transform 0.2s ease',
          animation: 'wa-pulse 2.5s ease-in-out infinite',
        }}
      >
        <MessageCircle size={26} color="#ffffff" fill="#ffffff" />
      </a>

      <style>{`
        @keyframes wa-pulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(37,211,102,0.45); }
          50%       { box-shadow: 0 4px 20px rgba(37,211,102,0.45), 0 0 0 10px rgba(37,211,102,0.12); }
        }
      `}</style>
    </div>
  );
}