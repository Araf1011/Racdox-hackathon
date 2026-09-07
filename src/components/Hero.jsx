import { useState, useEffect, useRef, useCallback } from 'react';

const heroScenes = [
  {
    id: 'living',
    num: '01',
    tag: 'Living Sanctuary',
    badge: '500+ happy homes furnished across Chattogram',
    titleLine1: 'Furniture That',
    titleLine2: 'Feels Like',
    titleHighlight: 'Heaven.',
    sub: "Bespoke luxury furniture & architectural interior craftsmanship for your dream sanctuary. Chattogram's premier destination for custom hardwoods and timeless aesthetics.",
    image: '/hero-luxury.jpg',
    categoryLink: '#categories',
    theme: {
      name: 'Amber Gold',
      accent: '#FFBE3B',
      accentGlow: 'rgba(255, 190, 59, 0.45)',
      badgeDot: '#FF5C00',
      btnHover: '#FF5C00',
      glowOverlay: 'radial-gradient(ellipse at 75% 45%, rgba(255, 190, 59, 0.18) 0%, transparent 60%)',
    },
  },
  {
    id: 'bedroom',
    num: '02',
    tag: 'Royal Master Suite',
    badge: 'Handcrafted Chittagong Teak & Velvet',
    titleLine1: 'Bedrooms That',
    titleLine2: 'Inspire Pure',
    titleHighlight: 'Serenity.',
    sub: 'Hand-tufted royal velvet wingback headboards paired with solid Chittagong teak bedside tables and ambient lighting, creating your private evening sanctuary.',
    image: '/bedroom.jpg',
    categoryLink: '#categories',
    theme: {
      name: 'Sapphire & Gold',
      accent: '#60A5FA',
      accentGlow: 'rgba(96, 165, 250, 0.5)',
      badgeDot: '#38BDF8',
      btnHover: '#2563EB',
      glowOverlay: 'radial-gradient(ellipse at 75% 45%, rgba(56, 189, 248, 0.2) 0%, transparent 60%)',
    },
  },
  {
    id: 'dining',
    num: '03',
    tag: 'Grand Dining Room',
    badge: 'Heritage Solid Wood & Architectural Glass',
    titleLine1: 'Dining Spaces',
    titleLine2: 'Built For Grand',
    titleHighlight: 'Gatherings.',
    sub: 'Zero-joint natural segun dining tables with sculptural glass chandeliers and tailored seating, crafted to host generations of unforgettable family feasts.',
    image: '/dining.jpg',
    categoryLink: '#categories',
    theme: {
      name: 'Emerald Botanic',
      accent: '#34D399',
      accentGlow: 'rgba(52, 211, 153, 0.5)',
      badgeDot: '#10B981',
      btnHover: '#059669',
      glowOverlay: 'radial-gradient(ellipse at 75% 45%, rgba(52, 211, 153, 0.18) 0%, transparent 60%)',
    },
  },
  {
    id: 'penthouse',
    num: '04',
    tag: 'Skyline Penthouse',
    badge: 'Modern Curves & Calacatta Viola Marble',
    titleLine1: 'Interiors Sculpted',
    titleLine2: 'With Effortless',
    titleHighlight: 'Elegance.',
    sub: 'Curved bouclé modular sectionals and handcrafted marble centerpieces designed to elevate high-ceiling architectural residences and penthouse suites.',
    image: '/after-interior.jpg',
    categoryLink: '#categories',
    theme: {
      name: 'Champagne Bronze',
      accent: '#FBBF24',
      accentGlow: 'rgba(251, 191, 36, 0.5)',
      badgeDot: '#F59E0B',
      btnHover: '#D97706',
      glowOverlay: 'radial-gradient(ellipse at 75% 45%, rgba(245, 158, 11, 0.2) 0%, transparent 60%)',
    },
  },
];

const AUTOPLAY_DURATION = 6500;

