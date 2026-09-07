import { useEffect, useRef, useState } from 'react';

const reviews = [
  {
    name: 'Cristiano Ronaldo',
    loc: 'Agrabad, Chattogram',
    init: 'CR',
    tag: 'Living Room',
    quote: 'Absolutely stunning craftsmanship. Our living room sofa became the centrepiece of the entire home. Quality that truly exceeded every expectation — worth every taka.',
    stars: 5,
  },
  {
    name: 'Leonel Messi',
    loc: 'GEC Circle, Chattogram',
    init: 'LM',
    tag: 'Bedroom Suite',
    quote: 'I ordered a custom wardrobe and the team was incredible from start to finish. Perfect measurements, flawless finish, and delivered ahead of schedule.',
    stars: 5,
  },
  {
    name: 'Neymar Jr',
    loc: 'Halishahar, Chattogram',
    init: 'NJ',
    tag: 'Dining Room',
    quote: 'The styling consultation was a game changer. Heaven completely transformed our dining room — the set is gorgeous, solid, and worth every penny.',
    stars: 5,
  },
  {
    name: 'Kylian Mbappé',
    loc: 'Panchlaish, Chattogram',
    init: 'KM',
    tag: 'Custom Bedroom',
    quote: 'They listened to every detail. The bedroom furniture feels like it came from a 5-star hotel. The white-glove setup service was a beautiful personal touch.',
    stars: 5,
  },
];

function Stars({ count }) {
  return (
    <div className="rc-stars" aria-label={`${count} stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="rc-star" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('rc-visible');
      }),
      { threshold: 0.12 }
    );
    ref.current?.querySelectorAll('.rc-card').forEach(c => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="rc-section" id="testimonials" ref={ref}>
      <div className="container">

        {/* Header */}
        <div className="rc-header">
          <span className="section-label">Customer Reviews</span>
          <h2 className="rc-title gradient-text">
            Real Homes.<br />Real Stories.
          </h2>
          <p className="rc-sub">
            Families across Chattogram share their experience with Heaven Furniture Mart.
          </p>
        </div>

        {/* 2×2 Card Grid */}
        <div className="rc-grid">
          {reviews.map((r, i) => (
            <article
              key={i}
              className="rc-card"
              style={{ transitionDelay: `${i * 70}ms` }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Apple gloss sheen */}
              <div className="rc-card__gloss" />

              {/* Top row: tag + stars */}
              <div className="rc-card__top">
                <span className="rc-card__tag">{r.tag}</span>
                <Stars count={r.stars} />
              </div>

              {/* Opening mark + quote */}
              <p className="rc-card__quote">
                <span className="rc-card__mark">"</span>
                {r.quote}
              </p>

              {/* Thin rule */}
              <hr className="rc-card__rule" />

              {/* Author */}
              <div className="rc-card__author">
                <div className="rc-card__avatar">{r.init}</div>
                <div className="rc-card__info">
                  <span className="rc-card__name">{r.name}</span>
                  <span className="rc-card__loc">
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M8 1.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zM2.5 6a5.5 5.5 0 1111 0c0 2.742-1.577 4.913-3.147 6.39A15.56 15.56 0 018 13.79a15.56 15.56 0 01-2.353-1.4C4.077 10.913 2.5 8.742 2.5 6z" clipRule="evenodd"/>
                      <path d="M8 7.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                    </svg>
                    {r.loc}
                  </span>
                </div>
                {/* Verified checkmark */}
                <div className="rc-card__verified" title="Verified Purchase">
                  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Trust bar */}
        <div className="rc-trust">
          <div className="rc-trust__item">
            <span className="rc-trust__val">4.9</span>
            <Stars count={5} />
            <span className="rc-trust__label">Average Rating</span>
          </div>
          <div className="rc-trust__sep" />
          <div className="rc-trust__item">
            <span className="rc-trust__val">1,200+</span>
            <span className="rc-trust__label">Happy Families</span>
          </div>
          <div className="rc-trust__sep" />
          <div className="rc-trust__item">
            <span className="rc-trust__val">98%</span>
            <span className="rc-trust__label">Would Recommend</span>
          </div>
        </div>

      </div>
    </section>
  );
}
