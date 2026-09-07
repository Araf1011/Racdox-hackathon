import { useState, useRef, useCallback } from 'react';

export default function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPos(percent);
  }, []);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    handleMove(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // safe fallback
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPos((prev) => Math.max(prev - 5, 0));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPos((prev) => Math.min(prev + 5, 100));
    }
  };

  return (
    <div className="hero-transform">
      {/* Header bar above the showcase */}
      <div className="hero-transform__header">
        <div className="hero-transform__header-info">
          <span className="hero-transform__tag">✦ Interior Transformation</span>
          <h3 className="hero-transform__header-title">
            See the Heaven Difference
          </h3>
        </div>

        {/* Preset Views */}
        <div className="hero-transform__presets" role="group" aria-label="Preset views">
          <button
            type="button"
            className={`hero-transform__preset-btn ${sliderPos === 0 ? 'is-active' : ''}`}
            onClick={() => setSliderPos(0)}
          >
            Empty Shell
          </button>
          <button
            type="button"
            className={`hero-transform__preset-btn ${sliderPos >= 45 && sliderPos <= 55 ? 'is-active' : ''}`}
            onClick={() => setSliderPos(50)}
          >
            50/50 Split
          </button>
          <button
            type="button"
            className={`hero-transform__preset-btn ${sliderPos === 100 ? 'is-active' : ''}`}
            onClick={() => setSliderPos(100)}
          >
            Heaven Furnished
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div
        ref={containerRef}
        className={`hero-transform__stage ${isDragging ? 'is-dragging' : ''}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        tabIndex={0}
        role="slider"
        aria-label="Before and after interior transformation slider"
        aria-valuenow={Math.round(sliderPos)}
        aria-valuemin={0}
        aria-valuemax={100}
        onKeyDown={handleKeyDown}
      >
        {/* Base Layer: Empty Room (Before) */}
        <div className="hero-transform__layer hero-transform__layer--before">
          <img
            src="/before-interior.jpg"
            alt="Bare empty interior living room before furnishing"
            className="hero-transform__img"
            loading="eager"
            draggable={false}
          />
          <div className="hero-transform__badge hero-transform__badge--before">
            <span className="hero-transform__badge-dot" />
            <span>BEFORE &bull; Bare Space</span>
          </div>
        </div>

        {/* Clipped Top Layer: Fully Furnished (After) */}
        <div
          className="hero-transform__layer hero-transform__layer--after"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <img
            src="/after-interior.jpg"
            alt="Luxuriously furnished interior living room by Heaven Furniture Mart"
            className="hero-transform__img"
            loading="eager"
            draggable={false}
          />
          <div className="hero-transform__badge hero-transform__badge--after">
            <span className="hero-transform__badge-sparkle">✨</span>
            <span>AFTER &bull; Furnished by Heaven</span>
          </div>
        </div>

        {/* Draggable Divider Line & Handle */}
        <div
          className="hero-transform__divider"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="hero-transform__line" />
          <div className="hero-transform__handle" aria-hidden="true">
            <svg
              className="hero-transform__arrows"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
              <polyline points="9 18 3 12 9 6" />
            </svg>
            <div className="hero-transform__handle-center" />
            <svg
              className="hero-transform__arrows"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
              <polyline points="15 18 21 12 15 6" />
            </svg>
          </div>
        </div>

        {/* Drag instruction overlay hint */}
        <div className={`hero-transform__hint ${isDragging ? 'is-hidden' : ''}`}>
          <span>↔ Drag slider to transform space</span>
        </div>
      </div>

      {/* Feature tags footer */}
      <div className="hero-transform__tags">
        <span className="hero-transform__tag-item">✦ Curved Bouclé Modular Sectional</span>
        <span className="hero-transform__tag-item">✦ Calacatta Viola Marble Coffee Table</span>
        <span className="hero-transform__tag-item">✦ Handcrafted Solid Teak Accents</span>
        <span className="hero-transform__tag-item">✦ Architectural Ambient Staging</span>
      </div>
    </div>
  );
}
