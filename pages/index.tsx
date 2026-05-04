import { useState, useEffect, useRef } from 'react';

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('Please fill in all fields.');
      return;
    }
    setFormStatus('Thanks, John will be in touch shortly.');
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setFormStatus(''), 5000);
  };

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
          color: #1a1a1a;
          background: #ffffff;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
        }
        .fade-in {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.9s ease-out, transform 0.9s ease-out;
        }
        @keyframes heroFade {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 22px 6%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.35s ease;
          background: rgba(255,255,255,0);
        }
        .nav.scrolled {
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          padding: 14px 6%;
          border-bottom: 1px solid #f0f0f0;
        }
        .logo {
          font-size: 22px;
          font-weight: 300;
          letter-spacing: -0.5px;
          cursor: pointer;
          color: #1a1a1a;
        }
        .logo span {
          background: linear-gradient(135deg, #6366f1, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 500;
        }
        .nav-links {
          display: flex;
          gap: 42px;
          list-style: none;
          align-items: center;
        }
        .nav-links a {
          font-size: 14px;
          font-weight: 400;
          color: #333;
          text-decoration: none;
          letter-spacing: 0.2px;
          transition: color 0.25s ease;
          cursor: pointer;
        }
        .nav-links a:hover { color: #6366f1; }
        .nav-cta {
          padding: 10px 22px;
          background: #1a1a1a;
          color: #fff !important;
          border-radius: 100px;
          transition: all 0.3s ease !important;
        }
        .nav-cta:hover {
          background: #6366f1;
          color: #fff !important;
          transform: translateY(-1px);
        }
        .menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          width: 28px;
          height: 22px;
          flex-direction: column;
          justify-content: space-between;
        }
        .menu-btn span {
          height: 1.5px;
          background: #1a1a1a;
          width: 100%;
          transition: 0.3s;
        }
        .mobile-menu {
          display: none;
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: #fff;
          z-index: 99;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 36px;
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu a {
          font-size: 24px;
          color: #1a1a1a;
          text-decoration: none;
          font-weight: 300;
          cursor: pointer;
        }

        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 140px 6% 80px;
          position: relative;
          overflow: hidden;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 80px;
          align-items: center;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
        }
        .hero-text {
          animation: heroFade 1s ease-out;
        }
        .hero-eyebrow {
          font-size: 13px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #6366f1;
          font-weight: 500;
          margin-bottom: 28px;
        }
        .hero h1 {
          font-size: clamp(40px, 6vw, 76px);
          font-weight: 200;
          line-height: 1.05;
          letter-spacing: -2px;
          margin-bottom: 32px;
          color: #0a0a0a;
        }
        .hero h1 em {
          font-style: normal;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 300;
        }
        .hero p {
          font-size: 18px;
          color: #555;
          font-weight: 300;
          max-width: 480px;
          margin-bottom: 44px;
        }
        .btn-group { display: flex; gap: 16px; flex-wrap: wrap; }
        .btn-primary {
          padding: 16px 34px;
          background: #1a1a1a;
          color: #fff;
          border: none;
          border-radius: 100px;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.3px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .btn-primary:hover {
          background: #6366f1;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(99,102,241,0.25);
        }
        .btn-secondary {
          padding: 16px 34px;
          background: transparent;
          color: #1a1a1a;
          border: 1px solid #e0e0e0;
          border-radius: 100px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .btn-secondary:hover {
          border-color: #1a1a1a;
          background: #1a1a1a;
          color: #fff;
        }
        .hero-image {
          position: relative;
          aspect-ratio: 4 / 5;
          border-radius: 4px;
          overflow: hidden;
          animation: heroFade 1.2s ease-out;
        }
        .hero-image img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.8s ease;
        }
        .hero-image:hover img { transform: scale(1.04); }

        .section {
          padding: 140px 6%;
          max-width: 1400px;
          margin: 0 auto;
        }
        .section-label {
          font-size: 12px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #6366f1;
          font-weight: 500;
          margin-bottom: 20px;
        }
        .section-title {
          font-size: clamp(32px, 4.5vw, 56px);
          font-weight: 200;
          letter-spacing: -1.5px;
          line-height: 1.1;
          margin-bottom: 24px;
          max-width: 800px;
        }
        .section-sub {
          font-size: 17px;
          color: #666;
          font-weight: 300;
          max-width: 600px;
          margin-bottom: 80px;
        }

        .features {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 60px;
        }
        .feature {
          padding-top: 32px;
          border-top: 1px solid #ececec;
        }
        .feature-num {
          font-size: 13px;
          color: #a855f7;
          font-weight: 500;
          margin-bottom: 18px;
          letter-spacing: 1px;
        }
        .feature h3 {
          font-size: 22px;
          font-weight: 400;
          margin-bottom: 14px;
          letter-spacing: -0.3px;
        }
        .feature p {
          font-size: 15px;
          color: #666;
          font-weight: 300;
        }

        .about {
          background: #fafafa;
        }
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 100px;
          align-items: center;
        }
        .about-image {
          aspect-ratio: 1 / 1.1;
          overflow: hidden;
          border-radius: 4px;
        }
        .about-image img {
          width: 100%; height: 100%;
          object-fit: cover;
        }
        .about-text p {
          font-size: 17px;
          color: #444;
          font-weight: 300;
          margin-bottom: 22px;
          line-height: 1.75;
        }
        .stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          margin-top: 48px;
          padding-top: 40px;
          border-top: 1px solid #e8e8e8;
        }
        .stat-num {
          font-size: 36px;
          font-weight: 200;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 6px;
        }
        .stat-label {
          font-size: 13px;
          color: #666;
          letter-spacing: 0.5px;
        }

        .menu-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 50px;
        }
        .menu-item {
          cursor: pointer;
          transition: transform 0.4s ease;
        }
        .menu-item:hover { transform: translateY(-6px); }
        .menu-item-img {
          aspect-ratio: 1 / 1;
          overflow: hidden;
          border-radius: 4px;
          margin-bottom: 22px;
        }
        .menu-item-img img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .menu-item:hover .menu-item-img img { transform: scale(1.06); }
        .menu-item-head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 8px;
        }
        .menu-item h4 {
          font-size: 19px;
          font-weight: 400;
          letter-spacing: -0.2px;
        }
        .menu-item-price { font-size: 15px; color: #6366f1; font-weight: 500; }
        .menu-item p { font-size: 14px; color: #777; font-weight: 300; }

        .contact-section {
          background: #0a0a0a;
          color: #fff;
          padding: 140px 6%;
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 100px;
          max-width: 1400px;
          margin: 0 auto;
        }
        .contact-section .section-label { color: #a855f7; }
        .contact-section h2 {
          font-size: clamp(32px, 4.5vw, 56px);
          font-weight: 200;
          letter-spacing: -1.5px;
          line-height: 1.1;
          margin-bottom: 30px;
          color: #fff;
        }
        .contact-info {
          margin-top: 50px;
        }
        .info-row {
          padding: 22px 0;
          border-top: 1px solid #222;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .info-label {
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #888;
        }
        .info-value {
          font-size: 15px;
          color: #fff;
          font-weight: 300;
          text-align: right;
        }
        .form { display: flex; flex-direction: column; gap: 26px; }
        .form-field {
          display: flex; flex-direction: column;
        }
        .form-field label {
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #888;
          margin-bottom: 10px;
        }
        .form-field input,
        .form-field textarea {
          background: transparent;
          border: none;
          border-bottom: 1px solid #333;
          padding: 12px 0;
          color: #fff;
          font-size: 16px;
          font-family: inherit;
          font-weight: 300;
          outline: none;
          transition: border-color 0.3s ease;
          resize: none;
        }
        .form-field input:focus,
        .form-field textarea:focus { border-bottom-color: #a855f7; }
        .form-field textarea { min-height: 110px; }
        .form-status {
          font-size: 14px;
          color: #a855f7;
          font-weight: 300;
        }
        .form button {
          align-self: flex-start;
          padding: 16px 38px;
          background: #fff;
          color: #0a0a0a;
          border: none;
          border-radius: 100px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 8px;
        }
        .form button:hover {
          background: #6366f1;
          color: #fff;
          transform: translateY(-2px);
        }

        .footer {
          padding: 70px 6% 40px;
          background: #fff;
          border-top: 1px solid #f0f0f0;
        }
        .footer-grid {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 30px;
          padding-bottom: 40px;
          border-bottom: 1px solid #f0f0f0;
        }
        .footer-tagline {
          font-size: 14px;
          color: #666;
          font-weight: 300;
          max-width: 320px;
        }
        .socials { display: flex; gap: 14px; }
        .social {
          width: 40px; height: 40px;
          border: 1px solid #e0e0e0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #555;
        }
        .social:hover {
          background: #1a1a1a;
          border-color: #1a1a1a;
          color: #fff;
          transform: translateY(-2px);
        }
        .footer-bottom {
          max-width: 1400px;
          margin: 30px auto 0;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          font-size: 13px;
          color: #888;
        }

        @media (max-width: 968px) {
          .hero-grid, .about-grid, .contact-grid {
            grid-template-columns: 1fr;
            gap: 60px;
          }
          .hero { padding-top: 120px; }
          .features, .menu-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
          .section, .contact-section { padding: 100px 6%; }
        }
        @media (max-width: 640px) {
          .nav-links { display: none; }
          .menu-btn { display: flex; }
          .features, .menu-grid, .stats { grid-template-columns: 1fr; }
          .stats { gap: 28px; }
          .hero { padding: 110px 6% 60px; }
          .section, .contact-section { padding: 80px 6%; }
          .info-row { flex-direction: column; gap: 6px; align-items: flex-start; }
          .info-value { text-align: left; }
        }
      `}</style>

      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="logo" onClick={() => scrollTo('home')}>
          Test<span>Cafe</span>
        </div>
        <ul className="nav-links">
          <li><a onClick={() => scrollTo('home')}>Home</a></li>
          <li><a onClick={() => scrollTo('about')}>About</a></li>
          <li><a onClick={() => scrollTo('menu')}>Menu</a></li>
          <li><a onClick={() => scrollTo('contact')} className="nav-cta">Get in touch</a></li>
        </ul>
        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <a onClick={() => scrollTo('home')}>Home</a>
        <a onClick={() => scrollTo('about')}>About</a>
        <a onClick={() => scrollTo('menu')}>Menu</a>
        <a onClick={() => scrollTo('contact')}>Contact</a>
      </div>

      <section className="hero" id="home">
        <div className="hero-grid">
          <div className="hero-text">
            <div className="hero-eyebrow">Dublin · Est. 2018</div>
            <h1>A quiet corner for <em>great coffee</em>.</h1>
            <p>
              Test Cafe is a neighbourhood coffee shop where slow mornings, single-origin beans
              and warm conversation come together. Brewed with intention, served with care.
            </p>
            <div className="btn-group">
              <button className="btn-primary" onClick={() => scrollTo('menu')}>View the menu</button>
              <button className="btn-secondary" onClick={() => scrollTo('contact')}>Visit us</button>
            </div>
          </div>
          <div className="hero-image">
            <img src="https://picsum.photos/seed/cafehero/900/1100" alt="Test Cafe interior" />
          </div>
        </div>
      </section>

      <section className="section fade-in">
        <div className="section-label">What we believe</div>
        <h2 className="section-title">Coffee, considered.</h2>
        <p className="section-sub">
          Three simple commitments shape every cup we pour. No shortcuts, no noise — just thoughtful
          coffee made the way we'd want to drink it ourselves.
        </p>
        <div className="features">
          <div className="feature">
            <div className="feature-num">01 / Sourcing</div>
            <h3>Beans with a story</h3>
            <p>We work directly with small farms in Ethiopia, Colombia and Guatemala — rotating seasonally so every cup feels new.</p>
          </div>
          <div className="feature">
            <div className="feature-num">02 / Craft</div>
            <h3>Slow, deliberate brewing</h3>
            <p>Our baristas are trained to taste, not to rush. Every espresso is dialled in fresh through the day.</p>
          </div>
          <div className="feature">
            <div className="feature-num">03 / Place</div>
            <h3>Made for staying a while</h3>
            <p>Soft light, comfortable seats and free Wi-Fi. Whether for a quick flat white or a long read, you're welcome.</p>
          </div>
        </div>
      </section>

      <section className="about fade-in" id="about">
        <div className="section" style={{ padding: '0' }}>
          <div className="about-grid">
            <div className="about-image">
              <img src="https://picsum.photos/seed/cafeowner/800/900" alt="John, founder of Test Cafe" />
            </div>
            <div className="about-text">
              <div className="section-label">About us</div>
              <h2 className="section-title">A small cafe with a big love for coffee.</h2>
              <p>
                Test Cafe started in 2018 when John, a former roaster from the Liberties, opened a
                tiny shop on a quiet Dublin street. The idea was simple: brew the coffee he'd want
                to drink, in a space that felt like home.
              </p>
              <p>
                Six years on, that idea hasn't really changed. We still roast in small batches, still
                know most of our regulars by name, and still believe a good morning starts with a
                proper cup.
              </p>
              <div className="stats">
                <div>
                  <div className="stat-num">2018</div>
                  <div className="stat-label">Founded in Dublin</div>
                </div>
                <div>
                  <div className="stat-num">12+</div>
                  <div className="stat-label">Single-origin beans</div>
                </div>
                <div>
                  <div className="stat-num">4.9★</div>
                  <div className="stat-label">Local rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section fade-in" id="menu">
        <div className="section-label">Selected menu</div>
        <h2 className="section-title">A few of our favourites.</h2>
        <p className="section-sub">
          Our full menu rotates with the seasons — here are the staples our regulars come back for.
        </p>
        <div className="menu-grid">
          {[
            { name: 'Flat White', price: '€3.80', desc: 'Double ristretto, silky steamed milk, house espresso blend.', img: 'flatwhite' },
            { name: 'Filter of the Day', price: '€4.20', desc: 'Rotating single-origin pour-over, brewed V60.', img: 'filter' },
            { name: 'Iced Oat Latte', price: '€4.50', desc: 'Cold-brewed espresso, barista oat milk, served over ice.', img: 'icedlatte' },
            { name: 'Cortado', price: '€3.50', desc: 'Equal parts espresso and warm milk. Small but mighty.', img: 'cortado' },
            { name: 'Almond Croissant', price: '€3.90', desc: 'Baked daily by Bread 41 in Pearse Street.', img: 'croissant' },
            { name: 'Banana Bread', price: '€3.40', desc: 'House-made, lightly toasted, with salted butter.', img: 'banana' },
          ].map((item, i) => (
            <div key={i} className="menu-item">
              <div className="menu-item-img">
                <img src={`https://picsum.photos/seed/${item.img}/600/600`} alt={item.name} />
              </div>
              <div className="menu-item-head">
                <h4>{item.name}</h4>
                <span className="menu-item-price">{item.price}</span>
              </div>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="contact-section fade-in" id="contact">
        <div className="contact-grid">
          <div>
            <div className="section-label">Contact</div>
            <h2>Drop us a line, or just stop by.</h2>
            <p style={{ color: '#aaa', fontWeight: 300, fontSize: '17px', maxWidth: '440px' }}>
              Questions about private hire, wholesale beans or just want to say hi? Send a note and
              John will reply personally — usually within a day.
            </p>
            <div className="contact-info">
              <div className="info-row">
                <span className="info-label">Address</span>
                <span className="info-value">14 Camden Row, Dublin 8</span>
              </div>
              <div className="info-row">
                <span className="info-label">Hours</span>
                <span className="info-value">Mon–Fri 7:30–17:00 · Sat–Sun 9:00–17:00</span>
              </div>
              <div className="info-row">
                <span className="info-label">Email</span>
                <span className="info-value">hello@testcafe.ie</span>
              </div>
              <div className="info-row">
                <span className="info-label">Phone</span>
                <span className="info-value">+353 1 234 5678</span>
              </div>
            </div>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label>Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
              />
            </div>
            <div className="form-field">
              <label>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@email.com"
              />
            </div>
            <div className="form-field">
              <label>Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="What's on your mind?"
              />
            </div>
            {formStatus && <div className="form-status">{formStatus}</div>}
            <button type="submit">Send message</button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="logo" style={{ marginBottom: '14px' }}>
              Test<span>Cafe</span>
            </div>
            <p className="footer-tagline">A cozy neighbourhood coffee shop in Dublin, serving specialty drinks and slow mornings since 2018.</p>
          </div>
          <div className="socials">
            <a className="social" aria-label="Instagram" href="#">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/></svg>
            </a>
            <a className="social" aria-label="Facebook" href="#">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a className="social" aria-label="Twitter" href="#">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Test Cafe. All rights reserved.</span>
          <span>Made with care in Dublin.</span>
        </div>
      </footer>
    </>
  );
}