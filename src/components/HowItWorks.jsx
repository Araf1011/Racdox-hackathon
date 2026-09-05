import { useEffect, useRef } from 'react';

const steps = [
  { num: '01', title: 'Consultation',      desc: 'Share your vision, room dimensions & style preferences with our expert advisors.' },
  { num: '02', title: 'Design Proposal',   desc: 'We craft a personalised furniture concept with 3D layout and material samples.' },
  { num: '03', title: 'Expert Crafting',   desc: 'Our skilled artisans handcraft your furniture using premium solid wood & materials.' },
  { num: '04', title: 'Delivery & Setup',  desc: 'White-glove delivery team installs everything perfectly in your home.' },
  { num: '05', title: 'Enjoy Your Space',  desc: 'Sit back, relax and fall in love with your beautifully transformed home.' },
];

export default function HowItWorks() {
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
    <section className="how" id="how" ref={ref}>
      <div className="container">
        <div className="how__header fade-up">
          <span className="section-label">Our Process</span>
          <h2 className="how__title gradient-text">
            From Dream to<br />Your Doorstep.
          </h2>
          <p className="how__sub">Simple, transparent & hassle-free — every step of the way.</p>
        </div>

        <div className="how__steps">
          {steps.map((s, i) => (
            <div
              className="step-card fade-up"
              key={i}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="step-card__num">{s.num}</div>
              <h3 className="step-card__title">{s.title}</h3>
              <p className="step-card__desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
