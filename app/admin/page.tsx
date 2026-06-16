'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, User } from 'lucide-react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const res = await fetch('/db.json').then(r => r.json());
    if (username === res.admin.username && password === res.admin.password) {
      localStorage.setItem('hop_admin', JSON.stringify({ name: res.admin.name, loggedIn: true }));
      router.push('/admin/dashboard');
    } else {
      setError('Invalid username or password.');
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#0a1015',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem',
      backgroundImage: 'radial-gradient(ellipse at top, rgba(163,128,87,0.06) 0%, transparent 60%)',
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <Image src="/logo.jpeg" alt="Hotel One Plus" width={80} height={80} style={{ borderRadius: '8px', border: '2px solid rgba(163,128,87,0.4)', marginBottom: '1rem' }} />
          <h1 style={{ color: '#cda882', fontSize: '1.2rem', fontFamily: 'var(--font-sans)', letterSpacing: '0.15em', fontWeight: 700 }}>HOTEL ONE PLUS</h1>
          <p style={{ color: '#8a9ab0', fontSize: '0.8rem', fontFamily: 'var(--font-sans)', letterSpacing: '0.1em' }}>CRM ADMIN PORTAL</p>
        </div>

        {/* Card */}
        <div style={{ background: '#162032', border: '1px solid rgba(163,128,87,0.25)', padding: '2.5rem' }}>
          <h2 style={{ color: '#f5f0e8', fontSize: '1.3rem', fontWeight: 400, marginBottom: '0.4rem' }}>Welcome Back</h2>
          <p style={{ color: '#8a9ab0', fontSize: '0.85rem', marginBottom: '2rem' }}>Sign in to manage your hotel.</p>

          {error && (
            <div style={{ background: 'rgba(180,50,50,0.15)', border: '1px solid rgba(180,50,50,0.4)', color: '#ff8080', padding: '0.75rem 1rem', marginBottom: '1.5rem', fontSize: '0.85rem', fontFamily: 'var(--font-sans)' }}>
              ⚠ {error}
            </div>
          )}

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', color: '#b8956b', fontSize: '0.65rem', letterSpacing: '0.2em', fontFamily: 'var(--font-sans)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Username</label>
            <div style={{ position: 'relative' }}>
              <User size={15} color="#8a9ab0" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input type="text" value={username} onChange={e => setUsername(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                placeholder="admin" style={{
                  width: '100%', background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(163,128,87,0.3)', color: '#f5f0e8',
                  padding: '0.75rem 1rem 0.75rem 2.75rem', fontSize: '0.9rem', outline: 'none',
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', color: '#b8956b', fontSize: '0.65rem', letterSpacing: '0.2em', fontFamily: 'var(--font-sans)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={15} color="#8a9ab0" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                placeholder="••••••••" style={{
                  width: '100%', background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(163,128,87,0.3)', color: '#f5f0e8',
                  padding: '0.75rem 2.75rem 0.75rem 2.75rem', fontSize: '0.9rem', outline: 'none',
                }}
              />
              <button onClick={() => setShowPw(v => !v)} style={{
                position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', color: '#8a9ab0', cursor: 'pointer',
              }}>
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button className="btn-gold" style={{ width: '100%', fontSize: '0.8rem', opacity: loading ? 0.7 : 1 }}
            onClick={handleLogin} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In to Dashboard'}
          </button>

          <p style={{ color: '#8a9ab0', fontSize: '0.75rem', textAlign: 'center', marginTop: '1.25rem', fontFamily: 'var(--font-sans)' }}>
            Default: admin / naran2024
          </p>
        </div>

        <p style={{ color: '#8a9ab0', fontSize: '0.75rem', textAlign: 'center', marginTop: '1.5rem', fontFamily: 'var(--font-sans)' }}>
          © 2024 Hotel One Plus · Staff Portal
        </p>
      </div>
    </div>
  );
}
