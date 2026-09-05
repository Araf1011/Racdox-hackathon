import { useEffect, useRef, useState } from 'react';

const stats = [
  { num: 500,  suffix: '+', label: 'Homes Furnished'         },
  { num: 8,    suffix: '+', label: 'Years in Business'        },
  { num: 98,   suffix: '%', label: 'Customer Satisfaction'    },
  { num: 200,  suffix: '+', label: 'Bespoke Orders Completed' },
];

function useCountUp(target, isVisible, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target, duration]);
  return count;
}

function StatItem({ num, suffix, label, isVisible }) {
  const count = useCountUp(num, isVisible);
  return (
    <div className="stat-item">
      <div className="stat-item__num">{count}{suffix}</div>
      <div className="stat-item__divider" />
      <div className="stat-item__label">{label}</div>
    </div>
  );
}

export default function Stats() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats" id="stats" ref={ref}>
      <div className="container">
        <div className="stats__grid">
          {stats.map((s, i) => (
            <StatItem key={i} {...s} isVisible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
