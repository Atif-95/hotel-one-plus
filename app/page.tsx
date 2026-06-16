'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ArrowRight, Mountain, Utensils, Flame, Car, Sparkles, Wifi, Fish, ParkingSquare } from 'lucide-react';

interface Room { id:number; name:string; price:number; bed:string; image:string; amenities:string[]; description:string; available:boolean; }
interface Testimonial { id:number; name:string; city:string; rating:number; comment:string; date:string; }
interface HotelAmenity { icon:string; title:string; desc:string; }
interface DB {
  hotel: { name:string; tagline:string; description:string; rating:number; totalReviews:number };
  rooms: Room[]; amenities: HotelAmenity[]; testimonials: Testimonial[];
}

const AMENITY_ICONS: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  Mountain, Utensils, Flame, Car, Sparkles, Wifi, Fish, ParkingSquare,
};

export default function HomePage() {
  const [db, setDb] = useState<DB|null>(null);
  const [guests, setGuests] = useState('2');

  useEffect(() => { fetch('/db.json').then(r=>r.json()).then(setDb); }, []);

  if (!db) return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#0d1b2a'}}>
      <div style={{textAlign:'center'}}>
        <Image src="/logo.jpeg" alt="Loading" width={80} height={80} style={{borderRadius:'8px',marginBottom:'1rem'}} />
        <p style={{color:'#d4a84b',letterSpacing:'0.2em',fontSize:'0.8rem',fontFamily:'var(--font-sans)'}}>LOADING...</p>
      </div>
    </div>
  );

  return (
    <>
      {/* HERO */}
      <section style={{minHeight:'100vh',position:'relative',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,zIndex:0}}>
          <Image src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800" alt="Naran" fill style={{objectFit:'cover'}} priority />
          <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(13,27,42,0.7) 0%,rgba(13,27,42,0.35) 40%,rgba(13,27,42,0.88) 100%)'}} />
        </div>
        <div style={{position:'relative',zIndex:1,textAlign:'center',maxWidth:'900px',padding:'0 2rem',marginTop:'5rem'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'0.5rem',marginBottom:'1.5rem',border:'1px solid rgba(184,137,42,0.4)',padding:'0.4rem 1.2rem'}}>
            <span style={{color:'#d4a84b',fontSize:'0.7rem',letterSpacing:'0.25em',fontFamily:'var(--font-sans)',textTransform:'uppercase'}}>Naran Valley, Pakistan · 8,200 ft</span>
          </div>
          <h1 style={{fontSize:'clamp(2.5rem,6vw,5rem)',fontWeight:400,lineHeight:1.15,marginBottom:'1.5rem',color:'#ffffff'}}>
            Where the Mountains Meet<br/>
            <span style={{background:'linear-gradient(135deg,#b8892a 0%,#e8c97a 50%,#b8892a 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',fontStyle:'italic'}}>Luxury</span>
          </h1>
          <p style={{color:'rgba(245,240,232,0.85)',fontSize:'1.1rem',maxWidth:'600px',margin:'0 auto 2.5rem',lineHeight:1.8}}>
            Nestled in the heart of Naran Valley, Hotel One Plus offers an unparalleled mountain retreat. Wake up to breathtaking Himalayan peaks and the pristine Kunhar River.
          </p>
          <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
            <Link href="/rooms" className="btn-gold" style={{display:'inline-flex',alignItems:'center',gap:'0.5rem',textDecoration:'none'}}>
              Explore Rooms <ArrowRight size={14} />
            </Link>
            <Link href="/about" className="btn-outline" style={{display:'inline-flex',alignItems:'center',gap:'0.5rem',textDecoration:'none'}}>
              Discover More
            </Link>
          </div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'0.5rem',marginTop:'2.5rem'}}>
            {[1,2,3,4,5].map(s=><Star key={s} size={14} fill="#d4a84b" color="#d4a84b"/>)}
            <span style={{color:'#e8c97a',fontSize:'0.85rem',fontFamily:'var(--font-sans)'}}>{db.hotel.rating} · {db.hotel.totalReviews} reviews</span>
          </div>
        </div>
      </section>

      {/* BOOKING BAR */}
      <section style={{background:'#0a1520',borderTop:'1px solid rgba(184,137,42,0.2)',borderBottom:'1px solid rgba(184,137,42,0.2)',padding:'2rem 0'}}>
        <div style={{maxWidth:'1100px',margin:'0 auto',padding:'0 2rem'}}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:'1rem',alignItems:'end'}}>
            {[{label:'Check In',type:'date'},{label:'Check Out',type:'date'}].map(f=>(
              <div key={f.label}>
                <label style={{display:'block',color:'#d4a84b',fontSize:'0.65rem',letterSpacing:'0.2em',fontFamily:'var(--font-sans)',marginBottom:'0.5rem',textTransform:'uppercase'}}>{f.label}</label>
                <input type={f.type} style={{width:'100%',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(184,137,42,0.3)',color:'#f5f0e8',padding:'0.75rem 1rem',fontSize:'0.9rem',outline:'none',colorScheme:'dark'}}/>
              </div>
            ))}
            <div>
              <label style={{display:'block',color:'#d4a84b',fontSize:'0.65rem',letterSpacing:'0.2em',fontFamily:'var(--font-sans)',marginBottom:'0.5rem',textTransform:'uppercase'}}>Guests</label>
              <select value={guests} onChange={e=>setGuests(e.target.value)} style={{width:'100%',background:'#0d1b2a',border:'1px solid rgba(184,137,42,0.3)',color:'#f5f0e8',padding:'0.75rem 1rem',fontSize:'0.9rem',outline:'none'}}>
                {['1','2','3','4','5','6+'].map(n=><option key={n}>{n} Guest{n!=='1'?'s':''}</option>)}
              </select>
            </div>
            <Link href="/rooms" className="btn-gold" style={{display:'block',textAlign:'center',textDecoration:'none',padding:'0.82rem 1rem'}}>
              Check Availability
            </Link>
          </div>
        </div>
      </section>

      {/* ROOMS */}
      <section className="section-pad" style={{background:'#0d1b2a'}}>
        <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 2rem'}}>
          <div style={{textAlign:'center',marginBottom:'3.5rem'}}>
            <p style={{color:'#b8892a',fontSize:'0.7rem',letterSpacing:'0.3em',fontFamily:'var(--font-sans)',textTransform:'uppercase',marginBottom:'0.75rem'}}>Accommodation</p>
            <h2 style={{fontSize:'clamp(1.8rem,3.5vw,2.8rem)',fontWeight:400,color:'#f5f0e8',marginBottom:'1rem'}}>Our Finest Rooms & Suites</h2>
            <div className="gold-divider"/>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,320px),1fr))',gap:'2rem'}}>
            {db.rooms.slice(0,3).map(room=>(
              <div key={room.id} className="card-hover" style={{background:'#162032',border:'1px solid rgba(184,137,42,0.15)',overflow:'hidden'}}>
                <div style={{position:'relative',height:'220px'}}>
                  <Image src={room.image} alt={room.name} fill style={{objectFit:'cover'}}/>
                  <div style={{position:'absolute',top:'1rem',right:'1rem',background:room.available?'rgba(184,137,42,0.9)':'rgba(139,90,90,0.9)',color:'#0d1b2a',fontSize:'0.65rem',padding:'0.25rem 0.7rem',fontFamily:'var(--font-sans)',fontWeight:700,letterSpacing:'0.1em'}}>
                    {room.available?'AVAILABLE':'BOOKED'}
                  </div>
                </div>
                <div style={{padding:'1.5rem'}}>
                  <h3 style={{color:'#e8c97a',fontSize:'1.15rem',fontWeight:400,marginBottom:'0.5rem'}}>{room.name}</h3>
                  <p style={{color:'#8a9ab0',fontSize:'0.85rem',marginBottom:'1rem',lineHeight:1.6}}>{room.description.slice(0,90)}…</p>
                  <div style={{display:'flex',flexWrap:'wrap',gap:'0.4rem',marginBottom:'1.25rem'}}>
                    {room.amenities.slice(0,4).map(a=>(
                      <span key={a} style={{background:'rgba(184,137,42,0.1)',border:'1px solid rgba(184,137,42,0.25)',color:'#b8892a',fontSize:'0.7rem',padding:'0.2rem 0.6rem',fontFamily:'var(--font-sans)'}}>{a}</span>
                    ))}
                  </div>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'0.75rem'}}>
                    <div>
                      <span style={{color:'#d4a84b',fontSize:'1.4rem',fontWeight:700,fontFamily:'var(--font-sans)'}}>PKR {room.price.toLocaleString()}</span>
                      <span style={{color:'#8a9ab0',fontSize:'0.75rem',fontFamily:'var(--font-sans)'}}>/night</span>
                    </div>
                    <Link href="/rooms" className="btn-outline" style={{textDecoration:'none',padding:'0.5rem 1.2rem',fontSize:'0.7rem'}}>View Room</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:'3rem'}}>
            <Link href="/rooms" className="btn-gold" style={{textDecoration:'none',display:'inline-flex',alignItems:'center',gap:'0.5rem'}}>View All Rooms <ArrowRight size={14}/></Link>
          </div>
        </div>
      </section>

      {/* AMENITIES */}
      <section className="section-pad" style={{background:'#0a1520'}}>
        <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 2rem'}}>
          <div style={{textAlign:'center',marginBottom:'3.5rem'}}>
            <p style={{color:'#b8892a',fontSize:'0.7rem',letterSpacing:'0.3em',fontFamily:'var(--font-sans)',textTransform:'uppercase',marginBottom:'0.75rem'}}>What We Offer</p>
            <h2 style={{fontSize:'clamp(1.8rem,3.5vw,2.8rem)',fontWeight:400,color:'#f5f0e8',marginBottom:'1rem'}}>Hotel Experiences</h2>
            <div className="gold-divider"/>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'1.5rem'}}>
            {db.amenities.map((a, i) => {
              const AmenityIcon = AMENITY_ICONS[a.icon];
              return (
                <div key={i} style={{background:'rgba(22,32,50,0.8)',border:'1px solid rgba(184,137,42,0.12)',padding:'2rem 1.5rem',textAlign:'center',transition:'all 0.3s',cursor:'default'}}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(184,137,42,0.4)';(e.currentTarget as HTMLElement).style.background='rgba(184,137,42,0.06)';}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(184,137,42,0.12)';(e.currentTarget as HTMLElement).style.background='rgba(22,32,50,0.8)';}}
                >
                  <div style={{display:'flex',justifyContent:'center',marginBottom:'0.75rem'}}>
                    {AmenityIcon && <AmenityIcon size={32} color="#b8892a" />}
                  </div>
                  <h4 style={{color:'#e8c97a',fontSize:'1rem',marginBottom:'0.4rem',fontWeight:400}}>{a.title}</h4>
                  <p style={{color:'#8a9ab0',fontSize:'0.83rem',lineHeight:1.6}}>{a.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-pad" style={{background:'#0d1b2a'}}>
        <div style={{maxWidth:'1100px',margin:'0 auto',padding:'0 2rem'}}>
          <div style={{textAlign:'center',marginBottom:'3.5rem'}}>
            <p style={{color:'#b8892a',fontSize:'0.7rem',letterSpacing:'0.3em',fontFamily:'var(--font-sans)',textTransform:'uppercase',marginBottom:'0.75rem'}}>Guest Stories</p>
            <h2 style={{fontSize:'clamp(1.8rem,3.5vw,2.8rem)',fontWeight:400,color:'#f5f0e8',marginBottom:'1rem'}}>What Our Guests Say</h2>
            <div className="gold-divider"/>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,300px),1fr))',gap:'2rem'}}>
            {db.testimonials.map(t=>(
              <div key={t.id} style={{background:'#162032',border:'1px solid rgba(184,137,42,0.15)',padding:'2rem'}}>
                <div style={{color:'#b8892a',fontSize:'3rem',lineHeight:1,fontFamily:'var(--font-serif)',marginBottom:'1rem',opacity:0.6}}>"</div>
                <p style={{color:'#c8c0b0',fontSize:'0.92rem',lineHeight:1.8,marginBottom:'1.5rem',fontStyle:'italic'}}>{t.comment}</p>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div>
                    <div style={{color:'#e8c97a',fontWeight:600,fontSize:'0.9rem'}}>{t.name}</div>
                    <div style={{color:'#8a9ab0',fontSize:'0.78rem',fontFamily:'var(--font-sans)'}}>{t.city} · {t.date}</div>
                  </div>
                  <div style={{display:'flex',gap:'2px'}}>
                    {Array.from({length:t.rating}).map((_,i)=><Star key={i} size={12} fill="#d4a84b" color="#d4a84b"/>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{position:'relative',padding:'6rem 2rem',overflow:'hidden'}}>
        <Image src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1800" alt="Naran Lake" fill style={{objectFit:'cover'}}/>
        <div style={{position:'absolute',inset:0,background:'rgba(13,27,42,0.82)'}}/>
        <div style={{position:'relative',zIndex:1,textAlign:'center',maxWidth:'700px',margin:'0 auto'}}>
          <h2 style={{fontSize:'clamp(2rem,4vw,3.5rem)',fontWeight:400,color:'#ffffff',marginBottom:'1rem'}}>Ready for a Mountain Escape?</h2>
          <p style={{color:'rgba(245,240,232,0.8)',fontSize:'1rem',marginBottom:'2.5rem',lineHeight:1.8}}>Book your stay at Hotel One Plus and discover the magic of Naran Valley.</p>
          <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
            <Link href="/rooms" className="btn-gold" style={{textDecoration:'none'}}>Book Your Room</Link>
            <Link href="/contact" className="btn-outline" style={{textDecoration:'none'}}>Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}