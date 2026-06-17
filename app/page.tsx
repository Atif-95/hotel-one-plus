'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ArrowRight, Mountain, Utensils, Flame, Car, Sparkles, Wifi, Fish, ParkingSquare, Users } from 'lucide-react';
import { useScrollReveal } from './hooks/useScrollReveal';
import DatePicker from './components/DatePicker';

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
  const [checkIn, setCheckIn] = useState<Date|null>(null);
  const [checkOut, setCheckOut] = useState<Date|null>(null);
  const [guests, setGuests] = useState(2);
  const [hoveredAmenity, setHoveredAmenity] = useState<number|null>(null);

  useScrollReveal([db]);

  useEffect(() => { fetch('/db.json').then(r=>r.json()).then(setDb); }, []);

  if (!db) return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#0d1b2a'}}>
      <div style={{textAlign:'center'}}>
        <Image src="/logo.jpeg" alt="Loading" width={80} height={80} style={{borderRadius:'8px',marginBottom:'1rem'}} />
        <p style={{color:'#b8956b',letterSpacing:'0.2em',fontSize:'0.8rem',fontFamily:'var(--font-sans)'}}>LOADING...</p>
      </div>
    </div>
  );

  return (
    <>
      {/* HERO */}
      <section style={{minHeight:'100vh',position:'relative',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,zIndex:0}}>
          <Image src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800" alt="Naran" fill style={{objectFit:'cover'}} priority className="hero-pan" />
          <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(13,27,42,0.7) 0%,rgba(13,27,42,0.35) 40%,rgba(13,27,42,0.88) 100%)'}} />
          {/* Bottom vignette */}
          <div style={{position:'absolute',bottom:0,left:0,right:0,height:'40%',background:'linear-gradient(to top, #0d1b2a 0%, transparent 40%)',zIndex:1}} />
        </div>
        <div style={{position:'relative',zIndex:2,textAlign:'center',maxWidth:'900px',padding:'0 2rem',marginTop:'5rem'}}>
          {/* Decorative line above badge */}
          <div className="hero-anim-1" style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'1rem',marginBottom:'1.5rem'}}>
            <div style={{width:'40px',height:'1px',background:'#a38057'}} />
            <div style={{display:'inline-flex',alignItems:'center',gap:'0.5rem',border:'1px solid rgba(163,128,87,0.4)',padding:'0.4rem 1.2rem'}}>
              <span style={{color:'#b8956b',fontSize:'0.7rem',letterSpacing:'0.25em',fontFamily:'var(--font-sans)',textTransform:'uppercase'}}>Naran Valley, Pakistan · 8,200 ft</span>
            </div>
          </div>
          <h1 className="hero-anim-2" style={{fontSize:'clamp(3rem,7vw,6rem)',fontWeight:400,lineHeight:1.1,marginBottom:'1.5rem',color:'#ffffff'}}>
            Where the Mountains Meet<br/>
            <span className="gold-shimmer" style={{fontStyle:'italic'}}>Luxury</span>
          </h1>
          <p className="hero-anim-3" style={{color:'rgba(245,240,232,0.85)',fontSize:'1.1rem',maxWidth:'600px',margin:'0 auto 2.5rem',lineHeight:1.8}}>
            Nestled in the heart of Naran Valley, Hotel One Plus offers an unparalleled mountain retreat. Wake up to breathtaking Himalayan peaks and the pristine Kunhar River.
          </p>
          <div className="hero-anim-4" style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
            <Link href="/rooms" className="btn-gold" style={{display:'inline-flex',alignItems:'center',gap:'0.5rem',textDecoration:'none'}}>
              Explore Rooms <ArrowRight size={14} />
            </Link>
            <Link href="/about" className="btn-outline" style={{display:'inline-flex',alignItems:'center',gap:'0.5rem',textDecoration:'none'}}>
              Discover More
            </Link>
          </div>
          {/* Hero stats row */}
          <div className="hero-anim-5" style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'1.5rem',marginTop:'3rem'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'2rem',flexWrap:'wrap'}}>
              {[
                { value: '8,200 ft', label: 'Elevation' },
                { value: '★ 4.9', label: 'Rating' },
                { value: '50+', label: 'Rooms' },
              ].map((stat, i) => (
                <div key={i} style={{textAlign:'center'}}>
                  <div style={{color:'#cda882',fontSize:'1rem',fontVariant:'small-caps',letterSpacing:'0.08em',fontFamily:'var(--font-sans)',fontWeight:600}}>{stat.value}</div>
                  <div style={{color:'rgba(163,128,87,0.7)',fontSize:'0.65rem',letterSpacing:'0.2em',fontFamily:'var(--font-sans)',textTransform:'uppercase'}}>{stat.label}</div>
                </div>
              ))}
            </div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'0.5rem'}}>
              {[1,2,3,4,5].map(s=><Star key={s} size={14} fill="#b8956b" color="#b8956b"/>)}
              <span style={{color:'#cda882',fontSize:'0.85rem',fontFamily:'var(--font-sans)'}}>{db.hotel.rating} · {db.hotel.totalReviews} reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING BAR */}
      <section style={{background:'#060d16',padding:'2.5rem 2rem'}}>
        <div style={{maxWidth:'1020px',margin:'0 auto'}}>
          <div style={{background:'#0d1b2a',border:'1px solid rgba(163,128,87,0.25)',borderTop:'3px solid #a38057',padding:'2rem 2.5rem',boxShadow:'0 24px 64px rgba(0,0,0,0.55)'}}>

            {/* Panel header */}
            <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:'1.5rem',flexWrap:'wrap',gap:'1rem'}}>
              <div>
                <p style={{color:'#a38057',fontSize:'0.62rem',letterSpacing:'0.3em',fontFamily:'var(--font-sans)',textTransform:'uppercase',marginBottom:'0.3rem'}}>Plan Your Visit</p>
                <h3 style={{color:'#f5f0e8',fontSize:'1.25rem',fontWeight:400,letterSpacing:'0.02em'}}>Reserve Your Stay</h3>
              </div>
              <div style={{display:'flex',gap:'1.75rem',paddingTop:'0.25rem'}}>
                {[{v:'24/7',l:'Service'}].map(s=>(
                  <div key={s.l} style={{textAlign:'center'}}>
                    <div style={{color:'#cda882',fontSize:'0.88rem',fontWeight:700,fontFamily:'var(--font-sans)'}}>{s.v}</div>
                    <div style={{color:'#8a9ab0',fontSize:'0.58rem',letterSpacing:'0.15em',textTransform:'uppercase',fontFamily:'var(--font-sans)'}}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gold divider */}
            <div style={{height:'1px',background:'linear-gradient(to right,rgba(163,128,87,0.6),rgba(163,128,87,0.1))',marginBottom:'1.75rem'}} />

            {/* Fields */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'1rem',alignItems:'end'}}>
              <DatePicker label="Check In" value={checkIn} onChange={setCheckIn} />
              <DatePicker label="Check Out" value={checkOut} onChange={setCheckOut} minDate={checkIn ?? undefined} alignRight />
              <div>
                <label style={{display:'flex',alignItems:'center',gap:'0.4rem',color:'#b8956b',fontSize:'0.62rem',letterSpacing:'0.2em',fontFamily:'var(--font-sans)',marginBottom:'0.5rem',textTransform:'uppercase'}}>
                  <Users size={11}/> Guests
                </label>
                <div style={{display:'flex',alignItems:'center',background:'rgba(255,255,255,0.03)',border:'1px solid rgba(163,128,87,0.2)',borderBottom:'2px solid rgba(163,128,87,0.5)'}}>
                  <button onClick={()=>setGuests(g=>Math.max(1,g-1))} style={{padding:'0.8rem 1rem',background:'none',border:'none',borderRight:'1px solid rgba(163,128,87,0.15)',color:'#b8956b',cursor:'pointer',fontSize:'1rem',lineHeight:1}}>−</button>
                  <span style={{flex:1,textAlign:'center',color:'#f5f0e8',fontSize:'0.88rem',fontFamily:'var(--font-sans)'}}>{guests} Guest{guests!==1?'s':''}</span>
                  <button onClick={()=>setGuests(g=>Math.min(10,g+1))} style={{padding:'0.8rem 1rem',background:'none',border:'none',borderLeft:'1px solid rgba(163,128,87,0.15)',color:'#b8956b',cursor:'pointer',fontSize:'1rem',lineHeight:1}}>+</button>
                </div>
              </div>
              <Link href="/rooms" className="btn-gold" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'0.4rem',textDecoration:'none',padding:'0.85rem 1.25rem',fontSize:'0.78rem',letterSpacing:'0.08em',whiteSpace:'nowrap'}}>
                Check Availability <ArrowRight size={13}/>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ROOMS */}
      <section className="section-pad" style={{background:'#0d1b2a'}}>
        <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 2rem'}}>
          {/* Editorial section header */}
          <div style={{textAlign:'center',marginBottom:'3.5rem',display:'flex',flexDirection:'column',alignItems:'center',gap:'0.75rem'}}>
            <p style={{color:'#a38057',fontSize:'0.7rem',letterSpacing:'0.3em',fontFamily:'var(--font-sans)',textTransform:'uppercase',fontVariant:'small-caps'}}>Accommodation</p>
            <div style={{width:'40px',height:'1px',background:'#a38057'}} />
            <h2 style={{fontSize:'clamp(1.8rem,3.5vw,2.8rem)',fontWeight:400,color:'#f5f0e8'}}>Our Finest Rooms & Suites</h2>
            <div className="gold-divider"/>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,320px),1fr))',gap:'2rem'}}>
            {db.rooms.slice(0,3).map((room, idx)=>(
              <div key={room.id} className={`card-hover reveal reveal-delay-${idx+1}`} style={{background:'#162032',border:'1px solid rgba(163,128,87,0.15)',overflow:'hidden'}}>
                <div className="img-zoom" style={{position:'relative',height:'220px'}}>
                  <Image src={room.image} alt={room.name} fill style={{objectFit:'cover'}}/>
                  {/* Gradient overlay with room name + price */}
                  <div style={{position:'absolute',inset:0,background:'linear-gradient(to top, rgba(13,27,42,0.9) 0%, transparent 60%)',zIndex:1,display:'flex',flexDirection:'column',justifyContent:'flex-end',padding:'1rem 1.25rem'}}>
                    <div style={{color:'#cda882',fontSize:'1.05rem',fontWeight:400,lineHeight:1.2}}>{room.name}</div>
                    <div style={{display:'flex',alignItems:'baseline',gap:'0.3rem',marginTop:'0.25rem'}}>
                      <span style={{color:'#b8956b',fontSize:'1.1rem',fontWeight:700,fontFamily:'var(--font-sans)'}}>PKR {room.price.toLocaleString()}</span>
                      <span style={{color:'rgba(138,154,176,0.8)',fontSize:'0.7rem',fontFamily:'var(--font-sans)'}}>/night</span>
                    </div>
                  </div>
                  <div style={{position:'absolute',top:'1rem',right:'1rem',zIndex:2,background:room.available?'rgba(163,128,87,0.9)':'rgba(139,90,90,0.9)',color:'#0d1b2a',fontSize:'0.65rem',padding:'0.25rem 0.7rem',fontFamily:'var(--font-sans)',fontWeight:700,letterSpacing:'0.1em'}}>
                    {room.available?'AVAILABLE':'BOOKED'}
                  </div>
                </div>
                <div style={{padding:'1.5rem'}}>
                  <p style={{color:'#8a9ab0',fontSize:'0.85rem',marginBottom:'1rem',lineHeight:1.6}}>{room.description.slice(0,90)}…</p>
                  <div style={{display:'flex',flexWrap:'wrap',gap:'0.4rem',marginBottom:'1.25rem'}}>
                    {room.amenities.slice(0,4).map(a=>(
                      <span key={a} style={{background:'rgba(163,128,87,0.1)',border:'1px solid rgba(163,128,87,0.25)',color:'#a38057',fontSize:'0.7rem',padding:'0.2rem 0.6rem',fontFamily:'var(--font-sans)'}}>{a}</span>
                    ))}
                  </div>
                  <div style={{display:'flex',justifyContent:'flex-end'}}>
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
          {/* Editorial section header */}
          <div style={{textAlign:'center',marginBottom:'3.5rem',display:'flex',flexDirection:'column',alignItems:'center',gap:'0.75rem'}}>
            <p style={{color:'#a38057',fontSize:'0.7rem',letterSpacing:'0.3em',fontFamily:'var(--font-sans)',textTransform:'uppercase',fontVariant:'small-caps'}}>What We Offer</p>
            <div style={{width:'40px',height:'1px',background:'#a38057'}} />
            <h2 style={{fontSize:'clamp(1.8rem,3.5vw,2.8rem)',fontWeight:400,color:'#f5f0e8'}}>Hotel Experiences</h2>
            <div className="gold-divider"/>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'1.5rem'}}>
            {db.amenities.map((a, i) => {
              const AmenityIcon = AMENITY_ICONS[a.icon];
              const isHovered = hoveredAmenity === i;
              return (
                <div key={i} className={`reveal reveal-delay-${Math.min(i+1,4)}`}
                  style={{background:'rgba(22,32,50,0.8)',border:'1px solid rgba(163,128,87,0.12)',padding:'2rem 1.5rem',textAlign:'center',transition:'all 0.3s',cursor:'default',animation:isHovered?'pulse-glow 2s infinite':undefined}}
                  onMouseEnter={e=>{setHoveredAmenity(i);(e.currentTarget as HTMLElement).style.borderColor='rgba(163,128,87,0.4)';(e.currentTarget as HTMLElement).style.background='rgba(163,128,87,0.06)';}}
                  onMouseLeave={e=>{setHoveredAmenity(null);(e.currentTarget as HTMLElement).style.borderColor='rgba(163,128,87,0.12)';(e.currentTarget as HTMLElement).style.background='rgba(22,32,50,0.8)';}}
                >
                  <div style={{display:'flex',justifyContent:'center',marginBottom:'1rem'}}>
                    <div style={{width:'64px',height:'64px',borderRadius:'50%',background:'rgba(163,128,87,0.1)',border:'1px solid rgba(163,128,87,0.2)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                      {AmenityIcon && <AmenityIcon size={28} color="#a38057" />}
                    </div>
                  </div>
                  <h4 style={{color:'#cda882',fontSize:'1rem',marginBottom:'0.4rem',fontWeight:400}}>{a.title}</h4>
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
          {/* Editorial section header */}
          <div style={{textAlign:'center',marginBottom:'3.5rem',display:'flex',flexDirection:'column',alignItems:'center',gap:'0.75rem'}}>
            <p style={{color:'#a38057',fontSize:'0.7rem',letterSpacing:'0.3em',fontFamily:'var(--font-sans)',textTransform:'uppercase',fontVariant:'small-caps'}}>Guest Stories</p>
            <div style={{width:'40px',height:'1px',background:'#a38057'}} />
            <h2 style={{fontSize:'clamp(1.8rem,3.5vw,2.8rem)',fontWeight:400,color:'#f5f0e8'}}>What Our Guests Say</h2>
            <div className="gold-divider"/>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,300px),1fr))',gap:'2rem'}}>
            {db.testimonials.map(t=>(
              <div key={t.id} className="reveal" style={{background:'#162032',border:'1px solid rgba(163,128,87,0.15)',borderLeft:'3px solid #a38057',padding:'2rem',position:'relative',overflow:'hidden'}}>
                {/* Large opening quote */}
                <div style={{position:'absolute',top:'0.5rem',left:'1rem',color:'#a38057',fontSize:'6rem',lineHeight:1,fontFamily:'var(--font-serif)',opacity:0.2,pointerEvents:'none',userSelect:'none'}}>"</div>
                <div style={{position:'relative',zIndex:1}}>
                  <p style={{color:'#c8c0b0',fontSize:'0.92rem',lineHeight:1.8,marginBottom:'1.5rem',fontStyle:'italic'}}>{t.comment}</p>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div>
                      <div style={{color:'#cda882',fontWeight:600,fontSize:'0.9rem'}}>{t.name}</div>
                      <div style={{color:'#8a9ab0',fontSize:'0.78rem',fontFamily:'var(--font-sans)'}}>{t.city} · {t.date}</div>
                    </div>
                    <div style={{display:'flex',gap:'2px'}}>
                      {Array.from({length:t.rating}).map((_,i)=><Star key={i} size={12} fill="#b8956b" color="#b8956b"/>)}
                    </div>
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
        {/* Decorative border frame */}
        <div style={{position:'absolute',inset:'2rem',border:'1px solid rgba(163,128,87,0.3)',pointerEvents:'none',zIndex:1}} />
        <div style={{position:'relative',zIndex:2,textAlign:'center',maxWidth:'700px',margin:'0 auto'}}>
          <h2 style={{fontSize:'clamp(2rem,4vw,3.5rem)',fontWeight:400,color:'#ffffff',marginBottom:'0.75rem',letterSpacing:'-0.03em',wordSpacing:'-0.12em'}}>
            Ready for a <span className="gold-shimmer">Mountain Escape</span>?
          </h2>
          <p style={{color:'rgba(245,240,232,0.8)',fontSize:'1rem',marginBottom:'1.5rem',lineHeight:1.8}}>Book your stay at Hotel One Plus and discover the magic of Naran Valley.</p>
          <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
            <Link href="/rooms" className="btn-gold" style={{textDecoration:'none'}}>Book Your Room</Link>
            <Link href="/contact" className="btn-outline" style={{textDecoration:'none'}}>Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}