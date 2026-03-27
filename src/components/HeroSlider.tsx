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
]

export default function HeroSlider() {
  const track = [...SLIDES, ...SLIDES]

  return (
    <section style={{ margin: 0, paddingTop: 'calc(4rem + 0.75rem)' }}>

      {/* width: 100% / height: auto — matches the video exactly at every viewport width */}
      <div style={{ width: '100%' }}>
        <img
          src="/Company Title_fixed.png"
          alt="A1 Home Remodeling Inc"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>

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

      <style>{`
        @keyframes slide-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
