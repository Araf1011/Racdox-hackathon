import { useState, useEffect, useRef } from 'react';

const collectionsData = [
  {
    title: 'Living Room',
    slug: 'living-room',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" />
        <path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0z" />
        <path d="M4 18v2" />
        <path d="M20 18v2" />
      </svg>
    ),
    items: ['Sofas', 'Coffee Tables', 'TV Units', 'Consoles'],
  },
  {
    title: 'Bedroom',
    slug: 'bedroom',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 4v16" />
        <path d="M2 8h18a2 2 0 0 1 2 2v10" />
        <path d="M2 17h20" />
        <path d="M6 8v9" />
      </svg>
    ),
    items: ['Beds', 'Wardrobes', 'Dressing Tables', 'Bedside Tables'],
  },
  {
    title: 'Dining',
    slug: 'dining',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
        <path d="M7 2v20" />
        <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
      </svg>
    ),
    items: ['Dining Tables', 'Dining Chairs', 'Cabinets'],
  },
  {
    title: 'Office & Study',
    slug: 'office-study',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    items: ['Executive Tables', 'Bookshelves', 'Workstations'],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false);

  const navPillRef = useRef(null);
  const linksRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  const links = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Collections', href: '#categories', id: 'categories', hasDropdown: true },
    { label: 'Our Story', href: '#why', id: 'why' },
    { label: 'Testimonials', href: '#testimonials', id: 'testimonials' },
    { label: 'FAQ', href: '#faq', id: 'faq' },
  ];

  // Helper to update liquid pill position to a target anchor
  const movePillTo = (el) => {
    if (!el || !linksRef.current) return;
    const parentRect = linksRef.current.getBoundingClientRect();
    const targetRect = el.getBoundingClientRect();
    setPillStyle({
      left: targetRect.left - parentRect.left,
      width: targetRect.width,
      opacity: 1,
    });
  };

  // Position pill on initial mount, active change, and window resize
  useEffect(() => {
    const timer = setTimeout(() => {
      if (linksRef.current) {
        const activeEl = linksRef.current.querySelectorAll('.nav-link')[activeIdx];
        if (activeEl) movePillTo(activeEl);
      }
    }, 120);

    const onResize = () => {
      if (linksRef.current) {
        const activeEl = linksRef.current.querySelectorAll('.nav-link')[activeIdx];
        if (activeEl) movePillTo(activeEl);
      }
    };

    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', onResize);
    };
  }, [activeIdx]);

  // Scroll listener for compact liquid navbar + active section detection
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);

      // Detect active section on scroll
      if (window.scrollY < 260) {
        setActiveIdx(0); // Home
        return;
      }

      const scrollPos = window.scrollY + 220;
      links.slice(1).forEach((link, idx) => {
        const section = document.getElementById(link.id);
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveIdx(idx + 1);
          }
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Liquid hover handlers
  const handleLinkHover = (e, hasDropdown) => {
    movePillTo(e.currentTarget);
    if (hasDropdown) {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
      setDropdownOpen(true);
    } else {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = setTimeout(() => setDropdownOpen(false), 120);
    }
  };

  const handleDropdownEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 180);
  };

  const handleMouseLeave = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 180);

    if (linksRef.current) {
      const activeEl = linksRef.current.querySelectorAll('.nav-link')[activeIdx];
      if (activeEl) {
        movePillTo(activeEl);
      }
    }
  };

  // Fluid mouse tracking inside the floating nav pill
  const handleMouseMove = (e) => {
    if (!navPillRef.current) return;
    const rect = navPillRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    navPillRef.current.style.setProperty('--mouse-x', `${x}px`);
    navPillRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <>
      <header className={`nav-wrap ${scrolled ? 'nav-wrap--scrolled' : ''}`}>
        <nav
          ref={navPillRef}
          onMouseMove={handleMouseMove}
          className="nav-pill container"
          aria-label="Main navigation"
        >
          {/* ── Logo ── */}
          <a href="#home" className="nav-logo" aria-label="Heaven Furniture Mart">
            <div className="nav-logo__mark">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="9 22 9 12 15 12 15 22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="nav-logo__name">HEAVEN MART</span>
          </a>

          {/* ── Desktop Links with Liquid Sliding Pill Indicator ── */}
          <ul
            ref={linksRef}
            className="nav-links"
            role="list"
            onMouseLeave={handleMouseLeave}
          >
            {/* The liquid sliding pill follower */}
            <li
              className="nav-liquid-pill"
              style={{
                left: `${pillStyle.left}px`,
                width: `${pillStyle.width}px`,
                opacity: pillStyle.opacity,
              }}
              aria-hidden="true"
            />

            {links.map((l, i) => (
              <li
                key={l.label}
                className={`nav-item ${l.hasDropdown ? 'nav-item--dropdown' : ''}`}
                onMouseEnter={() => l.hasDropdown && handleDropdownEnter()}
                onMouseLeave={() => l.hasDropdown && handleDropdownLeave()}
              >
                <a
                  href={l.href}
                  className={`nav-link ${activeIdx === i ? 'nav-link--active' : ''} ${l.hasDropdown ? 'nav-link--has-chevron' : ''}`}
                  onMouseEnter={(e) => handleLinkHover(e, l.hasDropdown)}
                  onClick={() => {
                    setActiveIdx(i);
                    setDropdownOpen(false);
                  }}
                >
                  <span>{l.label}</span>
                  {l.hasDropdown && (
                    <svg
                      className={`nav-chevron ${dropdownOpen ? 'nav-chevron--rotated' : ''}`}
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  )}
                </a>

                {/* ── Collections Mega-Menu Dropdown ── */}
                {l.hasDropdown && (
                  <div
                    className={`nav-dropdown ${dropdownOpen ? 'nav-dropdown--open' : ''}`}
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <div className="nav-dropdown__inner">
                      {/* 4 Main Categories Grid */}
                      <div className="nav-dropdown__grid">
                        {collectionsData.map((cat) => (
                          <div key={cat.slug} className="nav-dropdown__col">
                            {/* Main Category Header */}
                            <a
                              href="#categories"
                              className="nav-dropdown__cat-head"
                              onClick={() => setDropdownOpen(false)}
                            >
                              <span className="nav-dropdown__icon-wrap">
                                {cat.icon}
                              </span>
                              <span className="nav-dropdown__cat-title">
                                {cat.title}
                              </span>
                            </a>

                            {/* Subcategories List */}
                            <ul className="nav-dropdown__sub-list">
                              {cat.items.map((subItem) => (
                                <li key={subItem}>
                                  <a
                                    href="#categories"
                                    className="nav-dropdown__sub-link"
                                    onClick={() => setDropdownOpen(false)}
                                  >
                                    <span className="nav-dropdown__sub-bullet" />
                                    <span>{subItem}</span>
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Dropdown Bottom Banner */}
                      <div className="nav-dropdown__footer">
                        <div className="nav-dropdown__footer-left">
                          <span className="nav-dropdown__sparkle">✦</span>
                          <span><strong>Bespoke Customization:</strong> Custom hardwoods, dimensions, and fabrics built to order.</span>
                        </div>
                        <a
                          href="#visit"
                          className="nav-dropdown__footer-cta"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Book Design Consultation →
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* ── Right Action CTA ── */}
          <div className="nav-right">
            <a href="#visit" className="nav-cta" id="nav-cta-btn">
              <span className="nav-cta__inner">
                Book a Visit
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
            </a>

            {/* Hamburger (mobile only) */}
            <button
              className={`nav-burger ${menuOpen ? 'nav-burger--open' : ''}`}
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile Slide-in Menu ── */}
      <div className={`mobile-nav ${menuOpen ? 'mobile-nav--open' : ''}`}>
        <button className="mobile-nav__close" onClick={() => setMenuOpen(false)} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <div className="mobile-nav__links">
          {links.map((l, i) => (
            <div key={l.label} className="mobile-nav__item-wrap">
              <div className="mobile-nav__row">
                <a
                  href={l.href}
                  className="mobile-nav__link"
                  style={{ animationDelay: `${i * 60}ms` }}
                  onClick={() => !l.hasDropdown && setMenuOpen(false)}
                >
                  <span className="mobile-nav__idx">0{i + 1}</span>
                  {l.label}
                </a>
                {l.hasDropdown && (
                  <button
                    className={`mobile-nav__expand ${mobileCollectionsOpen ? 'mobile-nav__expand--open' : ''}`}
                    onClick={() => setMobileCollectionsOpen(o => !o)}
                    aria-label="Toggle categories"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Mobile Collections Accordion */}
              {l.hasDropdown && mobileCollectionsOpen && (
                <div className="mobile-nav__accordion">
                  {collectionsData.map((cat) => (
                    <div key={cat.slug} className="mobile-nav__cat-group">
                      <div className="mobile-nav__cat-title">
                        {cat.icon}
                        <span>{cat.title}</span>
                      </div>
                      <div className="mobile-nav__sub-chips">
                        {cat.items.map((sub) => (
                          <a
                            key={sub}
                            href="#categories"
                            className="mobile-nav__sub-chip"
                            onClick={() => setMenuOpen(false)}
                          >
                            {sub}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <a href="#visit" className="nav-cta mobile-nav__cta" onClick={() => setMenuOpen(false)}>
          <span className="nav-cta__inner">
            Book a Visit
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </span>
        </a>
        <p className="mobile-nav__addr">📍 Agrabad Access Road, Chattogram</p>
      </div>
      {menuOpen && <div className="mobile-nav__backdrop" onClick={() => setMenuOpen(false)} />}
    </>
  );
}
