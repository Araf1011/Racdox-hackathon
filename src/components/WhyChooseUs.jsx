import { useEffect, useRef } from 'react';

const features = [
  {
    tag: 'Craftsmanship',
    title: 'Solid Hardwood Mastery',
    desc: 'Pure Chittagong Teak, Mahogany & Segun. Hand-finished with natural oils, dovetail mortise joints and zero particle board.',
    badgeLabel: 'Material Quality',
    previewText: '100% Solid Hardwood',
    accent: '#FF5C00',
    icon: '🪵',
  },
  {
    tag: 'Tailored',
    title: 'Precision Bespoke Design',
    desc: 'Every piece is drafted around your exact room dimensions, ceiling heights, aesthetic palette and lifestyle needs.',
    badgeLabel: 'Custom Specs',
    previewText: 'Exact 1:1 Scale Drafting',
    accent: '#6366f1',
    icon: '📐',
  },
  {
    tag: 'White-Glove',
    title: 'Free Delivery & Installation',
    desc: 'Trained in-house setup specialists deliver, assemble and position every piece across Chattogram without a single scratch.',
    badgeLabel: 'Logistics',
    previewText: 'Chattogram Express • 0৳',
    accent: '#10B981',
    icon: '🚚',
  },
  {
    tag: 'Protection',
    title: '2-Year Structural Warranty',
    desc: 'Complete peace of mind. We stand behind every seam, joint, hinge and surface with prompt on-site replacement or repair.',
    badgeLabel: 'Coverage',
    previewText: '24-Month Full Coverage',
    accent: '#3B82F6',
    icon: '🛡️',
  },
  {
    tag: 'In-Home',
    title: 'Complimentary Interior Styling',
    desc: 'Our lead interior designers visit your home with fabric swatches, wood samples and layout renders for complete harmony.',
    badgeLabel: 'Expertise',
    previewText: 'Free In-Home Consultation',
    accent: '#EC4899',
    icon: '🎨',
  },
  {
    tag: 'Affordability',
    title: '0% Interest Easy EMI',
    desc: 'Flexible payment plans from 3 to 18 months through all major Bangladeshi banks with 0% interest and instant checkout approval.',
    badgeLabel: 'Flexible Pay',
    previewText: '0% EMI • 3–18 Months',
    accent: '#F59E0B',
    icon: '💳',
  },
];

export default function WhyChooseUs() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.08 }
    );
    ref.current?.querySelectorAll('.fade-up').forEach(c => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="why" id="why" ref={ref}>
      {/* Section Header */}
      <div className="container">
        <div className="why__header fade-up">
          <span className="section-label">Our Standards</span>
          <h2 className="why__title gradient-text">
            Crafted for Life.<br />Designed for Elegance.
          </h2>
          <p className="why__sub">
            The uncompromising principles and bespoke benefits that make Heaven Furniture Mart the first choice for homes across Chattogram.
          </p>
        </div>
      </div>

      {/* Sticky Stacking Cards — same mechanic as Collections */}
      <div className="why__stack">
        {features.map((f, i) => (
          <div
            className="why-card"
            key={i}
            style={{
              zIndex: i + 1,
              top: `${5 + i * 1.8}rem`,
              '--card-accent': f.accent,
            }}
          >
            {/* Left: Content */}
            <div className="why-card__left">
              <div className="why-card__top-row">
                <span className="why-card__icon">{f.icon}</span>
                <span className="why-card__pill-chip">
                  <span
                    className="why-card__dot"
                    style={{ background: f.accent, boxShadow: `0 0 8px ${f.accent}` }}
                  />
                  <span>{f.badgeLabel}</span>
                </span>
              </div>
              <span className="why-card__tag" style={{ color: f.accent }}>{f.tag}</span>
              <h3 className="why-card__title">{f.title}</h3>
              <p className="why-card__desc">{f.desc}</p>
              <a href="#visit" className="why-card__btn" style={{ background: f.accent }}>
                Learn More →
              </a>
            </div>

            {/* Right: Preview Badge Panel */}
            <div
              className="why-card__right"
              style={{ background: `radial-gradient(ellipse at 70% 40%, ${f.accent}22 0%, transparent 65%)` }}
            >
              <div className="why-card__preview-badge">
                <span className="why-card__preview-check" style={{ background: f.accent }}>✓</span>
                <span className="why-card__preview-text">{f.previewText}</span>
              </div>
              <div className="why-card__num" style={{ color: `${f.accent}33` }}>
                0{i + 1}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

