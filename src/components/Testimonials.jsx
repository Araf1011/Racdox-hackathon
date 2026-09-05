import { useEffect, useRef } from 'react';

const reviews = [
  {
    name: 'Cristiano Ronaldo',
    loc: 'Agrabad, Chattogram',
    init: 'CR7',
    quote: 'Absolutely stunning craftsmanship! Our living room sofa from Heaven Furniture Mart is the centerpiece of our home. The quality exceeded all expectations.',
    stars: 5,
  },
  {
    name: 'Leonel Messi ',
    loc: 'GEC Circle, Chattogram',
    init: 'LM10',
    quote: 'I ordered a custom wardrobe and the team was incredible from start to finish. Perfect measurements, beautiful finish, and delivered on time. Highly recommended!',
    stars: 5,
  },
  {
    name: 'Neymar jr',
    loc: 'Halishahar, Chattogram',
    init: 'NJ10',
    quote: 'The interior styling consultation was a game changer. They transformed our dining room completely. The dining set is absolutely gorgeous and so durable.',
    stars: 5,
  },
  {
    name: 'Kylian Mbappe',
    loc: 'Panchlaish, Chattogram',
    init: 'KM7',
    quote: 'Love how they listened to every detail. The bedroom furniture feels like it came from a 5-star hotel. The white-glove setup service was a beautiful touch.',
    stars: 5,
  },
];

export default function Testimonials() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.15 }
    );
    ref.current?.querySelectorAll('.fade-up').forEach(c => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="testimonials" id="testimonials" ref={ref}>
      <div className="container">
        <div className="testimonials__header fade-up">
          <span className="section-label">What Customers Say</span>
          <h2 className="testimonials__title gradient-text">
            Loved by Families<br />Across Chattogram.
          </h2>
        </div>

        <div className="testimonials__grid">
          {reviews.map((r, i) => (
            <div
              className="testimonial-card fade-up"
              key={i}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="testimonial-card__stars">
                {Array.from({ length: r.stars }).map((_, j) => (
                  <span className="testimonial-card__star" key={j}>★</span>
                ))}
              </div>
              <p className="testimonial-card__quote">"{r.quote}"</p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">{r.init}</div>
                <div>
                  <div className="testimonial-card__name">{r.name}</div>
                  <div className="testimonial-card__loc">📍 {r.loc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
