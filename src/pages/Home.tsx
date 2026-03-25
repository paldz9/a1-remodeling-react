import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import ChatWidget from '../components/ChatWidget';
import Footer from '../components/Footer';
import WelcomeForm from '../components/WelcomeForm';

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [yearsCount, setYearsCount] = useState(0);

  const videoFloatRef  = useRef<HTMLDivElement>(null);
  const videoLabelRef  = useRef<HTMLDivElement>(null);
  const videoSlotRef   = useRef<HTMLDivElement>(null);
  const videoTargetRef = useRef<HTMLDivElement>(null);

  const PRODUCTS = [
    {
      label: 'Weather Defense Exterior Coating',
      warranty: 'Lifetime Warranted',
      desc: 'Advanced moisture-resistant coating shields your home from UV rays, rain, and harsh weather — while delivering a fresh, polished curb appeal that lasts for life.',
      src: 'https://static.wixstatic.com/media/6b5032_79aff2f8009e429bba41a97f824c2137~mv2.jpg/v1/fill/w_900,h_1100,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/6b5032_79aff2f8009e429bba41a97f824c2137~mv2.jpg',
    },
    {
      label: 'High Performance Windows',
      warranty: 'Lifetime Warranted',
      desc: 'Energy Star certified windows that block UV rays, reduce heat gain, cut noise, and slash utility bills — backed by the strongest warranty in the industry.',
      src: 'https://static.wixstatic.com/media/6b5032_6e245b00b1434806ab9d32aa908e95d9~mv2.jpg/v1/fill/w_900,h_1100,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/6b5032_6e245b00b1434806ab9d32aa908e95d9~mv2.jpg',
    },
    {
      label: 'Heat Reflecting Roofing',
      warranty: '30 Years Warranted',
      desc: "Certified cool-roof technology that reflects solar heat, lowers your cooling costs significantly, and holds up against LA's toughest weather for decades.",
      src: 'https://static.wixstatic.com/media/6b5032_f478df73e2134788868f3a113f84d717~mv2.jpg/v1/fill/w_900,h_1100,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/6b5032_f478df73e2134788868f3a113f84d717~mv2.jpg',
    },
  ] as const;

  // Scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.anim-item').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Years counter
  useEffect(() => {
    let n = 0;
    const t = setInterval(() => {
      n++;
      setYearsCount(n);
      if (n >= 21) { setYearsCount(21); clearInterval(t); }
    }, 40);
    return () => clearInterval(t);
  }, []);

  // Floating video animation
  useEffect(() => {
    const videoFloat = videoFloatRef.current;
    const videoLabel = videoLabelRef.current;
    const slotEl     = videoSlotRef.current;
    const targetEl   = videoTargetRef.current;
    if (!videoFloat || !videoLabel || !slotEl || !targetEl) return;

    const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
    const lerp  = (a: number, b: number, t: number) => a + (b - a) * t;
    const ease  = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

    function update() {
      const slot   = slotEl!.getBoundingClientRect();
      const target = targetEl!.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = clamp((vh - target.top) / vh, 0, 1);
      const p = ease(raw);
      videoFloat!.style.left         = lerp(slot.left,   target.left,   p) + 'px';
      videoFloat!.style.top          = lerp(slot.top,    target.top,    p) + 'px';
      videoFloat!.style.width        = lerp(slot.width,  target.width,  p) + 'px';
      videoFloat!.style.height       = lerp(slot.height, target.height, p) + 'px';
      videoFloat!.style.borderRadius = lerp(6, 0, p) + 'px';
      videoLabel!.style.opacity      = String(clamp((p - 0.8) / 0.2, 0, 1));
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    const timer = setTimeout(update, 60);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      clearTimeout(timer);
    };
  }, []);

  // Green products — simple scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    const greenCards = document.querySelectorAll('.green-product-row');
    greenCards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-main">
      {showWelcome && <WelcomeForm onDismiss={() => setShowWelcome(false)} />}

      {/* ── HERO WRAP ── */}
      <div className="hero-wrap">
        <div className="hero-top-line"></div>

        <nav className="hm-navbar">
          <div className="brand-inspo">A1 HOME REMODELING INC.</div>
          <div className="nav-links">
            <a href="#hero">HOME</a>
            <a href="#about">ABOUT</a>
            <a href="#services">SERVICES</a>
            <a href="#gallery">GALLERY</a>
            <Link to="/appointment">CONTACT</Link>
          </div>
        </nav>

        <div className="hero-inspo" id="hero">
          <div className="hero-left">
            <div className="hero-eyebrow animate-left delay-1">— SINCE 2002 —</div>
            <h1 className="hero-title animate-left delay-2">A1 HOME</h1>
            <div className="hero-sub animate-left delay-3">REMODELING INC.</div>
            <div className="hero-location animate-left delay-4">CULVER CITY / LOS ANGELES</div>
          </div>
          <div className="hero-right">
            <span className="license animate-right delay-1">CSLB #1059945</span><br />
            <span className="animate-right delay-2">
              <span className="years-counter">{yearsCount}</span> YEARS EXPERIENCE
            </span><br />
            <span className="animate-right delay-3">LICENSED • BONDED • INSURED</span><br />
            <div className="animate-right delay-4" style={{ marginTop: '1rem', fontSize: '.9rem' }}>
              <Link to="/appointment" className="quote-link">Schedule a Free Online Quote</Link><br />
              424 345 2274 / 855 247 1019
            </div>
          </div>
        </div>
      </div>

      {/* ── TWO-COLUMN ROW ── */}
      <div className="two-col">
        <div className="col-left">
          <Link to="/appointment" className="btn-quote">GET YOUR QUOTATION NOW</Link>
          <div className="scroll-hint">
            <span>Scroll Down</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="#1a1a1a" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </div>
        </div>
        <div className="video-slot" ref={videoSlotRef}></div>
      </div>

      {/* ── VIDEO LANDING ZONE ── */}
      <div className="video-landing">
        <div className="video-target" ref={videoTargetRef}></div>
      </div>

      {/* ── FLOATING VIDEO ── */}
      <div className="video-float" ref={videoFloatRef}>
        <video autoPlay muted loop playsInline>
          <source src="/video.mp4" type="video/mp4" />
        </video>
        <div className="video-float-label" ref={videoLabelRef}>
          A1 HOME REMODELING — CULVER CITY, CA
        </div>
      </div>

      {/* ── GALLERY SECTION ── */}
      <section className="overlap-section" id="gallery">
        <div className="overlap-inner">
          <div className="overlap-text">
            <div className="overlap-eyebrow anim-item anim-d1">Our Work</div>
            <h2 className="overlap-heading anim-item anim-d2">Professional Services</h2>
            <div className="overlap-divider anim-item anim-d3"></div>
            <p className="overlap-desc anim-item anim-d4">
              With our constantly growing product inventory, there are many options to choose from
              when you decide to work with us. Our success stems from our commitment to uphold the
              highest standards of excellence for every project we're involved in. We follow all
              codes and bylaws and never take any shortcuts.
            </p>
            <a className="overlap-link anim-item anim-d5" href="#">
              View Our List of Products →
            </a>
          </div>

          <div className="overlap-stack">
            <div className="stack-img img-1 anim-item anim-from-right anim-d2">
              <img
                src="https://static.wixstatic.com/media/6b5032_96af6fc611df4e158798930c3955867c~mv2.jpg/v1/fill/w_320,h_380,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/6b5032_96af6fc611df4e158798930c3955867c~mv2.jpg"
                alt="Remodeling Project 1"
              />
            </div>
            <div className="stack-img img-2 anim-item anim-from-right anim-d3">
              <img
                src="https://static.wixstatic.com/media/6b5032_057d8bf8f5034cee9cf71c702f9f2f45~mv2.jpg/v1/fill/w_330,h_380,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/6b5032_057d8bf8f5034cee9cf71c702f9f2f45~mv2.jpg"
                alt="Remodeling Project 2"
              />
            </div>
            <div className="stack-img img-3 anim-item anim-from-right anim-d4">
              <img
                src="https://static.wixstatic.com/media/6b5032_8820e2a1ab5842569ffedc1a21b10185~mv2.jpg/v1/fill/w_330,h_380,fp_0.50_0.50,lg_1,q_80,enc_avif,quality_auto/6b5032_8820e2a1ab5842569ffedc1a21b10185~mv2.jpg"
                alt="Remodeling Project 3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── GREEN PRODUCTS ── */}
      <section className="green-section" id="green-products">
        <div className="green-top-header anim-item anim-d1">
          <div className="green-eyebrow-label">Our Products</div>
          <h2 className="green-heading">Our Green Products</h2>
          <div className="green-divider"></div>
        </div>

        <div className="green-products-list">
          {PRODUCTS.map((p, i) => (
            <div key={i} className="green-product-row anim-item">
              <div className="green-card">
                <div className="green-card-number">0{i + 1}</div>
                <h3 className="green-card-title">{p.label}</h3>
                <div className="green-card-warranty">{p.warranty}</div>
                <p className="green-card-desc">{p.desc}</p>
              </div>
              <div className="green-product-img">
                <img src={p.src} alt={p.label} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BLOG SECTION ── */}
      <section className="blog-section" id="blog">
        <div className="blog-inner">
          <div className="blog-header anim-item anim-d1">
            <div className="blog-eyebrow">Latest News</div>
            <h2 className="blog-heading">From Our Blog</h2>
            <div className="overlap-divider" style={{ margin: '1rem auto 0' }}></div>
          </div>
          <div className="blog-grid">

            <article className="blog-card anim-item anim-d2">
              <div className="blog-img-wrap">
                <img
                  src="https://static.wixstatic.com/media/6b5032_96af6fc611df4e158798930c3955867c~mv2.jpg/v1/fill/w_600,h_380,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/6b5032_96af6fc611df4e158798930c3955867c~mv2.jpg"
                  alt="Kitchen Remodel Tips"
                />
              </div>
              <div className="blog-card-body">
                <div className="blog-meta">
                  <span className="blog-category">Kitchen</span>
                  <span className="blog-date">March 5, 2025</span>
                </div>
                <h3 className="blog-title">Top Kitchen Remodel Trends for 2025</h3>
                <p className="blog-excerpt">Discover the latest design ideas and materials transforming modern kitchens in Los Angeles homes this year.</p>
                <a className="blog-read-more" href="#">Read More →</a>
              </div>
            </article>

            <article className="blog-card anim-item anim-d3">
              <div className="blog-img-wrap">
                <img
                  src="https://static.wixstatic.com/media/6b5032_057d8bf8f5034cee9cf71c702f9f2f45~mv2.jpg/v1/fill/w_600,h_380,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/6b5032_057d8bf8f5034cee9cf71c702f9f2f45~mv2.jpg"
                  alt="Bathroom Renovation Guide"
                />
              </div>
              <div className="blog-card-body">
                <div className="blog-meta">
                  <span className="blog-category">Bathroom</span>
                  <span className="blog-date">February 18, 2025</span>
                </div>
                <h3 className="blog-title">How to Plan a Bathroom Renovation</h3>
                <p className="blog-excerpt">A step-by-step guide to planning your bathroom remodel — from budgeting to selecting the right fixtures.</p>
                <a className="blog-read-more" href="#">Read More →</a>
              </div>
            </article>

            <article className="blog-card anim-item anim-d4">
              <div className="blog-img-wrap">
                <img
                  src="https://static.wixstatic.com/media/6b5032_8820e2a1ab5842569ffedc1a21b10185~mv2.jpg/v1/fill/w_600,h_380,fp_0.50_0.50,lg_1,q_80,enc_avif,quality_auto/6b5032_8820e2a1ab5842569ffedc1a21b10185~mv2.jpg"
                  alt="ADU Construction"
                />
              </div>
              <div className="blog-card-body">
                <div className="blog-meta">
                  <span className="blog-category">ADU</span>
                  <span className="blog-date">January 30, 2025</span>
                </div>
                <h3 className="blog-title">ADU Construction: What You Need to Know</h3>
                <p className="blog-excerpt">Accessory Dwelling Units are a great investment. Learn the permits, costs, and timelines involved in building an ADU in California.</p>
                <a className="blog-read-more" href="#">Read More →</a>
              </div>
            </article>

          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />

    </div>
  );
}
