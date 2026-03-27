import { useState } from 'react'
import Navbar from '../components/Navbar'
import IntroVideo from '../components/IntroVideo'
import HeroSlider from '../components/HeroSlider'

export default function Home() {
  const [introDone, setIntroDone] = useState(false)

  return (
    <div>
      {/* Navbar is hidden during the intro so it doesn't interfere with the
          video-to-page pixel match. It fades in after the video ends. */}
      <Navbar visible={introDone} />
      <HeroSlider />

      {!introDone && <IntroVideo onEnd={() => setIntroDone(true)} />}
    </div>
  )
}
