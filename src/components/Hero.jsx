export default function Hero() {
  return (
    <section className="hero hero--cinema" id="home">
      {/* Background High-Clarity Imagery — Bright & Vivid */}
      <div className="hero__bg-wrap">
        <img
          src="/hero-luxury.jpg"
          alt="Heaven Furniture Mart — Bespoke Luxury Living Room"
          className="hero__bg-img"
        />
        {/* Soft atmospheric overlay for clear font contrast without dimming the room */}
        <div className="hero__bg-overlay" />
      </div>

      <div className="hero__content container">
        {/* Social proof pill badge */}
        <div className="hero__badge">
          <span className="hero__ping">
            <span className="hero__ping-dot" />
            <span className="hero__ping-ring" />
          </span>
          <span>500+ happy homes furnished across Chattogram</span>
        </div>

        {/* Master headline with sharp contrast & luminous gold */}
        <h1 className="hero__title">
          Furniture That<br />
          Feels Like <span className="hero__title-gold">Heaven.</span>
        </h1>

        {/* Subtitle */}
        <p className="hero__sub">
          Bespoke luxury furniture &amp; architectural interior craftsmanship for your dream sanctuary.
          Chattogram&apos;s premier destination for custom hardwoods and timeless aesthetics.
        </p>

        {/* Dual Call-to-Actions */}
        <div className="hero__btns">
          <a href="#categories" className="hero__btn-primary">
            <span>Explore Collections →</span>
          </a>
          <a href="#visit" className="hero__btn-glass">
            <span>Book Showroom Visit</span>
          </a>
        </div>

        {/* Live availability ticker */}
        <p className="hero__available">
          <span className="hero__pulse-live" />
          <span>Showroom Open Today &bull; 10:00 AM &ndash; 9:00 PM &bull; Agrabad Access Road</span>
        </p>
      </div>
    </section>
  );
}
