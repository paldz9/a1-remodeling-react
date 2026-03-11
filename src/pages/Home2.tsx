import './Home2.css';

export default function Home2() {
  return (
    <div className="home2-page">
      <div className="website">
        <header className="global-header">
          <div className="logo"><a href="#">A1 HOME REMODELING</a></div>
          <nav className="main-nav">
            <a href="#" className="active">HOME</a>
            <a href="#">ABOUT</a>
            <a href="#">SERVICES</a>
            <a href="#">BLOG</a>
            <a href="#">CONTACT</a>
            <div className="nav-right">
              <a href="#" className="login-link">Log in</a>
              <a href="#" className="get-started-nav">GET QUOTE</a>
            </div>
          </nav>
        </header>

        <div className="hero-grid">
          <div className="text-col">
            <h1 className="hero-headline">A1 HOME REMODELING INC.</h1>
            <div className="hero-tagline">Quality built to last</div>
            <div className="hero-details">
              <div className="detail-row">
                <span className="detail-label">License:</span>
                <span className="detail-value">CSLB LIC #1059945</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Experience:</span>
                <span className="detail-value">21 Years</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Certification:</span>
                <span className="detail-value">LICENSED · BONDED · INSURED</span>
              </div>
            </div>
            <div className="spacer"></div>
          </div>
          <div className="image-col">
            <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop" alt="Modern kitchen remodel" />
          </div>
        </div>

        <div className="quote-bar">
          <div className="quote-left">
            <a href="#" className="quote-btn">SCHEDULE FREE ONLINE QUOTE</a>
            <span className="location"><i className="fas fa-map-marker-alt"></i> Culver City / LA</span>
          </div>
          <div className="quote-phones">
            <span>424 345 2274</span> | <span>855 247 1019</span>
          </div>
        </div>

        <div className="welcome-section">
          <h2><strong>Welcome To</strong> A1 Home Remodeling Inc.</h2>
          <p>Our mission at A1 Home Remodeling Inc. is simple: to provide high-quality services for our valued clients. Our team goes above and beyond to cater to each project's specific needs. Through open communication and exceptional service, we hope you'll find what you're looking for with our Home Improvement Services.</p>
        </div>

        <div className="services-section">
          <h2 className="section-title">Professional Services</h2>
          <div className="section-sub">With our constantly growing product inventory, there are many options to choose from when you decide to work with us. Our success stems from our commitment to uphold the highest standards of excellence.</div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-img" style={{backgroundImage: "url('https://images.unsplash.com/photo-1632158885262-b5a6f9f3c56b?q=80&w=2070&auto=format&fit=crop')"}}></div>
              <div className="service-content"><h3>HEAT REFLECTIVE ROOFING SYSTEMS</h3></div>
            </div>
            <div className="service-card">
              <div className="service-img" style={{backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')"}}></div>
              <div className="service-content"><h3>ENERGY EFFICIENT WINDOWS AND DOORS</h3></div>
            </div>
            <div className="service-card">
              <div className="service-img" style={{backgroundImage: "url('https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop')"}}></div>
              <div className="service-content"><h3>HIGH PERFORMANCE COATING SYSTEM</h3></div>
            </div>
          </div>
        </div>

        <div className="blog-section">
          <div className="blog-header">
            <h2>Remodeling Insights</h2>
            <p>Tips, trends, and stories from our team</p>
          </div>

          <div className="featured-blog">
            <div className="featured-blog-img" style={{backgroundImage: "url('https://images.unsplash.com/photo-1618221195710-5a7f6e6e9b8d?q=80&w=2000&auto=format&fit=crop')"}}></div>
            <div className="featured-blog-content">
              <span className="blog-category">Featured Article</span>
              <h3>5 signs it's time to replace your roof</h3>
              <p className="blog-excerpt">From missing shingles to rising energy bills, our experts share the key indicators that your roof needs attention—and how a heat-reflective system can save you money.</p>
              <div className="blog-meta">
                <span><i className="far fa-calendar"></i> March 15, 2026</span>
                <span><i className="far fa-user"></i> by David Chen</span>
              </div>
              <a href="#" className="read-more">Read full story <i className="fas fa-arrow-right"></i></a>
            </div>
          </div>

          <div className="blog-grid">
            <div className="blog-card">
              <div className="blog-card-img" style={{backgroundImage: "url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop')"}}></div>
              <div className="blog-card-content">
                <h4>Choosing energy-efficient windows</h4>
                <div className="blog-card-footer">
                  <span>Mar 10 · 4 min</span>
                  <span><i className="fas fa-arrow-right"></i></span>
                </div>
              </div>
            </div>
            <div className="blog-card">
              <div className="blog-card-img" style={{backgroundImage: "url('https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=1935&auto=format&fit=crop')"}}></div>
              <div className="blog-card-content">
                <h4>High-performance coatings 101</h4>
                <div className="blog-card-footer">
                  <span>Feb 28 · 5 min</span>
                  <span><i className="fas fa-arrow-right"></i></span>
                </div>
              </div>
            </div>
            <div className="blog-card">
              <div className="blog-card-img" style={{backgroundImage: "url('https://images.unsplash.com/photo-1622372738946-62e02505feb3?q=80&w=2032&auto=format&fit=crop')"}}></div>
              <div className="blog-card-content">
                <h4>Preparing your home for summer</h4>
                <div className="blog-card-footer">
                  <span>Feb 15 · 3 min</span>
                  <span><i className="fas fa-arrow-right"></i></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="single-blog-post">
          <div className="post-container">
            <div className="post-header">
              <span className="post-category">Roofing Guide</span>
              <h2>5 signs it's time to replace your roof</h2>
              <span className="post-date">March 15, 2026 · by David Chen</span>
            </div>
            <img className="post-image" src="https://images.unsplash.com/photo-1618221195710-5a7f6e6e9b8d?q=80&w=2000&auto=format&fit=crop" alt="Roof replacement" />
            <div className="post-body">
              <p>Your roof is your home's first line of defense. But how do you know when it's time for a replacement rather than another repair? Here are five telltale signs our inspectors use.</p>
              <h3>1. Curling or missing shingles</h3>
              <p>When shingles start to curl at the edges or go missing altogether, the protective barrier is compromised.</p>
              <h3>2. Granules in the gutter</h3>
              <p>Asphalt shingles lose granules over time; excessive loss means they're nearing end of life.</p>
              <h3>3. Daylight through the roof boards</h3>
              <p>If you can see light from the attic, water will find a way in too.</p>
            </div>
          </div>
        </div>

        <div className="location-contact">
          <div className="location-block">
            <h3>LOCATION</h3>
            <p><i className="fas fa-map-pin"></i> 400 Corporate Point Suite 300<br />Culver City, CA 90230</p>
            <p><i className="fas fa-phone-alt"></i> 424 345 2274</p>
            <p><i className="fas fa-globe"></i> www.a1hrinc.com</p>
            <p><i className="fas fa-envelope"></i> customercare@a1hrinc.com</p>
          </div>
          <div className="form-block">
            <h3>CONTACT US</h3>
            <form>
              <div className="form-group"><input type="text" placeholder="Name" /></div>
              <div className="form-group"><input type="email" placeholder="Email" /></div>
              <div className="form-group"><input type="text" placeholder="Address" /></div>
              <div className="form-group"><input type="tel" placeholder="Phone" /></div>
              <div className="form-group"><input type="text" placeholder="Subject" /></div>
              <div className="form-group"><textarea rows={3} placeholder="Message"></textarea></div>
              <button className="submit-btn">Submit</button>
              <div className="success-msg">Thanks for submitting!</div>
            </form>
          </div>
        </div>

        <div className="newsletter">
          <h3>Subscribe Form</h3>
          <div className="newsletter-form">
            <input type="email" placeholder="Email Address" />
            <button type="submit">Submit</button>
          </div>
        </div>

        <div className="about-page">
          <h2 className="about-header">ABOUT US</h2>
          <div className="about-content">
            <p>We see the future with every home to create sustainable clean energy reducing our carbon footprint, and leaving a healthy legacy for our children.</p>
            <p>For each of our services we have experienced professionals that will handle your project with detail and care.</p>
            <div className="about-contact">
              <p><i className="fas fa-map-marker-alt" style={{color: '#b58b6b'}}></i> CULVER CITY / LA — 400 Corporate Point Ste 300, Culver City, CA 90230</p>
              <p><i className="fas fa-phone-alt" style={{color: '#b58b6b'}}></i> 424 345 2274  |  <i className="fas fa-envelope" style={{color: '#b58b6b'}}></i> a1hr.david@gmail.com</p>
            </div>
          </div>
        </div>

        <footer className="global-footer">
          <div className="footer-grid">
            <div className="footer-col"><h4>A1 HOME REMODELING</h4><p>Quality built to last</p></div>
            <div className="footer-col"><h5>Explore</h5><a href="#">Home</a><a href="#">About</a><a href="#">Services</a><a href="#">Blog</a></div>
            <div className="footer-col"><h5>Contact</h5><a href="#">Location</a><a href="#">Quote</a></div>
            <div className="footer-col"><h5>Legal</h5><a href="#">Privacy</a><a href="#">Terms</a></div>
          </div>
          <div className="copyright">© 2026 A1 Home Remodeling Inc.</div>
        </footer>
      </div>
    </div>
  );
}
