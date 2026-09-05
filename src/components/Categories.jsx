import { useState } from 'react';

const categories = [
  {
    tag: 'Living Room',
    title: 'Sofas & Lounges',
    desc: 'Premium velvet, leather & fabric sofas crafted for comfort, deep relaxation and timeless style.',
    items: [
      { src: '/images/living/Living1.jpg', name: 'Chesterfield Velvet Suite', wood: 'Chittagong Teak & Velvet' },
      { src: '/images/living/Living2.jpg', name: 'Modular Cloud Sectional', wood: 'Natural Segun & Premium Linen' },
      { src: '/images/living/Living3.jpg', name: 'Minimalist Teak Lounge', wood: '100% Solid Teak Frame' },
    ],
  },
  {
    tag: 'Bedroom',
    title: 'Beds & Wardrobes',
    desc: 'Upholstered beds, custom wardrobes & dressers designed to turn your room into a private sanctuary.',
    items: [
      { src: '/images/bedroom/bed1.jpg', name: 'Royal Upholstered King', wood: 'Solid Segun & Velvet' },
      { src: '/images/bedroom/bed2.jpg', name: 'Nordic Teak Platform', wood: '100% Chittagong Teak' },
      { src: '/images/bedroom/bed3.jpg', name: 'Imperial Wingback Sanctuary', wood: 'Hand-carved Mahogany & Teak' },
    ],
  },
  {
    tag: 'Dining Room',
    title: 'Dining Sets',
    desc: 'Solid wood dining tables & upholstered chairs built to host generations of family gatherings.',
    items: [
      { src: '/images/dining/Dining1.jpg', name: '6-Seater Heritage Teak Table', wood: 'Solid Teak & Cushioned Chairs' },
      { src: '/images/dining/Dining2.jpg', name: 'Nordic Solid Segun Set', wood: 'Zero-Joint Natural Segun' },
      { src: '/images/dining/Dining3.jpg', name: 'Grand Royal Banquet Suite', wood: 'Polished Teak & Gold Accents' },
    ],
  },
  {
    tag: 'Office & Study',
    title: 'Executive Workspaces',
    desc: 'Bespoke executive desks, ergonomic setups & floor-to-ceiling library shelving for peak focus.',
    items: [
      { src: '/images/office/Office1.jpg', name: 'Presidential Mahogany Desk', wood: 'Solid Mahogany & Leather Inlay' },
      { src: '/images/office/Office2.jpg', name: 'Architectural Teak Workstation', wood: 'Wire-Managed Chittagong Teak' },
      { src: '/images/office/Office3.jpg', name: 'Bespoke Study & Library Suite', wood: 'Handcrafted Solid Wood' },
    ],
  },
];

function CategoryCard({ cat, index }) {
  const [activeIdx, setActiveIdx] = useState(0);

  const prev = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === 0 ? cat.items.length - 1 : prev - 1));
  };

  const next = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === cat.items.length - 1 ? 0 : prev + 1));
  };

  const currentItem = cat.items[activeIdx];

  return (
    <div
      className="category-card"
      style={{ zIndex: index + 1, top: `${5 + index * 1.5}rem` }}
    >
      {/* Background Slides with crossfade */}
      <div className="category-card__bgs">
        {cat.items.map((item, i) => (
          <div
            key={i}
            className={`category-card__bg ${i === activeIdx ? 'is-active' : ''}`}
            style={{ backgroundImage: `url(${item.src})` }}
          />
        ))}
      </div>

      <div className="category-card__overlay" />
      <div className="category-card__frost" />

      {/* Floating Mini Navigation Switcher */}
      <div className="category-card__switcher">
        <button
          type="button"
          onClick={prev}
          className="category-card__arrow"
          aria-label="Previous piece"
        >
          ‹
        </button>
        <div className="category-card__pills">
          {cat.items.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIdx(i)}
              className={`category-card__pill ${i === activeIdx ? 'is-active' : ''}`}
              aria-label={`View piece ${i + 1}: ${item.name}`}
            >
              <span>0{i + 1}</span>
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          className="category-card__arrow"
          aria-label="Next piece"
        >
          ›
        </button>
      </div>

      {/* Content panel */}
      <div className="category-card__content">
        <div className="category-card__info">
          <div className="category-card__tag-row">
            <span className="category-card__tag">{cat.tag}</span>
            <span className="category-card__spec-badge">
              <span className="category-card__spec-dot" />
              {currentItem.name} · {currentItem.wood}
            </span>
          </div>
          <h3 className="category-card__title">{cat.title}</h3>
          <p className="category-card__desc">{cat.desc}</p>
        </div>

        <a href="#visit" className="category-card__btn">
          <span>View Collection</span>
          <span className="category-card__btn-icon">→</span>
        </a>
      </div>
    </div>
  );
}

export default function Categories() {
  return (
    <section className="categories" id="categories">
      <div className="categories__header container">
        <span className="section-label">Our Collections</span>
        <h2 className="categories__title gradient-text">
          Every Room,<br />Reimagined.
        </h2>
        <p className="categories__sub">
          Explore our curated furniture collections — each crafted to transform
          your living spaces into works of art.
        </p>
      </div>

      <div className="categories__stack">
        {categories.map((cat, i) => (
          <CategoryCard cat={cat} index={i} key={cat.tag} />
        ))}
      </div>
    </section>
  );
}
