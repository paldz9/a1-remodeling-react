const SLIDES = [
  '/Slide/img_1.avif',
  '/Slide/img_3.avif',
  '/Slide/img_5.avif',
  '/Slide/img_6.avif',
  '/Slide/img_7.avif',
  '/Slide/img_8.avif',
  '/Slide/img_9.avif',
  '/Slide/img_11.avif',
  '/Slide/img_13.avif',
  '/Slide/img_15.avif',
  '/Slide/img_18.avif',
  '/Slide/6b5032_851a3a52b0234104b2a2fe0531b314b9~mv2.jpg',
  '/Slide/6b5032_903f145a2f924efbb649c5edbda448db~mv2.jpg',
  '/Slide/6b5032_a8964f0eae894e6383019c3ddee684f3~mv2.jpg',
  '/Slide/6b5032_d870bfa869264a14a545258a13fcbe7f~mv2.jpg',
  '/Slide/6b5032_f7a5a5f5a49b4c05815de9fdd42cd956~mv2.jpg',
]

export default function HeroSlider() {
  const track = [...SLIDES, ...SLIDES]

  return (
    <section className="hero-root" style={{ margin: 0, paddingTop: 'calc(4rem + 0.75rem)' }}>

      {/* Company title */}
      <div style={{ width: '100%' }}>
        <img
          src="/Company Title_fixed.png"
          alt="A1 Home Remodeling Inc"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>

      {/* Image strip */}
      <div style={{ overflow: 'hidden', width: '100%', marginTop: '1.5rem', position: 'relative' }}>
        <div
          style={{
            display: 'flex',
            gap: '12px',
            width: 'max-content',
            animation: 'slide-left 60s linear infinite',
          }}
        >
          {track.map((src, i) => (
            <div
              key={i}
              className="hero-card"
              style={{
                flexShrink: 0,
                width: '480px',
                height: '320px',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <img
                src={src}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Text */}
      <div className="hero-text" style={{ padding: '2rem 44% 1rem 7%', fontFamily: "'Poppins', sans-serif" }}>
        <p style={{ marginBottom: '0.5rem', lineHeight: '1.65', fontSize: '0.95rem', fontWeight: 400 }}>
          At <strong style={{ fontWeight: 700 }}>A1 Home Remodeling Inc.,</strong> we believe a home is more than walls and roofs. It is where memories are made and life happens. That is why we treat every project with genuine care, attention, and respect for your vision.
        </p>
        <p style={{ lineHeight: '1.65', fontSize: '0.95rem', fontWeight: 400 }}>
          We listen, we understand, and we build with heart. When you choose us, you are not just getting a service, you are gaining a team that truly cares. Reach out today and let us bring your ideas to life.
        </p>
      </div>

      <style>{`
        @keyframes slide-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @media (max-width: 767px) {
          .hero-root {
            display: flex;
            flex-direction: column;
            height: 100%;
            padding-top: 60px;
          }
          .hero-card {
            width: 220px !important;
            height: 150px !important;
          }
          .hero-text {
            flex: 1;
            display: flex !important;
            flex-direction: column;
            justify-content: center;
            padding: 1.25rem 6% !important;
            text-align: center;
          }
        }
      `}</style>
    </section>
  )
}