export default function Hero() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const nextScene = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % heroScenes.length);
  }, []);

  const prevScene = useCallback(() => {
    setActiveIdx((prev) => (prev === 0 ? heroScenes.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      nextScene();
    }, AUTOPLAY_DURATION);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextScene, activeIdx]);

  const current = heroScenes[activeIdx];

  return (
    <section
      className="hero hero--cinema"
      id="home"
      style={{
        '--hero-accent': current.theme.accent,
        '--hero-glow': current.theme.accentGlow,
        '--hero-dot': current.theme.badgeDot,
        '--hero-btn-hover': current.theme.btnHover,
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Multi-Image Layer Stack with Crossfade */}
      <div className="hero__bg-wrap">
        {heroScenes.map((scene, i) => (
          <img
            key={scene.id}
            src={scene.image}
            alt={scene.tag}
            className={`hero__bg-img ${i === activeIdx ? 'is-active' : ''}`}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        ))}

        {/* Dynamic Color Atmospheric Mood Gradient */}
        <div
          className="hero__ambient-glow"
          style={{ background: current.theme.glowOverlay }}
        />

        {/* High-Clarity Vignette Overlay for Crisp Typography Contrast */}
        <div className="hero__bg-overlay" />
      </div>

      <div className="hero__content container">
        <div className="hero__text-block" key={current.id}>
          {/* Social proof pill badge */}
          <div className="hero__badge">
            <span className="hero__ping">
              <span
                className="hero__ping-dot"
                style={{ background: current.theme.badgeDot, boxShadow: `0 0 10px ${current.theme.badgeDot}` }}
              />
              <span
                className="hero__ping-ring"
                style={{ borderColor: current.theme.badgeDot }}
              />
            </span>
            <span className="hero__badge-text">{current.badge}</span>
          </div>

          {/* Master headline with sharp contrast & dynamic glowing theme accent */}
          <h1 className="hero__title">
            {current.titleLine1}<br />
            {current.titleLine2}{' '}
            <span
              className="hero__title-accent"
              style={{
                color: current.theme.accent,
                textShadow: `0 0 35px ${current.theme.accentGlow}, 0 3px 18px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.9)`,
              }}
            >
              {current.titleHighlight}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero__sub">{current.sub}</p>

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

        {/* Interactive Floating Theme & Scene Switcher */}
        <div className="hero__switcher-panel" role="region" aria-label="Interior Scene Themes">
          <div className="hero__switcher-header">
            <span className="hero__switcher-tag">Curated Spaces</span>
            <div className="hero__switcher-nav">
              <button
                type="button"
                onClick={prevScene}
                className="hero__switcher-arrow"
                aria-label="Previous interior scene"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={nextScene}
                className="hero__switcher-arrow"
                aria-label="Next interior scene"
              >
                ›
              </button>
            </div>
          </div>

          <div className="hero__cards-row">
            {heroScenes.map((scene, i) => {
              const isActive = i === activeIdx;
              return (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  className={`hero__card-chip ${isActive ? 'is-active' : ''}`}
                  style={{
                    borderColor: isActive ? scene.theme.accent : 'transparent',
                    boxShadow: isActive ? `0 8px 24px -4px ${scene.theme.accentGlow}` : 'none',
                  }}
                  aria-label={`Switch to ${scene.tag} with ${scene.theme.name} theme`}
                >
                  <div className="hero__card-chip-media">
                    <img
                      src={scene.image}
                      alt={scene.tag}
                      className="hero__card-chip-img"
                    />
                    {isActive && (
                      <div
                        className="hero__card-chip-accent-dot"
                        style={{ background: scene.theme.accent }}
                      />
                    )}
                  </div>
                  <div className="hero__card-chip-info">
                    <span className="hero__card-chip-num">{scene.num}</span>
                    <span className="hero__card-chip-name">{scene.tag}</span>
                  </div>

                  {isActive && (
                    <div
                      className="hero__card-progress-bar"
                      style={{
                        animationDuration: `${AUTOPLAY_DURATION}ms`,
                        background: scene.theme.accent,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
