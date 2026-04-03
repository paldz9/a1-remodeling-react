export default function ContactBar() {
  return (
    <div
      className="hidden md:flex"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        gap: '3rem',
        padding: '1rem 7%',
        fontFamily: "'Poppins', sans-serif",
        fontSize: '0.875rem',
        fontWeight: 400,
        color: '#111111',
      }}
    >
      {/* Address */}
      <a href="https://www.google.com/maps/search/400+Corporate+Pointe+Suite+300+Culver+City+CA+90230"
        target="_blank" rel="noopener noreferrer"
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'inherit', textDecoration: 'none', transition: 'opacity 0.2s ease' }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.65')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span>400 Corporate Point Suite 300, Culver City, CA 90230</span>
      </a>

      {/* Phone */}
      <a href="tel:+14243452274"
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'inherit', textDecoration: 'none', transition: 'opacity 0.2s ease' }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.65')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        <svg width="22" height="18" viewBox="0 0 28 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.37 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          <path d="M19 1a9 9 0 0 1 0 12" />
          <path d="M23 1a13 13 0 0 1 0 16" />
        </svg>
        <span>(424) 345-2274</span>
      </a>

      {/* Email */}
      <a href="mailto:customercare@a1hrinc.com"
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'inherit', textDecoration: 'none', transition: 'opacity 0.2s ease' }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.65')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
        <span>customercare@a1hrinc.com</span>
      </a>
    </div>
  )
}
