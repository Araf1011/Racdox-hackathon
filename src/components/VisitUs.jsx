import { useState, useEffect, useRef } from 'react';

export default function VisitUs() {
  const [showMap, setShowMap] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll('.fade-up').forEach(c => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="visit" id="visit" ref={ref}>
      <div className="container">
        <div className="visit__card fade-up">
          <div className="visit__inner">
            {/* Info Side */}
            <div className="visit__info-col">
              <span className="section-label">Flagship Showroom</span>
              <h2 className="visit__title">
                Experience True Luxury<br />In Person.
              </h2>
              <p className="visit__sub">
                Step into our expansive Agrabad showroom. Browse 50+ living, dining &amp; bedroom layouts, feel solid teak &amp; Italian bouclé in person, and consult with our lead interior stylists.
              </p>

              <div className="visit__info">
                <div className="visit__info-row">
                  <span className="visit__info-icon">📍</span>
                  <div>
                    <strong>Location:</strong> Agrabad Access Road, Chattogram, Bangladesh
                  </div>
                </div>
                <div className="visit__info-row">
                  <span className="visit__info-icon">🕐</span>
                  <div>
                    <strong>Hours:</strong> Open Daily &bull; 10:00 AM &ndash; 9:00 PM
                  </div>
                </div>
                <div className="visit__info-row">
                  <span className="visit__info-icon">📞</span>
                  <div>
                    <strong>Direct Line:</strong> +880 1819-000000 &bull; +880 1711-000000
                  </div>
                </div>
                <div className="visit__info-row">
                  <span className="visit__info-icon">✨</span>
                  <div>
                    <strong>Experience:</strong> Complimentary coffee &amp; private design consultation
                  </div>
                </div>
              </div>

              <div className="visit__btns">
                <a
                  href="https://www.google.com/maps/search/Agrabad+Access+Road+Chattogram"
                  target="_blank"
                  rel="noreferrer"
                  className="visit__btn-primary"
                >
                  Get Directions →
                </a>
                <button
                  type="button"
                  className="visit__btn-outline"
                  onClick={() => setShowMap(prev => !prev)}
                >
                  {showMap ? '📷 Show Showroom View' : '🗺️ View Interactive Map'}
                </button>
              </div>
            </div>

            {/* Visual Showcase / Map Side */}
            <div className="visit__visual-col">
              {!showMap ? (
                <div className="visit__showroom-preview">
                  <img
                    src="/showroom.jpg"
                    alt="Heaven Furniture Mart Flagship Showroom Interior"
                    className="visit__showroom-img"
                  />
                  <div className="visit__showroom-overlay">
                    <div className="visit__showroom-badge">
                      <span className="visit__pulse-dot" />
                      <span>Chattogram Flagship &bull; Agrabad</span>
                    </div>
                    <p className="visit__showroom-caption">
                      Walk in today &bull; 50+ Ready Collections On Display
                    </p>
                  </div>
                </div>
              ) : (
                <div className="visit__map">
                  <iframe
                    title="Heaven Furniture Mart Location"
                    src="https://maps.google.com/maps?q=Agrabad%20Access%20Road,%20Chattogram,%20Bangladesh&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    allowFullScreen=""
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
