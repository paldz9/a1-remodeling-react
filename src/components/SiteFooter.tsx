const EASE = 'cubic-bezier(0.65, 0.01, 0.05, 0.99)'

interface Props {
  entered: boolean
  onHome?: () => void
  onAbout?: () => void
  onProducts?: () => void
  onOurWork?: () => void
  onContact?: () => void
  onBookNow?: () => void
}

export default function SiteFooter({ entered, onHome, onAbout, onProducts, onOurWork, onContact, onBookNow }: Props) {
  const linkStyle: React.CSSProperties = {
    fontFamily: "'Poppins', sans-serif", fontWeight: 400,
    fontSize: 'min(1.1vw, 1.96vh)', color: 'rgba(255,255,255,0.7)',
    textDecoration: 'none', lineHeight: 1.7, display: 'block',
    transition: 'color 0.2s ease',
  }

  return (
    <div style={{
      width: '100%', height: '100%',
      backgroundColor: '#000000',
      display: 'flex', overflow: 'hidden',
    }}>

      {/* ── LEFT: Company title image ── */}
      <div style={{
        flex: '0 0 auto',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 3rem 0 min(9vw, 9rem)',
        overflow: 'hidden',
      }}>
        <img
          src="/A1 Home Remodeling Inc - End Title.png"
          alt="A1 Home Remodeling Inc"
          style={{
            height: 'min(78vh, 680px)',
            width: 'auto',
            display: 'block',
            transform: entered ? 'translateX(0)' : 'translateX(-120%)',
            opacity: entered ? 1 : 0,
            transition: `transform 1.1s ${EASE}, opacity 0.7s ease`,
          }}
        />
      </div>

      {/* ── RIGHT: Newsletter + Nav + Contact + Footer ── */}
      <div style={{
        flex: 1,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'min(8vh, 5rem) min(9vw, 9rem) 3rem min(4vw, 4rem)',
        opacity: entered ? 1 : 0,
        transform: entered ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 1.0s ease 0.3s, transform 1.0s ${EASE} 0.3s`,
      }}>

        {/* Newsletter */}
        <div>
          <p style={{
            fontFamily: "'helvetica-lt-pro', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontWeight: 700, fontSize: 'min(3.2vw, 5.7vh)',
            color: '#ffffff', margin: '0 0 1.2rem 0',
          }}>
            Subscribe to our Newsletter!
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.4)', paddingBottom: '0.6rem' }}>
            <input
              type="email"
              placeholder="Enter your email address"
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                fontFamily: "'Poppins', sans-serif", fontWeight: 300,
                fontSize: 'min(1.3vw, 2.3vh)', color: 'rgba(255,255,255,0.5)',
                padding: '0.3rem 0',
              }}
              onFocus={e => (e.currentTarget.style.color = '#ffffff')}
              onBlur={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
            />
            <button style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              color: '#ffffff', fontSize: 'min(1.6vw, 2.85vh)', padding: '0 0.25rem',
              lineHeight: 1,
            }}>→</button>
          </div>
        </div>

        {/* Nav + Contact */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: 'min(6vw, 10vh)', width: '100%' }}>
          {/* Nav links */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            {(['Home', 'About us', 'Products', 'Our work', 'Contact', 'Book online'] as const).map(link => {
              const handlers: Partial<Record<string, () => void>> = {
                'Home': onHome,
                'About us': onAbout,
                'Products': onProducts,
                'Our work': onOurWork,
                'Contact': onContact,
                'Book online': onBookNow,
              }
              const handler = handlers[link]
              return (
                <a key={link} href={`#${link.toLowerCase().replace(' ', '')}`}
                  onClick={handler ? (e => { e.preventDefault(); handler() }) : undefined}
                  style={{
                    fontFamily: "'Poppins', sans-serif", fontWeight: 400,
                    fontSize: 'min(1.7vw, 3.02vh)', color: 'rgba(255,255,255,0.75)',
                    textDecoration: 'none', lineHeight: 1.9,
                    transition: 'color 0.2s ease', cursor: 'pointer',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
                >{link}</a>
              )
            })}
          </div>

          {/* Contact info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'min(3.5vh, 1.8rem)' }}>
            <a
              href="https://www.google.com/maps/search/400+Corporate+Pointe+Suite+300+Culver+City+CA+90230"
              target="_blank" rel="noopener noreferrer"
              style={linkStyle}
              onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
            >
              400 Corporate Pointe Suite 300,<br />Culver City, CA 90230
            </a>
            <a href="tel:+14243452274" style={linkStyle}
              onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
            >(424) 345-2274</a>
            <a href="mailto:customercare@a1hrinc.com" style={linkStyle}
              onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
            >customercare@a1hrinc.com</a>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'right' }}>
          <p style={{
            fontFamily: "'Poppins', sans-serif", fontWeight: 300,
            fontSize: 'min(0.9vw, 1.6vh)', color: 'rgba(255,255,255,0.4)',
            margin: 0, lineHeight: 1.8,
          }}>
            @2026 A1 Home Remodeling Inc<br />Website by Paldz
          </p>
        </div>

      </div>
    </div>
  )
}
