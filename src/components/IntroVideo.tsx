import { useState } from 'react'

interface Props {
  onEnd: () => void
}

export default function IntroVideo({ onEnd }: Props) {
  const [fading, setFading] = useState(false)

  function dismiss() {
    setFading(true)
    setTimeout(onEnd, 700)
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#fff',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.7s ease',
        pointerEvents: fading ? 'none' : 'all',
      }}
    >
      <video
        autoPlay
        muted
        playsInline
        onEnded={dismiss}
        onError={dismiss}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      >
        <source src="/Intro_title.mp4" type="video/mp4" />
      </video>
    </div>
  )
}
