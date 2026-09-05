import { useState } from 'react';

const faqs = [
  {
    q: 'Do you offer fully custom furniture?',
    a: 'Yes! Every piece can be made to your exact specifications — dimensions, materials, fabric colour, wood finish and hardware. Our design team will guide you through every choice.',
  },
  {
    q: 'What areas do you deliver to?',
    a: 'We offer free white-glove delivery and professional installation across all of Chattogram. For orders outside Chattogram, please contact us for a delivery quote.',
  },
  {
    q: 'How long does a custom order take?',
    a: 'Standard custom orders take 3–5 weeks depending on complexity. We\'ll give you a precise timeline after your consultation and keep you updated throughout the process.',
  },
  {
    q: 'Do you offer interior design / styling services?',
    a: 'Yes! We offer a free in-home styling consultation with every purchase above ৳50,000. Our expert stylists will visit your home and help you plan the perfect layout.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept cash, bank transfer, bKash, Nagad, and all major credit/debit cards. We also offer 0% EMI plans for 3–18 months through our banking partners.',
  },
  {
    q: 'What does your 2-year warranty cover?',
    a: 'Our warranty covers all structural components — frames, joints, hinges and drawer mechanisms. Fabric and surface wear is covered for 6 months. We\'ll repair or replace any defective part at no cost.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="faq" id="faq">
      <div className="container">
        <div className="faq__header">
          <span className="section-label">FAQ</span>
          <h2 className="faq__title gradient-text">
            Questions? We've<br />Got Answers.
          </h2>
        </div>

        <ul className="faq__list">
          {faqs.map((item, i) => (
            <li
              className={`faq-item ${open === i ? 'open' : ''}`}
              key={i}
            >
              <button
                className="faq-item__q"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                {item.q}
                <span className="faq-item__icon">+</span>
              </button>
              <div className="faq-item__a">{item.a}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
