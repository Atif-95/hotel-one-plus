'use client';
import { useState, useRef, useEffect } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  label: string;
  value: Date | null;
  onChange: (date: Date) => void;
  minDate?: Date;
  alignRight?: boolean;
}

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['Su','Mo','Tu','We','Th','Fr','Sa'];

function fmt(d: Date) {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function DatePicker({ label, value, onChange, minDate, alignRight }: Props) {
  const today = new Date(); today.setHours(0,0,0,0);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(() => value ?? today);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const y = view.getFullYear();
  const m = view.getMonth();
  const firstDay = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const isDisabled = (d: number) => {
    const date = new Date(y, m, d);
    return (minDate ? date < minDate : date < today);
  };
  const isSelected = (d: number) =>
    !!value && value.getDate() === d && value.getMonth() === m && value.getFullYear() === y;
  const isToday = (d: number) =>
    today.getDate() === d && today.getMonth() === m && today.getFullYear() === y;

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#b8956b', fontSize: '0.62rem', letterSpacing: '0.2em', fontFamily: 'var(--font-sans)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
        <CalendarDays size={11} /> {label}
      </label>

      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: '100%', background: open ? 'rgba(163,128,87,0.06)' : 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(163,128,87,0.2)',
          borderBottom: `2px solid ${open ? '#a38057' : 'rgba(163,128,87,0.5)'}`,
          color: value ? '#f5f0e8' : '#8a9ab0',
          padding: '0.8rem 1rem', fontSize: '0.88rem',
          outline: 'none', cursor: 'pointer',
          textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontFamily: 'var(--font-sans)', transition: 'all 0.2s',
        }}
      >
        <span>{value ? fmt(value) : 'Select date'}</span>
        <CalendarDays size={14} color={open ? '#cda882' : '#a38057'} />
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)',
          left: alignRight ? 'auto' : 0, right: alignRight ? 0 : 'auto',
          zIndex: 1000, background: '#0d1b2a',
          border: '1px solid rgba(163,128,87,0.3)',
          boxShadow: '0 20px 48px rgba(0,0,0,0.7)',
          padding: '1.25rem', width: '288px',
        }}>
          {/* Month navigation */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <button
              onClick={() => setView(new Date(y, m - 1, 1))}
              style={{ background: 'rgba(163,128,87,0.1)', border: '1px solid rgba(163,128,87,0.2)', color: '#b8956b', cursor: 'pointer', padding: '0.3rem 0.5rem', lineHeight: 1 }}
            >
              <ChevronLeft size={14} />
            </button>
            <span style={{ color: '#cda882', fontSize: '0.88rem', letterSpacing: '0.06em', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
              {MONTHS[m]} {y}
            </span>
            <button
              onClick={() => setView(new Date(y, m + 1, 1))}
              style={{ background: 'rgba(163,128,87,0.1)', border: '1px solid rgba(163,128,87,0.2)', color: '#b8956b', cursor: 'pointer', padding: '0.3rem 0.5rem', lineHeight: 1 }}
            >
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Day headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '0.5rem' }}>
            {DAYS.map(d => (
              <div key={d} style={{ textAlign: 'center', color: '#a38057', fontSize: '0.6rem', letterSpacing: '0.05em', padding: '0.3rem 0', fontFamily: 'var(--font-sans)', fontWeight: 700 }}>
                {d}
              </div>
            ))}
          </div>

          {/* Day grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
            {cells.map((day, i) =>
              day ? (
                <button key={i}
                  onClick={() => { if (!isDisabled(day)) { onChange(new Date(y, m, day)); setOpen(false); } }}
                  style={{
                    padding: '0.45rem 0', border: 'none', cursor: isDisabled(day) ? 'default' : 'pointer',
                    background: isSelected(day) ? '#a38057' : isToday(day) ? 'rgba(163,128,87,0.12)' : 'transparent',
                    color: isDisabled(day) ? 'rgba(138,154,176,0.25)' : isSelected(day) ? '#0d1b2a' : '#f5f0e8',
                    fontSize: '0.8rem', fontFamily: 'var(--font-sans)', fontWeight: isSelected(day) ? 700 : 400,
                    outline: isToday(day) && !isSelected(day) ? '1px solid rgba(163,128,87,0.35)' : 'none',
                    outlineOffset: '-1px', borderRadius: '2px',
                  }}
                >
                  {day}
                </button>
              ) : <div key={i} />
            )}
          </div>

          {/* Footer */}
          {value && (
            <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(163,128,87,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#cda882', fontSize: '0.78rem', fontFamily: 'var(--font-sans)' }}>{fmt(value)}</span>
              <button
                onClick={() => { onChange(null as unknown as Date); setOpen(false); }}
                style={{ background: 'none', border: 'none', color: '#8a9ab0', cursor: 'pointer', fontSize: '0.7rem', fontFamily: 'var(--font-sans)' }}
              >
                Clear
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}