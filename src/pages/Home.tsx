import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [yearsCount, setYearsCount] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const curvedImages = [
    'https://static.wixstatic.com/media/6b5032_903f145a2f924efbb649c5edbda448db~mv2.jpg/v1/fill/w_1010,h_673,q_85,usm_0.66_1.00_0.01/6b5032_903f145a2f924efbb649c5edbda448db~mv2.jpg',
    'https://static.wixstatic.com/media/6b5032_f7a5a5f5a49b4c05815de9fdd42cd956~mv2.jpg/v1/fill/w_1010,h_673,q_85,usm_0.66_1.00_0.01/6b5032_f7a5a5f5a49b4c05815de9fdd42cd956~mv2.jpg',
    'https://static.wixstatic.com/media/6b5032_851a3a52b0234104b2a2fe0531b314b9~mv2.jpg/v1/fill/w_1010,h_917,q_85,usm_0.66_1.00_0.01/6b5032_851a3a52b0234104b2a2fe0531b314b9~mv2.jpg',
    'https://static.wixstatic.com/media/6b5032_d870bfa869264a14a545258a13fcbe7f~mv2.jpg/v1/fill/w_1010,h_745,q_85,usm_0.66_1.00_0.01/6b5032_d870bfa869264a14a545258a13fcbe7f~mv2.jpg',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop'
  ];

  useEffect(() => {
    const target = 21;
    let current = 0;
    const increment = 1;
    const stepTime = 40;
    const counter = setInterval(() => {
      current += increment;
      setYearsCount(current);
      if (current >= target) {
        setYearsCount(target);
        clearInterval(counter);
      }
    }, stepTime);

    return () => clearInterval(counter);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % curvedImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [curvedImages.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    const elements = document.querySelectorAll('.reveal-section');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleShowModal = (msg: string) => {
    setModalMessage(msg);
    setShowModal(true);
  };

  const handleServiceClick = (service: string) => {
    let msg = '';
    if (service === 'roofing') msg = 'Learn more about our heat reflective roofing systems.';
    else if (service === 'windows') msg = 'Explore energy-efficient windows and doors.';
    else if (service === 'coating') msg = 'High performance coating systems protect your home.';
    else if (service === 'planning') msg = 'Space planning & design: smart layouts.';
    else msg = 'More details coming soon.';
    handleShowModal(msg);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleShowModal('Thanks for submitting! We\'ll contact you soon.');
  };

  const handleNewsletterSubmit = () => {
    handleShowModal('Subscribed! Thank you.');
  };

  return (
    <div className="home-page">
      <button className="back-to-top" id="backToTop" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        ↑
      </button>

      <div className="navbar" id="navbar">
        <div className="brand-inspo">A1 HOME REMODELING INC.</div>
        <div className="nav-links">
          <a href="#hero">HOME</a>
          <a href="#about">ABOUT</a>
          <a href="#services">PROPERTIES</a>
          <a href="#services">SERVICES</a>
          <a href="#carousel">GALLERY</a>
          <a href="#blog">BLOG</a>
          <a href="#contact">CONTACTS</a>
        </div>
      </div>

      <div className="hero-inspo" id="hero">
        <div className="hero-left">
          <div className="hero-eyebrow animate-left delay-1">— SINCE 2002 —</div>
          <h1 className="hero-title animate-left delay-2">A1 HOME</h1>
          <div className="hero-sub animate-left delay-3">REMODELING INC.</div>
          <div className="hero-location animate-left delay-4">CULVER CITY / LOS ANGELES</div>
        </div>
        <div className="hero-right">
          <span className="license animate-right delay-1">CSLB #1059945</span><br />
          <span className="animate-right delay-2"><span className="years-counter">{yearsCount}</span> YEARS EXPERIENCE</span><br />
          <span className="animate-right delay-3">LICENSED • BONDED • INSURED</span><br />
          <div className="animate-right delay-4" style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
            <Link to="/appointment" className="quote-link">Schedule a Free Online Quote</Link><br />
            424 345 2274 / 855 247 1019
          </div>
        </div>
      </div>

      <div className="quote-button-container">
        <Link to="/appointment" className="btn-quote">GET YOUR QUOTATION NOW</Link>
      </div>

      <div className="curve-carousel">
        <div className="carousel-slides">
          {curvedImages.map((img, idx) => (
            <img
              key={idx}
              className={`carousel-slide-img ${idx === currentSlide ? 'active' : ''}`}
              src={img}
              alt={`modern house construction ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="mission-statement reveal-section">
        <h2>Welcome To A1 Home Remodeling Inc.</h2>
        <p>Our mission is simple: to provide high-quality services for our valued clients. Our team goes above and beyond to cater to each project's specific needs.</p>
        <p>Through open communication and exceptional service, we hope you'll find what you're looking for with our Home Improvement Services.</p>
      </div>

      <div className="services-arch reveal-section" id="services">
        <div className="section-label">— PROFESSIONAL SERVICES —</div>
        <div className="service-grid">
          <div className="service-item" onClick={() => handleServiceClick('roofing')}>
            <div className="service-num">01</div>
            <h3>HEAT REFLECTIVE ROOFING SYSTEMS</h3>
            <p>Energy‑efficient, durable roofing that reflects heat and lowers bills.</p>
            <img className="service-img" src="https://static.wixstatic.com/media/6b5032_903f145a2f924efbb649c5edbda448db~mv2.jpg/v1/fill/w_1010,h_673,q_85,usm_0.66_1.00_0.01/6b5032_903f145a2f924efbb649c5edbda448db~mv2.jpg" alt="roofing" />
          </div>
          <div className="service-item" onClick={() => handleServiceClick('windows')}>
            <div className="service-num">02</div>
            <h3>ENERGY EFFICIENT WINDOWS + DOORS</h3>
            <p>Premium windows & doors designed for insulation and modern style.</p>
            <img className="service-img" src="https://static.wixstatic.com/media/6b5032_f7a5a5f5a49b4c05815de9fdd42cd956~mv2.jpg/v1/fill/w_1010,h_673,q_85,usm_0.66_1.00_0.01/6b5032_f7a5a5f5a49b4c05815de9fdd42cd956~mv2.jpg" alt="windows and doors" />
          </div>
          <div className="service-item" onClick={() => handleServiceClick('coating')}>
            <div className="service-num">03</div>
            <h3>HIGH PERFORMANCE COATING SYSTEM</h3>
            <p>Protective coatings that extend the life of your surfaces.</p>
            <img className="service-img" src="https://static.wixstatic.com/media/6b5032_d870bfa869264a14a545258a13fcbe7f~mv2.jpg/v1/fill/w_1010,h_745,q_85,usm_0.66_1.00_0.01/6b5032_d870bfa869264a14a545258a13fcbe7f~mv2.jpg" alt="coating system" />
          </div>
          <div className="service-item" onClick={() => handleServiceClick('planning')}>
            <div className="service-num">04</div>
            <h3>SPACE PLANNING & DESIGN</h3>
            <p>Smart, refined layouts that harmonize with your lifestyle.</p>
            <img className="service-img" src="https://static.wixstatic.com/media/6b5032_d870bfa869264a14a545258a13fcbe7f~mv2.jpg/v1/fill/w_1010,h_745,q_85,usm_0.66_1.00_0.01/6b5032_d870bfa869264a14a545258a13fcbe7f~mv2.jpg" alt="space planning" />
          </div>
        </div>
      </div>

      <div className="showcase reveal-section" id="gallery">
        <div className="showcase-header">
          <h3>PROPERTY SHOWCASE</h3>
          <span>ELEGANT • HIGH-IMPACT</span>
        </div>
        <div className="area-grid">
          <div className="area-card">
            <img src="https://static.wixstatic.com/media/6b5032_46765e7ce6814ab09a6645b9e958d627~mv2.jpg/v1/fill/w_1920,h_1440,q_90,enc_avif,quality_auto/6b5032_46765e7ce6814ab09a6645b9e958d627~mv2.jpg" alt="living room" />
            <h4>Living Room</h4>
            <p>21 m²</p>
            <span className="dim">226 sq ft</span>
          </div>
          <div className="area-card">
            <img src="https://static.wixstatic.com/media/6b5032_5bd476ba49d54800863cd9d93548d29b~mv2.jpg/v1/fill/w_1920,h_1440,q_90,enc_avif,quality_auto/6b5032_5bd476ba49d54800863cd9d93548d29b~mv2.jpg" alt="dining room" />
            <h4>Dining Room</h4>
            <p>9.3 m²</p>
            <span className="dim">100 sq ft</span>
          </div>
          <div className="area-card">
            <img src="https://static.wixstatic.com/media/6b5032_8bb814dcfc27415c8078e87ecdcb3d97~mv2.jpg/v1/fill/w_1920,h_1440,q_90,enc_avif,quality_auto/6b5032_8bb814dcfc27415c8078e87ecdcb3d97~mv2.jpg" alt="kitchen" />
            <h4>Studio-Kitchen</h4>
            <p>9.6 m²</p>
            <span className="dim">103 sq ft</span>
          </div>
          <div className="area-card">
            <img src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2070&auto=format&fit=crop" alt="tv lounge" />
            <h4>TV Lounge</h4>
            <p>flexible</p>
            <span className="dim">—</span>
          </div>
          <div className="area-card">
            <img src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974&auto=format&fit=crop" alt="master bedroom" />
            <h4>Master Bedroom</h4>
            <p>18 m² approx</p>
            <span className="dim">194 sq ft</span>
          </div>
          <div className="area-card">
            <img src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2071&auto=format&fit=crop" alt="guest bedroom" />
            <h4>Guest Bedroom</h4>
            <p>12 m² approx</p>
            <span className="dim">129 sq ft</span>
          </div>
          <div className="area-card">
            <img src="https://images.unsplash.com/photo-1558882224-dda1667334bb?q=80&w=2069&auto=format&fit=crop" alt="hallway" />
            <h4>Hallways + Wardrobe</h4>
            <p>included</p>
            <span className="dim">—</span>
          </div>
        </div>
      </div>

      <div className="carousel-section reveal-section" id="carousel">
        <div className="carousel-header">
          <h3>GALLERY</h3>
          <span>AUTOMATIC SCROLL · PAUSE ON HOVER</span>
        </div>
        <div className="carousel-container">
          <div className="carousel-track">
            {[...Array(2)].map((_, setIdx) => (
              <div key={setIdx} style={{ display: 'flex' }}>
                <div className="carousel-slide"><img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" alt="roofing" /></div>
                <div className="carousel-slide"><img src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=2070&auto=format&fit=crop" alt="windows" /></div>
                <div className="carousel-slide"><img src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop" alt="coating" /></div>
                <div className="carousel-slide"><img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop" alt="design" /></div>
                <div className="carousel-slide"><img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2158&auto=format&fit=crop" alt="living" /></div>
                <div className="carousel-slide"><img src="https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=2070&auto=format&fit=crop" alt="dining" /></div>
                <div className="carousel-slide"><img src="https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=2168&auto=format&fit=crop" alt="kitchen" /></div>
                <div className="carousel-slide"><img src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2070&auto=format&fit=crop" alt="lounge" /></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="blog-section reveal-section" id="blog">
        <div className="blog-header">
          <h3>LATEST FROM THE BLOG</h3>
          <span>INSIGHTS & UPDATES</span>
        </div>
        <div className="blog-grid">
          <article className="blog-card" onClick={() => handleShowModal('5 tips for energy-efficient roofing - read full article on our blog.')}>
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" alt="roofing tips" />
            <div className="blog-content">
              <div className="blog-date">MARCH 10, 2026</div>
              <h4>5 Tips for Energy-Efficient Roofing</h4>
              <p>Reduce your cooling bills with reflective materials and proper insulation. Learn how to choose the best system for your home.</p>
              <span className="blog-link">READ MORE</span>
            </div>
          </article>
          <article className="blog-card" onClick={() => handleShowModal('Window replacement guide: when to upgrade and what to choose.')}>
            <img src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=2070&auto=format&fit=crop" alt="windows guide" />
            <div className="blog-content">
              <div className="blog-date">FEBRUARY 22, 2026</div>
              <h4>Window Replacement: A Homeowner's Guide</h4>
              <p>Double-pane, low-E coatings, and proper installation – everything you need to know before upgrading your windows.</p>
              <span className="blog-link">READ MORE</span>
            </div>
          </article>
          <article className="blog-card" onClick={() => handleShowModal('Sustainable materials for modern home remodeling.')}>
            <img src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2070&auto=format&fit=crop" alt="sustainable materials" />
            <div className="blog-content">
              <div className="blog-date">JANUARY 15, 2026</div>
              <h4>Eco-Friendly Materials for Your Remodel</h4>
              <p>From recycled steel to low-VOC paints, discover sustainable options that last and reduce your carbon footprint.</p>
              <span className="blog-link">READ MORE</span>
            </div>
          </article>
        </div>
      </div>

      <div className="contact-block reveal-section" id="contact">
        <div className="contact-item">
          <h5>LOCATION</h5>
          <p>400 Corporate Point Suite 300<br />Culver City, CA 90230</p>
          <p>424 345 2274</p>
          <p>customercare@a1hrinc.com</p>
        </div>
        <div className="contact-item">
          <h5>CULVER CITY / LA</h5>
          <p>400 Corporate Point Ste 300<br />Culver City, CA 90230</p>
          <p>424 345 2274</p>
          <p>a1hr.david@gmail.com</p>
        </div>
        <div className="contact-item">
          <h5>HOURS</h5>
          <p>Mon–Fri 8:00 – 18:00<br />Sat by appointment</p>
        </div>
      </div>

      <div className="form-collect reveal-section">
        <h3>CONTACT US</h3>
        <form onSubmit={handleFormSubmit}>
          <div className="form-row">
            <input type="text" placeholder="Name" required style={{ flex: 1 }} />
            <input type="email" placeholder="Email" required style={{ flex: 1 }} />
          </div>
          <div className="form-row">
            <input type="text" placeholder="Address" style={{ flex: 2 }} />
            <input type="tel" placeholder="Phone" style={{ flex: 1 }} />
          </div>
          <div className="form-row">
            <input type="text" placeholder="Subject" />
          </div>
          <div className="form-row">
            <textarea rows={3} placeholder="Your message..."></textarea>
          </div>
          <button className="btn-raw" type="submit">SUBMIT</button>
        </form>
      </div>

      <div className="newsletter-mini reveal-section">
        <span>SUBSCRIBE</span>
        <input type="email" placeholder="Email Address" />
        <button onClick={handleNewsletterSubmit}>Submit</button>
      </div>

      <div className="about-editorial reveal-section" id="about">
        <h2>ABOUT US</h2>
        <div className="lead-txt">We see the future with every home to create sustainable clean energy reducing our carbon footprint, and leaving a healthy legacy for our children.</div>
        <p>For each of our services we have experienced professionals that will handle your project with detail and care.</p>
        
        <div className="about-image-row">
          <img src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2070&auto=format&fit=crop" alt="solar sustainable home" />
          <img src="https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=2070&auto=format&fit=crop" alt="green energy" />
          <img src="https://images.unsplash.com/photo-1558030137-095c21d3ab47?q=80&w=2070&auto=format&fit=crop" alt="remodeling team" />
        </div>

        <div style={{ marginTop: '2.5rem', background: '#f0f0f0', padding: '2rem', maxWidth: '700px' }}>
          <span style={{ fontWeight: 600 }}>CULVER CITY / LA</span><br />
          400 Corporate Point Ste 300, Culver City, CA 90230<br />
          📞 424 345 2274 · ✉️ a1hr.david@gmail.com
        </div>
      </div>

      <div className="about-footer-note reveal-section">
        A1 HOME REMODELING INC. — CSLB #1059945 — 21 YEARS — LICENSED & INSURED
      </div>

      {showModal && (
        <div className="modal active" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p>{modalMessage}</p>
            <button onClick={() => setShowModal(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}
