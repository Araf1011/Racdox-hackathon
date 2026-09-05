const items = [
  'Luxury Sofas', 'Bespoke Beds', 'Custom Wardrobes',
  'Dining Sets', 'Interior Styling', 'Premium Craftsmanship',
  'Solid Wood Furniture', 'White-Glove Delivery', 'Free Consultation',
  'Made with Love', 'Chattogram\'s Finest', '2-Year Warranty',
];

export default function MarqueeBand() {
  // Duplicate for seamless loop
  const all = [...items, ...items];
  return (
    <div className="marquee-band">
      <div className="marquee-band__track">
        {all.map((item, i) => (
          <div className="marquee-item" key={i}>
            <span>✦</span> {item}
          </div>
        ))}
      </div>
    </div>
  );
}
