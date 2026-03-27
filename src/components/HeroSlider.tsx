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
    <section style={{ margin: 0, padding: 0 }}>

      {/* Title image — exact last frame of Intro_title.mp4, same objectFit:cover
          + 100vh sizing as the video for pixel-perfect seamless transition. */}
      {/* Title stays at 100vh + objectFit:cover + center — identical to the video,
          so the transition is pixel-perfect seamless. */}
      <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
        <img
          src="/title.jpg"
          alt="A1 Home Remodeling Inc"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
        />
      </div>

      {/* Slider is pulled UP with a negative margin so it starts just below
          the title text. max(10vw, 18vh) scales correctly on both landscape
          desktop and portrait mobile. */}
      <div style={{ overflow: 'hidden', width: '100%', marginTop: 'calc(-100vh + max(10vw, 18vh))', position: 'relative' }}>
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
