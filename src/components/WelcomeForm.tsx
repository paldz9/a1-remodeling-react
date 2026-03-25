import { useState, useRef, useEffect } from 'react';
import './WelcomeForm.css';
import BookingStep from './BookingStep';

const BROWSE_ANSWER = "No, I'm just browsing for now";

const OPTIONS = [
  'Yes, within the next 30 days',
  'Yes, within 1–3 months',
  'Yes, sometime this year',
  "Yes, but I'd like to speak with a professional first",
  "Yes, but I'm not sure when yet",
  "No, I'm just browsing for now",
];

interface WelcomeFormProps {
  onDismiss: () => void;
}

export default function WelcomeForm({ onDismiss }: WelcomeFormProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subscribe, setSubscribe] = useState(false);
  const [selected, setSelected] = useState('');
  const [open, setOpen] = useState(false);
  const [mouseY, setMouseY] = useState<number | null>(null);
  const [scrolling, setScrolling] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  function handleStep1(e: React.FormEvent) {
    e.preventDefault();
    setStep(2);
  }

  function handleSelect(opt: string) {
    setSelected(opt);
    setOpen(false);
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseY(e.clientY - rect.top);
  }

  function handleScroll() {
    setScrolling(true);
    if (scrollTimer.current) clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => setScrolling(false), 700);
  }

  function itemOpacity(index: number, total: number): number {
    if (scrolling) return 1;
    if (mouseY !== null && listRef.current) {
      const itemH = listRef.current.clientHeight / total;
      const center = itemH * index + itemH / 2;
      const dist = Math.abs(mouseY - center);
      return Math.max(0.15, 1 - (dist / listRef.current.clientHeight) * 0.85);
    }
    return Math.max(0.15, 1 - (index / (total - 1)) * 0.85);
  }

  return (
    <div className="wf-overlay">
      <video className="wf-backdrop" autoPlay muted loop playsInline>
        <source src="/welcome%20background.mp4" type="video/mp4" />
      </video>
      <div className={`wf-backdrop-dim${step >= 2 ? ' wf-backdrop-dim--darker' : ''}`} />

      {/* ── STEP 1 ── */}
      {step === 1 && (
        <div className="wf-card">
          <div className="wf-left">
            <video className="wf-panel-video" autoPlay muted loop playsInline>
              <source src="/form-welcome.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="wf-right">
            <h2 className="wf-heading">Before we begin,</h2>
            <p className="wf-subheading">WE'D LOVE TO LEARN A LITTLE ABOUT YOU.</p>
            <form className="wf-form" onSubmit={handleStep1}>
              <div className="wf-field">
                <label className="wf-label">Name</label>
                <input className="wf-input" type="text" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="wf-field">
                <label className="wf-label">Email</label>
                <input className="wf-input" type="email" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <label className="wf-checkbox-label">
                <input className="wf-checkbox" type="checkbox" checked={subscribe} onChange={e => setSubscribe(e.target.checked)} />
                <span>Send me news and updates on my email.</span>
              </label>
              <button className="wf-btn" type="submit">Continue</button>
            </form>
            <button className="wf-skip" onClick={onDismiss}>Continue without filling-up form</button>
          </div>
        </div>
      )}

      {/* ── STEP 2 ── */}
      {step === 2 && (
        <div className="wf-step2">
          <h2 className="wf-s2-hello">Hello {name || 'there'},</h2>
          <p className="wf-s2-question">ARE YOU PLANNING TO REMODEL YOUR HOME?</p>

          <div className="wf-dropdown-wrap" ref={dropdownRef}>
            {/* Trigger field */}
            <div className={`wf-dropdown-field${open ? ' wf-dropdown-field--open' : ''}`} onClick={() => setOpen(o => !o)}>
              <span className={selected ? 'wf-dropdown-value' : 'wf-dropdown-placeholder'}>
                {selected || 'Select your answer'}
              </span>
              <svg className={`wf-dropdown-arrow${open ? ' wf-dropdown-arrow--up' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>

            {/* Options list */}
            {open && (
              <div
                className="wf-dropdown-list"
                ref={listRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setMouseY(null)}
                onScroll={handleScroll}
              >
                {OPTIONS.map((opt, i) => (
                  <div
                    key={opt}
                    className={`wf-dropdown-item${opt === selected ? ' wf-dropdown-item--active' : ''}`}
                    style={{ opacity: itemOpacity(i, OPTIONS.length), transition: 'opacity 0.18s, background 0.15s' }}
                    onClick={() => handleSelect(opt)}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            className="wf-btn-gold"
            onClick={() => selected === BROWSE_ANSWER ? onDismiss() : setStep(3)}
            disabled={!selected}
          >
            Continue
          </button>
          {!selected && <p className="wf-s2-hint">Please select an answer to continue</p>}
        </div>
      )}

      {/* ── STEP 3 ── */}
      {step === 3 && (
        <BookingStep name={name} email={email} timeline={selected} onDismiss={onDismiss} />
      )}
    </div>
  );
}
