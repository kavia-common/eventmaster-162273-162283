import "./landing.css";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Marketing Header */}
      <header className="marketing-header">
        <div className="container topbar">
          <div className="brand">
            <div className="hamburger" aria-label="Open menu" role="button" tabIndex={0}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <strong aria-label="Brand">Decorators</strong>
          </div>
          <nav className="nav" aria-label="Primary">
            <Link href="#" aria-current="page">HOME</Link>
            <Link href="#about">ABOUT</Link>
            <Link href="#news">NEWS</Link>
            <Link href="#services">SERVICES</Link>
            <Link href="#contact">CONTACT US</Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="hero">
          <div className="container">
            <h1>DECORATORS</h1>
            <p className="lead">
              Transforming spaces with clean, modern designs for events, interiors, weddings, and more.
            </p>
            <div className="cta-group" role="group" aria-label="Hero actions">
              <Link href="#about" className="btn-hero btn-secondary">Read More</Link>
              <Link href="#about" className="btn-hero btn-primary">About</Link>
            </div>
            <div className="hero-illustration" aria-hidden="true">
              <Image
                src="https://dummyimage.com/1200x220/ffffff/cccccc.png&text=Illustration+Strip"
                alt="Decorators working at various event stations"
                width={1200}
                height={220}
                priority
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="services">
          <div className="container">
            <h2>We Provide:</h2>
            <div className="service-grid">
              <article className="service-card">
                <div className="service-icon">
                  <svg width="52" height="52" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M3 3h18v4H3V3zM3 9h18v12H3V9z" fill="#1E2A35" opacity="0.9"/>
                    <path d="M6 12h6v6H6z" fill="#FFFFFF"/>
                  </svg>
                </div>
                <h3 className="service-title">Interior Decorator</h3>
                <p className="service-desc">Modern, airy interiors with balanced palettes and quality finishes that elevate your space.</p>
              </article>
              <article className="service-card">
                <div className="service-icon">
                  <svg width="52" height="52" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 3c4 4 6 7 6 10a6 6 0 1 1-12 0c0-3 2-6 6-10z" fill="#FFFFFF"/>
                    <path d="M6 20h12l-6-8-6 8z" fill="#1E2A35" opacity="0.9"/>
                  </svg>
                </div>
                <h3 className="service-title">Wedding Decorator</h3>
                <p className="service-desc">Elegant wedding setups, arches, and centerpieces curated for unforgettable celebrations.</p>
              </article>
              <article className="service-card">
                <div className="service-icon">
                  <svg width="52" height="52" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M7 14h10v6H7z" fill="#FFFFFF"/>
                    <path d="M9 10h6v4H9z" fill="#FFFFFF"/>
                    <circle cx="12" cy="8" r="1" fill="#1E2A35" opacity="0.9"/>
                  </svg>
                </div>
                <h3 className="service-title">Cake Decorator</h3>
                <p className="service-desc">Delicious designs that taste as good as they look—custom cakes for every occasion.</p>
              </article>
              <article className="service-card">
                <div className="service-icon">
                  <svg width="52" height="52" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 20c6-6 10-10 16-12-2 6-6 10-12 16H4v-4z" fill="#FFFFFF"/>
                    <circle cx="16" cy="8" r="2" fill="#1E2A35" opacity="0.9"/>
                  </svg>
                </div>
                <h3 className="service-title">Floral Decorator</h3>
                <p className="service-desc">Fresh, vibrant arrangements and installations that bring life to any event or space.</p>
              </article>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
