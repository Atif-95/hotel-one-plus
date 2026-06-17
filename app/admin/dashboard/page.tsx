'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LoadingScreen from '../../components/LoadingScreen';
import {
  LayoutDashboard, BedDouble, User, Star, Settings, LogOut,
  Plus, Pencil, Trash2, Eye, Menu, ChevronRight
} from 'lucide-react';

interface Room {
  id: number; name: string; type: string; price: number; capacity: number;
  size: string; bed: string; available: boolean; image: string;
  amenities: string[]; description: string;
}

interface DB {
  hotel: { name: string; rating: number; totalReviews: number };
  rooms: Room[];
  testimonials: { id: number; name: string; city: string; rating: number; comment: string; date: string }[];
}

const NAV = [
  { key: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { key: 'rooms', label: 'Rooms', icon: <BedDouble size={18} /> },
{ key: 'reviews', label: 'Reviews', icon: <Star size={18} /> },
];


export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState('dashboard');
  const [db, setDb] = useState<DB | null>(null);
  const [adminName, setAdminName] = useState('Manager');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [editRoom, setEditRoom] = useState<Room | null>(null);
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [newRoom, setNewRoom] = useState({ name: '', type: 'standard', price: '', capacity: '2', size: '', bed: '', description: '', image: '', available: true });

  useEffect(() => {
    const auth = localStorage.getItem('hop_admin');
    if (!auth) { router.push('/admin'); return; }
    const parsed = JSON.parse(auth);
    setAdminName(parsed.name || 'Manager');
    fetch('/db.json').then(r => r.json()).then(setDb);
  }, [router]);

  const logout = () => { localStorage.removeItem('hop_admin'); router.push('/admin'); };
  const toggleAvailability = (id: number) => {
    if (!db) return;
    const updated = db.rooms.map(r => r.id === id ? { ...r, available: !r.available } : r);
    setDb({ ...db, rooms: updated });
  };
  const addRoom = () => {
    if (!db || !newRoom.name || !newRoom.price) { alert('Fill required fields'); return; }
    const room: Room = {
      id: Date.now(), name: newRoom.name, type: newRoom.type, price: Number(newRoom.price),
      capacity: Number(newRoom.capacity), size: newRoom.size, bed: newRoom.bed,
      available: newRoom.available, image: newRoom.image || 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
      amenities: ['WiFi', 'TV', 'Room Service'], description: newRoom.description,
    };
    setDb({ ...db, rooms: [...db.rooms, room] });
    setShowAddRoom(false);
    setNewRoom({ name: '', type: 'standard', price: '', capacity: '2', size: '', bed: '', description: '', image: '', available: true });
  };
  const deleteRoom = (id: number) => {
    if (!db || !confirm('Delete this room?')) return;
    setDb({ ...db, rooms: db.rooms.filter(r => r.id !== id) });
  };

  if (!db) return <LoadingScreen />;

  const available = db.rooms.filter(r => r.available).length;
  const booked = db.rooms.length - available;

  const SIDEBAR_W = sidebarOpen ? '240px' : '64px';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#060e16', fontFamily: 'var(--font-sans)' }}>

      {/* Sidebar */}
      <aside style={{
        width: SIDEBAR_W, background: '#0a1520', borderRight: '1px solid rgba(163,128,87,0.15)',
        display: 'flex', flexDirection: 'column', transition: 'width 0.3s', overflow: 'hidden',
        position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50,
      }}>
        {/* Logo */}
        <div style={{ padding: '1.25rem', borderBottom: '1px solid rgba(163,128,87,0.15)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Image src="/logo.jpeg" alt="Logo" width={38} height={38} style={{ borderRadius: '4px', flexShrink: 0 }} />
          {sidebarOpen && <div style={{ color: '#b8956b', fontSize: '0.75rem', letterSpacing: '0.1em', fontWeight: 700, whiteSpace: 'nowrap' }}>HOTEL ONE PLUS<br /><span style={{ color: '#8a9ab0', fontSize: '0.6rem' }}>CRM PORTAL</span></div>}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '1rem 0' }}>
          {NAV.map(n => (
            <button key={n.key} onClick={() => setTab(n.key)} style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%',
              padding: sidebarOpen ? '0.8rem 1.25rem' : '0.8rem', justifyContent: sidebarOpen ? 'flex-start' : 'center',
              background: tab === n.key ? 'rgba(163,128,87,0.12)' : 'transparent',
              borderLeft: tab === n.key ? '3px solid #b8956b' : '3px solid transparent',
              border: 'none', color: tab === n.key ? '#b8956b' : '#8a9ab0',
              cursor: 'pointer', fontSize: '0.85rem', letterSpacing: '0.05em',
              transition: 'all 0.2s', whiteSpace: 'nowrap',
            }}>
              {n.icon}
              {sidebarOpen && n.label}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid rgba(163,128,87,0.15)', padding: '1rem' }}>
          {sidebarOpen && <div style={{ color: '#cda882', fontSize: '0.8rem', marginBottom: '0.75rem', padding: '0 0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><User size={14} /> {adminName}</div>}
          <button onClick={logout} style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#8a9ab0',
            background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem',
            padding: sidebarOpen ? '0 0.25rem' : '0', justifyContent: sidebarOpen ? 'flex-start' : 'center', width: '100%',
          }}>
            <LogOut size={15} /> {sidebarOpen && 'Logout'}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ marginLeft: SIDEBAR_W, flex: 1, transition: 'margin-left 0.3s', minWidth: 0 }}>
        {/* Topbar */}
        <div style={{ background: '#0a1520', borderBottom: '1px solid rgba(163,128,87,0.15)', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', position: 'sticky', top: 0, zIndex: 40 }}>
          <button onClick={() => setSidebarOpen(v => !v)} style={{ background: 'none', border: 'none', color: '#b8956b', cursor: 'pointer' }}>
            <Menu size={20} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#8a9ab0', fontSize: '0.8rem' }}>
            <span style={{ color: '#b8956b' }}>Admin</span>
            <ChevronRight size={12} />
            <span style={{ color: '#f5f0e8', textTransform: 'capitalize' }}>{tab}</span>
          </div>
        </div>

        <div style={{ padding: '2rem 1.5rem' }}>

          {/* ── DASHBOARD ── */}
          {tab === 'dashboard' && (
            <div>
              <h2 style={{ color: '#f5f0e8', fontSize: '1.5rem', fontWeight: 400, marginBottom: '0.4rem' }}>Good Day, {adminName} 👋</h2>
              <p style={{ color: '#8a9ab0', fontSize: '0.85rem', marginBottom: '2rem' }}>Here's your hotel at a glance.</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
                {[
                  { label: 'Total Rooms', value: db.rooms.length, color: '#b8956b', bg: 'rgba(163,128,87,0.1)' },
                  { label: 'Available', value: available, color: '#4caf50', bg: 'rgba(76,175,80,0.1)' },
                  { label: 'Booked / Unavailable', value: booked, color: '#f44336', bg: 'rgba(244,67,54,0.1)' },
                  { label: 'Rating', value: db.hotel.rating + '★', color: '#cda882', bg: 'rgba(232,201,122,0.1)' },
                ].map(s => (
                  <div key={s.label} style={{ background: '#162032', border: `1px solid ${s.bg}`, padding: '1.5rem', borderLeft: `3px solid ${s.color}` }}>
                    <div style={{ color: s.color, fontSize: '2rem', fontWeight: 700 }}>{s.value}</div>
                    <div style={{ color: '#8a9ab0', fontSize: '0.78rem', marginTop: '0.25rem' }}>{s.label}</div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ── ROOMS ── */}
          {tab === 'rooms' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h2 style={{ color: '#f5f0e8', fontSize: '1.4rem', fontWeight: 400 }}>Room Management</h2>
                <button className="btn-gold" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem' }}
                  onClick={() => setShowAddRoom(true)}>
                  <Plus size={14} /> Add Room
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
                {db.rooms.map(room => (
                  <div key={room.id} style={{ background: '#162032', border: '1px solid rgba(163,128,87,0.15)', overflow: 'hidden' }}>
                    <div style={{ position: 'relative', height: '160px' }}>
                      <img src={room.image} alt={room.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: room.available ? 'rgba(76,175,80,0.9)' : 'rgba(244,67,54,0.9)', color: '#fff', fontSize: '0.65rem', padding: '0.2rem 0.6rem', fontWeight: 700 }}>
                        {room.available ? 'AVAILABLE' : 'BOOKED'}
                      </div>
                    </div>
                    <div style={{ padding: '1.25rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                        <h4 style={{ color: '#cda882', fontSize: '0.95rem', fontWeight: 400 }}>{room.name}</h4>
                        <span style={{ color: '#b8956b', fontSize: '0.85rem', fontWeight: 700 }}>PKR {room.price.toLocaleString()}</span>
                      </div>
                      <p style={{ color: '#8a9ab0', fontSize: '0.78rem', marginBottom: '1rem' }}>
                        {room.type} · {room.bed} · {room.capacity} guests
                      </p>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => toggleAvailability(room.id)} style={{
                          flex: 1, background: room.available ? 'rgba(244,67,54,0.1)' : 'rgba(76,175,80,0.1)',
                          border: `1px solid ${room.available ? 'rgba(244,67,54,0.3)' : 'rgba(76,175,80,0.3)'}`,
                          color: room.available ? '#f44336' : '#4caf50',
                          padding: '0.4rem', fontSize: '0.7rem', cursor: 'pointer', letterSpacing: '0.05em',
                        }}>
                          {room.available ? 'Mark Booked' : 'Mark Available'}
                        </button>
                        <button onClick={() => setEditRoom(room)} style={{ background: 'rgba(163,128,87,0.1)', border: '1px solid rgba(163,128,87,0.3)', color: '#b8956b', padding: '0.4rem 0.7rem', cursor: 'pointer' }}>
                          <Pencil size={14} />
                        </button>
                        <button onClick={() => deleteRoom(room.id)} style={{ background: 'rgba(244,67,54,0.1)', border: '1px solid rgba(244,67,54,0.3)', color: '#f44336', padding: '0.4rem 0.7rem', cursor: 'pointer' }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── REVIEWS ── */}
          {tab === 'reviews' && (
            <div>
              <h2 style={{ color: '#f5f0e8', fontSize: '1.4rem', fontWeight: 400, marginBottom: '1.5rem' }}>Guest Reviews</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
                {db.testimonials.map(t => (
                  <div key={t.id} style={{ background: '#162032', border: '1px solid rgba(163,128,87,0.15)', padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                      <div>
                        <div style={{ color: '#cda882', fontWeight: 600, fontSize: '0.9rem' }}>{t.name}</div>
                        <div style={{ color: '#8a9ab0', fontSize: '0.75rem' }}>{t.city} · {t.date}</div>
                      </div>
                      <div style={{ display: 'flex', gap: '2px' }}>
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <span key={i} style={{ color: '#b8956b', fontSize: '0.85rem' }}>★</span>
                        ))}
                      </div>
                    </div>
                    <p style={{ color: '#c8c0b0', fontSize: '0.85rem', lineHeight: 1.7, fontStyle: 'italic' }}>"{t.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Add Room Modal */}
      {showAddRoom && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#162032', border: '1px solid rgba(163,128,87,0.3)', maxWidth: '500px', width: '100%', padding: '2rem', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ color: '#cda882', fontSize: '1.1rem', fontWeight: 400 }}>Add New Room</h3>
              <button onClick={() => setShowAddRoom(false)} style={{ background: 'none', border: 'none', color: '#b8956b', cursor: 'pointer', fontSize: '1.5rem' }}>×</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {[
                { label: 'Room Name *', key: 'name', type: 'text', placeholder: 'e.g. Deluxe Suite' },
                { label: 'Price (PKR) *', key: 'price', type: 'number', placeholder: '12000' },
                { label: 'Size', key: 'size', type: 'text', placeholder: '380 sq ft' },
                { label: 'Bed Type', key: 'bed', type: 'text', placeholder: '1 King Bed' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ display: 'block', color: '#b8956b', fontSize: '0.62rem', letterSpacing: '0.15em', marginBottom: '0.35rem', textTransform: 'uppercase' }}>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} value={(newRoom as Record<string, string | boolean>)[f.key] as string}
                    onChange={e => setNewRoom(p => ({ ...p, [f.key]: e.target.value }))}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(163,128,87,0.3)', color: '#f5f0e8', padding: '0.6rem 0.75rem', fontSize: '0.85rem', outline: 'none' }}
                  />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', color: '#b8956b', fontSize: '0.62rem', letterSpacing: '0.15em', marginBottom: '0.35rem', textTransform: 'uppercase' }}>Type</label>
                <select value={newRoom.type} onChange={e => setNewRoom(p => ({ ...p, type: e.target.value }))}
                  style={{ width: '100%', background: '#0d1b2a', border: '1px solid rgba(163,128,87,0.3)', color: '#f5f0e8', padding: '0.6rem 0.75rem', fontSize: '0.85rem', outline: 'none' }}>
                  {['standard', 'deluxe', 'suite', 'premium'].map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', color: '#b8956b', fontSize: '0.62rem', letterSpacing: '0.15em', marginBottom: '0.35rem', textTransform: 'uppercase' }}>Capacity</label>
                <select value={newRoom.capacity} onChange={e => setNewRoom(p => ({ ...p, capacity: e.target.value }))}
                  style={{ width: '100%', background: '#0d1b2a', border: '1px solid rgba(163,128,87,0.3)', color: '#f5f0e8', padding: '0.6rem 0.75rem', fontSize: '0.85rem', outline: 'none' }}>
                  {['1', '2', '3', '4', '5', '6'].map(n => <option key={n} value={n}>{n} Guests</option>)}
                </select>
              </div>
            </div>
            <div style={{ marginTop: '0.75rem' }}>
              <label style={{ display: 'block', color: '#b8956b', fontSize: '0.62rem', letterSpacing: '0.15em', marginBottom: '0.35rem', textTransform: 'uppercase' }}>Image URL</label>
              <input type="url" placeholder="https://images.unsplash.com/..." value={newRoom.image}
                onChange={e => setNewRoom(p => ({ ...p, image: e.target.value }))}
                style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(163,128,87,0.3)', color: '#f5f0e8', padding: '0.6rem 0.75rem', fontSize: '0.85rem', outline: 'none' }}
              />
            </div>
            <div style={{ marginTop: '0.75rem', marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', color: '#b8956b', fontSize: '0.62rem', letterSpacing: '0.15em', marginBottom: '0.35rem', textTransform: 'uppercase' }}>Description</label>
              <textarea rows={3} value={newRoom.description} onChange={e => setNewRoom(p => ({ ...p, description: e.target.value }))}
                style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(163,128,87,0.3)', color: '#f5f0e8', padding: '0.6rem 0.75rem', fontSize: '0.85rem', outline: 'none', resize: 'vertical', fontFamily: 'var(--font-serif)' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn-gold" style={{ flex: 1, fontSize: '0.78rem' }} onClick={addRoom}>Add Room</button>
              <button className="btn-outline" style={{ flex: 1, fontSize: '0.78rem' }} onClick={() => setShowAddRoom(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Room Modal */}
      {editRoom && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#162032', border: '1px solid rgba(163,128,87,0.3)', maxWidth: '500px', width: '100%', padding: '2rem', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ color: '#cda882', fontSize: '1.1rem', fontWeight: 400 }}>Edit: {editRoom.name}</h3>
              <button onClick={() => setEditRoom(null)} style={{ background: 'none', border: 'none', color: '#b8956b', cursor: 'pointer', fontSize: '1.5rem' }}>×</button>
            </div>
            {[
              { label: 'Room Name', key: 'name', type: 'text' },
              { label: 'Price (PKR)', key: 'price', type: 'number' },
              { label: 'Description', key: 'description', type: 'textarea' },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#b8956b', fontSize: '0.62rem', letterSpacing: '0.15em', marginBottom: '0.35rem', textTransform: 'uppercase' }}>{f.label}</label>
                {f.type === 'textarea'
                  ? <textarea rows={3} value={(editRoom as unknown as Record<string, string>)[f.key]}
                      onChange={e => setEditRoom(p => p ? ({ ...p, [f.key]: e.target.value }) : null)}
                      style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(163,128,87,0.3)', color: '#f5f0e8', padding: '0.6rem 0.75rem', fontSize: '0.85rem', outline: 'none', resize: 'vertical', fontFamily: 'var(--font-serif)' }}
                    />
                  : <input type={f.type} value={(editRoom as unknown as Record<string, string>)[f.key]}
                      onChange={e => setEditRoom(p => p ? ({ ...p, [f.key]: e.target.value }) : null)}
                      style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(163,128,87,0.3)', color: '#f5f0e8', padding: '0.6rem 0.75rem', fontSize: '0.85rem', outline: 'none' }}
                    />
                }
              </div>
            ))}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              <button className="btn-gold" style={{ flex: 1, fontSize: '0.78rem' }}
                onClick={() => {
                  if (!db || !editRoom) return;
                  setDb({ ...db, rooms: db.rooms.map(r => r.id === editRoom.id ? editRoom : r) });
                  setEditRoom(null);
                }}>Save Changes</button>
              <button className="btn-outline" style={{ flex: 1, fontSize: '0.78rem' }} onClick={() => setEditRoom(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
