export interface Booking {
  id: string;
  name: string;
  email: string;
  timeline: string;
  phone: string;
  country: string;
  address: string;
  city: string;
  zip: string;
  date: string;       // YYYY-MM-DD
  timeSlot: number;   // PDT hour 10–17
  meetLink: string;
  createdAt: string;
}

const KEY = 'a1hr_bookings';

export function getBookings(): Booking[] {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
  catch { return []; }
}

export function getBookedSlots(date: string): number[] {
  return getBookings().filter(b => b.date === date).map(b => b.timeSlot);
}

export function saveBooking(data: Omit<Booking, 'id' | 'meetLink' | 'createdAt'>): Booking {
  // NOTE: To generate real Google Meet links, integrate with Google Calendar API:
  // 1. Create a Google Cloud project at console.cloud.google.com
  // 2. Enable the Google Calendar API
  // 3. Create OAuth2 credentials (Web application type)
  // 4. Use gapi.client.calendar.events.insert() with conferenceDataVersion=1
  //    and conferenceData: { createRequest: { requestId: uniqueId, conferenceSolutionKey: { type: 'hangoutsMeet' } } }
  // 5. The response will contain conferenceData.entryPoints[0].uri = the real Meet link
  // For now, a placeholder link in the correct Google Meet URL format is generated:
  const seg = (n: number) =>
    Array.from({ length: n }, () => 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)]).join('');
  const meetLink = `https://meet.google.com/${seg(3)}-${seg(4)}-${seg(3)}`;
  const id = Math.random().toString(36).slice(2, 9).toUpperCase();
  const booking: Booking = { ...data, id, meetLink, createdAt: new Date().toISOString() };
  const all = getBookings();
  all.push(booking);
  localStorage.setItem(KEY, JSON.stringify(all));
  return booking;
}
