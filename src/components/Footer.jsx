const quickLinks = [
  { label: 'Collections', href: '#categories' },
  { label: 'Why Choose Us', href: '#why' },
  { label: 'Our Process', href: '#how' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
];

const contactLinks = [
  { label: 'Agrabad Access Road, Chattogram', href: '#' },
  { label: '+880 1X-XXXX-XXXX', href: 'tel:+8801XXXXXXXX' },
  { label: 'hello@heavenfurniture.com.bd', href: 'mailto:hello@heavenfurniture.com.bd' },
  { label: 'Open Daily: 10 AM – 9 PM', href: '#' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          {/* Brand */}
          <div>
            <div className="footer__brand-name">Heaven Furniture Mart</div>
            <div className="footer__brand-tag">Luxury &amp; Bespoke Furniture</div>
            <p className="footer__brand-desc">
              Crafting premium, bespoke furniture for the homes of Chattogram
              since 2016. Every piece tells a story of artistry and care.
            </p>
            <div className="footer__socials">
              <a href="#" className="footer__social" aria-label="Facebook">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" className="footer__social" aria-label="Instagram">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href="#" className="footer__social" aria-label="WhatsApp">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.96 9.96 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="footer__col-title">Quick Links</div>
            <ul className="footer__col-links">
              {quickLinks.map(l => (
                <li key={l.label}><a href={l.href}>{l.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="footer__col-title">Contact</div>
            <ul className="footer__col-links">
              {contactLinks.map(l => (
                <li key={l.label}><a href={l.href}>{l.label}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© 2026 Heaven Furniture Mart. All rights reserved.</span>
          <span>Built with ❤️ for <span>RACDOX Hackathon</span></span>
        </div>
      </div>
    </footer>
  );
}
