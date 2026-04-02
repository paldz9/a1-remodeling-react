import { useState, useMemo } from 'react';
import './BookingStep.css';
import { saveBooking, getBookedSlots, type Booking } from '../data/bookingData';
import { COUNTRIES, TIME_ZONES, PHONE_PREFIXES } from '../data/locationData';

const PDT_SLOTS = [10, 11, 12, 13, 14, 15, 16, 17];
const DAYS = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function isUSDST(date: Date): boolean {
  const y = date.getFullYear();
  const dstStart = new Date(y, 2, 1);
  dstStart.setDate(1 + (7 - dstStart.getDay()) % 7 + 7);
  const dstEnd = new Date(y, 10, 1);
  dstEnd.setDate(1 + (7 - dstEnd.getDay()) % 7);
  return date >= dstStart && date < dstEnd;
}

function slotToUTC(pdtHour: number, dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  const offset = isUSDST(new Date(y, m - 1, d)) ? 7 : 8;
  return new Date(Date.UTC(y, m - 1, d, pdtHour + offset, 0, 0));
}

function isPastSlot(pdtHour: number, dateStr: string): boolean {
  return slotToUTC(pdtHour, dateStr) < new Date();
}

function formatSlotLabel(pdtHour: number, dateStr: string, tzId: string): string {
  const start = slotToUTC(pdtHour, dateStr);
  const end = new Date(start.getTime() + 3600000);
  const fmt = (dt: Date) =>
    new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: tzId }).format(dt);
  return `${fmt(start)} – ${fmt(end)}`;
}

function getTzAbbr(tzId: string): string {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: tzId, timeZoneName: 'short' }).formatToParts(new Date());
  return parts.find(p => p.type === 'timeZoneName')?.value ?? tzId;
}

