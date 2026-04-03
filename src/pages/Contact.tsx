import { useNavigate } from 'react-router-dom'
import SiteFooter from '../components/SiteFooter'

export default function Contact() {
  const navigate = useNavigate()
  return (
    <div style={{ width: '100vw', minHeight: '100vh' }}>
      <SiteFooter
        entered={true}
        onHome={() => navigate('/')}
        onAbout={() => navigate('/about')}
        onProducts={() => navigate('/products')}
        onOurWork={() => navigate('/our-work')}
        onContact={() => {}}
        onBookNow={() => navigate('/')}
      />
    </div>
  )
}
