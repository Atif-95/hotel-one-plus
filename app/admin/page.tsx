'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, User, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => { setMounted(true); }, []);

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    const res = await fetch('/db.json').then(r => r.json());
    if (username === res.admin.username && password === res.admin.password) {
      localStorage.setItem('hop_admin', JSON.stringify({ name: res.admin.name, loggedIn: true }));
      router.push('/admin/dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#060e16' }}>

      {/* Left — scenic panel (hidden on mobile) */}
      <div style={{
        flex: '1 1 55%', position: 'relative', overflow: 'hidden',
        display: 'none',
      }}
        className="admin-left-panel"
      >
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800"
          alt="Naran Valley"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(6,14,22,0.85) 0%, rgba(13,27,42,0.5) 60%, rgba(6,14,22,0.75) 100%)' }} />

        {/* Content on image */}
        <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '3rem' }}>
          {/* Top logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Image src="/logo.jpeg" alt="Hotel One Plus" width={44} height={44}
              style={{ borderRadius: '6px', border: '1px solid rgba(163,128,87,0.5)' }} />
            <div>
              <div style={{ color: '#cda882', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.15em', fontFamily: 'var(--font-sans)' }}>HOTEL ONE PLUS</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.6rem', letterSpacing: '0.15em', fontFamily: 'var(--font-sans)' }}>NARAN VALLEY</div>
            </div>
          </div>

          {/* Bottom quote */}
          <div>
            <div style={{ width: '40px', height: '2px', background: '#a38057', marginBottom: '1.5rem' }} />
            <h2 style={{ color: '#ffffff', fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 400, lineHeight: 1.2, marginBottom: '1rem' }}>
              Where Mountains<br />
              <span style={{ fontStyle: 'italic', color: '#cda882' }}>Meet Luxury</span>
            </h2>
            <p style={{ color: 'rgba(245,240,232,0.6)', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '360px' }}>
              Manage your Naran Valley retreat from one elegant dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* Right — login panel */}
      <div style={{
        flex: '1 1 45%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem', background: '#060e16', position: 'relative',
        minHeight: '100vh',
      }}>
        {/* Subtle top gold line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #a38057, transparent)' }} />

        <div style={{
          width: '100%', maxWidth: '400px',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>

          {/* Header */}
          <div style={{ marginBottom: '2.5rem' }}>
            {/* Mobile logo only */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }} className="admin-mobile-logo">
              <Image src="/logo.jpeg" alt="Hotel One Plus" width={48} height={48}
                style={{ borderRadius: '6px', border: '1px solid rgba(163,128,87,0.4)' }} />
              <div>
                <div style={{ color: '#cda882', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.15em', fontFamily: 'var(--font-sans)' }}>HOTEL ONE PLUS</div>
                <div style={{ color: '#8a9ab0', fontSize: '0.6rem', letterSpacing: '0.15em', fontFamily: 'var(--font-sans)' }}>NARAN VALLEY</div>
              </div>
            </div>

            <div style={{ width: '32px', height: '1px', background: '#a38057', marginBottom: '1.25rem' }} />
            <h1 style={{ color: '#f5f0e8', fontSize: '1.8rem', fontWeight: 400, marginBottom: '0.5rem', lineHeight: 1.2 }}>
              Welcome back
            </h1>
            <p style={{ color: '#8a9ab0', fontSize: '0.85rem', fontFamily: 'var(--font-sans)' }}>
              Sign in to your admin portal
            </p>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: 'rgba(180,50,50,0.12)', border: '1px solid rgba(180,50,50,0.35)',
              color: '#ff8080', padding: '0.85rem 1rem', marginBottom: '1.5rem',
              fontSize: '0.83rem', fontFamily: 'var(--font-sans)', borderRadius: '2px',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <span style={{ fontSize: '1rem' }}>⚠</span> {error}
            </div>
          )}

          {/* Username */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', color: '#b8956b', fontSize: '0.65rem', letterSpacing: '0.2em', fontFamily: 'var(--font-sans)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <User size={14} color="#a38057" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input
                type="text" value={username} onChange={e => setUsername(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                placeholder="Enter username"
                style={{
                  width: '100%', background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(163,128,87,0.25)', color: '#f5f0e8',
                  padding: '0.85rem 1rem 0.85rem 2.75rem', fontSize: '0.9rem',
                  outline: 'none', transition: 'border-color 0.2s',
                  fontFamily: 'var(--font-sans)',
                }}
                onFocus={e => e.currentTarget.style.borderColor = 'rgba(163,128,87,0.7)'}
                onBlur={e => e.currentTarget.style.borderColor = 'rgba(163,128,87,0.25)'}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', color: '#b8956b', fontSize: '0.65rem', letterSpacing: '0.2em', fontFamily: 'var(--font-sans)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={14} color="#a38057" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input
                type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                placeholder="Enter password"
                style={{
                  width: '100%', background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(163,128,87,0.25)', color: '#f5f0e8',
                  padding: '0.85rem 2.75rem 0.85rem 2.75rem', fontSize: '0.9rem',
                  outline: 'none', transition: 'border-color 0.2s',
                  fontFamily: 'var(--font-sans)',
                }}
                onFocus={e => e.currentTarget.style.borderColor = 'rgba(163,128,87,0.7)'}
                onBlur={e => e.currentTarget.style.borderColor = 'rgba(163,128,87,0.25)'}
              />
              <button onClick={() => setShowPw(v => !v)} style={{
                position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', color: '#8a9ab0', cursor: 'pointer', padding: '0.2rem',
              }}>
                {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleLogin} disabled={loading}
            style={{
              width: '100%', background: loading ? 'rgba(163,128,87,0.6)' : 'linear-gradient(135deg, #a38057, #b8956b)',
              color: '#060e16', border: 'none', padding: '0.95rem',
              fontSize: '0.8rem', letterSpacing: '0.12em', fontFamily: 'var(--font-sans)',
              fontWeight: 700, textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            }}
            onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
          >
            {loading ? (
              <>
                <span style={{ display: 'inline-block', width: '14px', height: '14px', border: '2px solid rgba(6,14,22,0.3)', borderTopColor: '#060e16', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                Signing in…
              </>
            ) : (
              <> Sign In <ArrowRight size={14} /> </>
            )}
          </button>

          <p style={{ color: '#8a9ab0', fontSize: '0.72rem', textAlign: 'center', marginTop: '2rem', fontFamily: 'var(--font-sans)' }}>
            © 2024 Hotel One Plus · Staff Portal
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (min-width: 768px) {
          .admin-left-panel { display: block !important; }
          .admin-mobile-logo { display: none !important; }
        }
      `}</style>
    </div>
  );
}