function toDateStr(y: number, m: number, d: number): string {
  return `${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
}

function formatDisplayDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', weekday: 'long' }).format(date);
}

interface Props {
  name: string;
  email: string;
  timeline: string;
  onDismiss: () => void;
}

export default function BookingStep({ name, email, timeline, onDismiss }: Props) {
  const today = new Date(); today.setHours(0, 0, 0, 0);

  const [viewYear, setViewYear]     = useState(() => today.getFullYear());
  const [viewMonth, setViewMonth]   = useState(() => today.getMonth() + 1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const [selectedTz, setSelectedTz] = useState(() => {
    const user = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return TIME_ZONES.find(t => t.id === user) ? user : 'America/Los_Angeles';
  });

  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  const [phonePrefix, setPhonePrefix] = useState('+1');
  const [phone,    setPhone]    = useState('');
  const [country,  setCountry]  = useState('');
  const [address,  setAddress]  = useState('');
  const [city,     setCity]     = useState('');
  const [zip,      setZip]      = useState('');

  const [errors,   setErrors]   = useState<Record<string, string>>({});
  const [booking,  setBooking]  = useState<Booking | null>(null);

  const countryData  = COUNTRIES.find(c => c.name === country);
  const cityOptions  = countryData?.cities ?? [];
  const cityData     = cityOptions.find(c => c.name === city);
  const zipOptions   = cityData?.zips ?? [];

  const bookedSlots = selectedDate ? getBookedSlots(selectedDate) : [];

  // Calendar grid
  const calDays = useMemo(() => {
    const first = new Date(viewYear, viewMonth - 1, 1);
    const lastDate = new Date(viewYear, viewMonth, 0).getDate();
    let dow = first.getDay();
    dow = dow === 0 ? 6 : dow - 1; // Mon=0 … Sun=6
    const days: (number | null)[] = [];
    for (let i = 0; i < dow; i++) days.push(null);
    for (let d = 1; d <= lastDate; d++) days.push(d);
    return days;
  }, [viewYear, viewMonth]);

  function isAvailable(day: number): boolean {
    const d = new Date(viewYear, viewMonth - 1, day);
    if (d < today) return false;
    if (d.getDay() === 0) return false; // Sunday
    const ds = toDateStr(viewYear, viewMonth, day);
    const booked = getBookedSlots(ds);
    return !PDT_SLOTS.every(s => booked.includes(s) || isPastSlot(s, ds));
  }

  function prevMonth() {
    if (viewMonth === 1) { setViewYear(y => y - 1); setViewMonth(12); }
    else setViewMonth(m => m - 1);
  }

  function nextMonth() {
    if (viewMonth === 12) { setViewYear(y => y + 1); setViewMonth(1); }
    else setViewMonth(m => m + 1);
  }

  function selectDate(day: number) {
    if (!isAvailable(day)) return;
    setSelectedDate(toDateStr(viewYear, viewMonth, day));
    setSelectedSlot(null);
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!selectedDate)  e.date     = 'Please select a date.';
    if (selectedSlot === null) e.slot = 'Please select a time slot.';
    if (!phone.trim())  e.phone    = 'Phone number is required.';
    if (!country)       e.country  = 'Country is required.';
    if (!address.trim()) e.address = 'Address is required.';
    if (!city)          e.city     = 'City is required.';
    if (!zip)           e.zip      = 'Zip / Postal code is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleBook() {
    if (!validate()) return;
    const result = saveBooking({
      name, email, timeline,
      phone: `${phonePrefix} ${phone}`,
      country, address, city, zip,
      date: selectedDate!,
      timeSlot: selectedSlot!,
    });
    setBooking(result);
  }

  // ── Confirmation view ────────────────────────────────────────────
  if (booking) {
    return (
      <div className="bk-confirm">
        <div className="bk-confirm-icon">✓</div>
        <h2 className="bk-confirm-title">Appointment Confirmed!</h2>
        <p className="bk-confirm-sub">See you soon, {name || 'there'}.</p>
        <div className="bk-confirm-details">
          <div className="bk-detail-row"><span>📅 Date</span><span>{formatDisplayDate(booking.date)}</span></div>
          <div className="bk-detail-row"><span>🕐 Time</span><span>{formatSlotLabel(booking.timeSlot, booking.date, selectedTz)} ({getTzAbbr(selectedTz)})</span></div>
          <div className="bk-detail-row"><span>📋 Booking ID</span><span>{booking.id}</span></div>
          <div className="bk-detail-row bk-meet-row">
            <span>🎥 Google Meet</span>
            <a href={booking.meetLink} target="_blank" rel="noreferrer">{booking.meetLink}</a>
          </div>
        </div>
        <p className="bk-confirm-note">A confirmation has been saved. Please save your Google Meet link above.</p>
        <button className="bk-btn-gold" onClick={onDismiss}>Go to Website</button>
      </div>
    );
  }

  // ── Booking form ────────────────────────────────────────────────
  return (
    <div className="bk-wrap">
      <h2 className="bk-title">SCHEDULE YOUR SERVICE</h2>
      <p className="bk-subtitle">Schedule a free online quotation.</p>

      <div className="bk-card">
        {/* ── LEFT: Calendar ── */}
        <div className="bk-col bk-cal-col">
          <div className="bk-cal-nav">
            <button onClick={prevMonth} className="bk-nav-btn">‹</button>
            <span className="bk-cal-month">{MONTHS[viewMonth - 1]} {viewYear}</span>
            <button onClick={nextMonth} className="bk-nav-btn">›</button>
          </div>
          <div className="bk-cal-grid">
            {DAYS.map(d => <div key={d} className="bk-cal-dow">{d}</div>)}
            {calDays.map((day, i) => {
              if (day === null) return <div key={`e${i}`} />;
              const ds = toDateStr(viewYear, viewMonth, day);
              const avail = isAvailable(day);
              const sel = selectedDate === ds;
              return (
                <div
                  key={day}
                  className={`bk-cal-day${avail ? ' avail' : ' unavail'}${sel ? ' selected' : ''}`}
                  onClick={() => selectDate(day)}
                >
                  {day}
                </div>
              );
            })}
          </div>
          {errors.date && <p className="bk-err">{errors.date}</p>}
        </div>

        {/* ── MIDDLE: Time ── */}
        <div className="bk-col bk-time-col">
          <div className="bk-tz-row">
            <span className="bk-tz-label">Time Zone:</span>
            <select className="bk-tz-select" value={selectedTz} onChange={e => setSelectedTz(e.target.value)}>
              {TIME_ZONES.map(tz => (
                <option key={tz.id} value={tz.id}>{tz.label}</option>
              ))}
            </select>
          </div>
          <div className="bk-tz-abbr">({getTzAbbr(selectedTz)})</div>

          {selectedDate && (
            <>
              <div className="bk-selected-date">{formatDisplayDate(selectedDate)}</div>
              <div className="bk-slots">
                {PDT_SLOTS.map(slot => {
                  const past   = isPastSlot(slot, selectedDate);
                  const booked = bookedSlots.includes(slot);
                  const disabled = past || booked;
                  const active = selectedSlot === slot;
                  return (
                    <button
                      key={slot}
                      className={`bk-slot${active ? ' active' : ''}${disabled ? ' disabled' : ''}`}
                      disabled={disabled}
                      onClick={() => setSelectedSlot(slot)}
                    >
                      {formatSlotLabel(slot, selectedDate, selectedTz)}
                    </button>
                  );
                })}
              </div>
              {errors.slot && <p className="bk-err">{errors.slot}</p>}
            </>
          )}
          {!selectedDate && <p className="bk-pick-hint">← Pick a date first</p>}
        </div>

        {/* ── RIGHT: Contact info ── */}
        <div className="bk-col bk-contact-col">
          {/* Phone */}
          <div className="bk-field">
            <label className="bk-label">Phone*</label>
            <div className="bk-phone-row">
              <select
                className="bk-prefix-select"
                value={phonePrefix}
                onChange={e => setPhonePrefix(e.target.value)}
              >
                {PHONE_PREFIXES.map(p => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
              <input
                className="bk-input"
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Phone number"
              />
            </div>
            {errors.phone && <p className="bk-err">{errors.phone}</p>}
          </div>

          {/* Country */}
          <div className="bk-field">
            <label className="bk-label">Country/Region*</label>
            <select
              className="bk-select"
              value={country}
              onChange={e => { setCountry(e.target.value); setCity(''); setZip(''); }}
            >
              <option value="">Select country</option>
              {COUNTRIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
            </select>
            {errors.country && <p className="bk-err">{errors.country}</p>}
          </div>

          {/* Address */}
          <div className="bk-field">
            <label className="bk-label">Address*</label>
            <input
              className="bk-input"
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="Street address"
            />
            {errors.address && <p className="bk-err">{errors.address}</p>}
          </div>

          {/* City */}
          <div className="bk-field">
            <label className="bk-label">City*</label>
            <select
              className="bk-select"
              value={city}
              onChange={e => { setCity(e.target.value); setZip(''); }}
              disabled={!country}
            >
              <option value="">Select city</option>
              {cityOptions.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
            </select>
            {errors.city && <p className="bk-err">{errors.city}</p>}
          </div>

          {/* Zip */}
          <div className="bk-field">
            <label className="bk-label">Zip/Postal*</label>
            <select
              className="bk-select"
              value={zip}
              onChange={e => setZip(e.target.value)}
              disabled={!city}
            >
              <option value="">Select zip/postal</option>
              {zipOptions.map(z => <option key={z} value={z}>{z}</option>)}
            </select>
            {errors.zip && <p className="bk-err">{errors.zip}</p>}
          </div>
        </div>
      </div>

      <button className="bk-btn-gold" onClick={handleBook}>Book Now</button>
    </div>
  );
}
