import { useState, useRef, useEffect } from 'react';

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'bot',
    text: "Hello! 👋 I'm Aria, your personal Heaven Furniture Design Concierge. How can I help you furnish your dream space today?",
    time: 'Just now',
  },
];

const SUGGESTED_QUESTIONS = [
  '🛋️ Best sofa for living room?',
  '🪵 Chittagong Teak vs Segun wood?',
  '📐 How does custom sizing work?',
  '📍 Showroom location & timings',
];

const AI_RESPONSES = {
  sofa: "For living rooms, our most popular pieces are the **Chesterfield Velvet Suite** (handcrafted with Chittagong Teak & royal velvet) and the **Modular Curva Bouclé Sectional**. Both come with high-density memory resilience foam and 25-year frame guarantees!",
  wood: "We specialize in **100% Solid Chittagong Teak & Natural Segun**. All our timber undergoes rigorous kiln-drying and anti-termite seasoning. Teak offers unmatched moisture resistance and rich golden grain, while Segun delivers exceptional durability for heritage dining and beds.",
  custom: "Our bespoke service is simple: 1) Share your room dimensions or inspiration, 2) Our architects produce a 3D preview, 3) Our master woodcarvers handcraft your piece, and 4) We deliver and assemble directly in your home across Chattogram & Dhaka!",
  location: "Our flagship showroom is located on **Agrabad Access Road, Chattogram**. We're open today from **10:00 AM to 9:00 PM**. You can also book a VIP design walkthrough via the 'Book a Visit' button above!",
  pricing: "Our bespoke pieces range from ৳ 45,000 for sculpted lounge chairs up to ৳ 1,80,000+ for grand banquet dining sets and royal king bed suites. Every piece is made to order with certified hardwoods.",
  default: "Thank you for reaching out! Our design studio crafts bespoke solid hardwood furniture tailored to your exact floor plan. Would you like to explore our living room collections, bedroom suites, or book a free showroom consultation?",
};

function getAIAnswer(query) {
  const q = query.toLowerCase();
  if (q.includes('sofa') || q.includes('couch') || q.includes('living') || q.includes('sectional')) {
    return AI_RESPONSES.sofa;
  }
  if (q.includes('teak') || q.includes('segun') || q.includes('wood') || q.includes('hardwood') || q.includes('timber')) {
    return AI_RESPONSES.wood;
  }
  if (q.includes('custom') || q.includes('bespoke') || q.includes('size') || q.includes('dimension') || q.includes('design')) {
    return AI_RESPONSES.custom;
  }
  if (q.includes('location') || q.includes('address') || q.includes('showroom') || q.includes('where') || q.includes('time') || q.includes('open') || q.includes('agrabad')) {
    return AI_RESPONSES.location;
  }
  if (q.includes('price') || q.includes('cost') || q.includes('pricing') || q.includes('rate') || q.includes('how much')) {
    return AI_RESPONSES.pricing;
  }
  return AI_RESPONSES.default;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setShowTooltip(false);
    }
  }, [isOpen, messages, isTyping]);

  const handleSend = (userText) => {
    const textToSend = typeof userText === 'string' ? userText : inputVal;
    if (!textToSend || !textToSend.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = getAIAnswer(textToSend);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 750);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="ai-chat-root">
      {/* ── Floating Message Preview Tooltip ── */}
      {showTooltip && !isOpen && (
        <div className="ai-chat-tooltip" onClick={() => setIsOpen(true)}>
          <button
            type="button"
            className="ai-chat-tooltip__close"
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            aria-label="Dismiss message preview"
          >
            ×
          </button>
          <div className="ai-chat-tooltip__content">
            <span className="ai-chat-tooltip__dot" />
            <p className="ai-chat-tooltip__text">
              <strong>Need interior advice?</strong> Chat with Aria, our AI Design Specialist!
            </p>
          </div>
        </div>
      )}

      {/* ── Floating Person Trigger Button ── */}
      <button
        type="button"
        className={`ai-chat-trigger ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle AI Furniture Design Concierge Chat"
        aria-expanded={isOpen}
      >
        <div className="ai-chat-trigger__glow" />
        <div className="ai-chat-trigger__circle">
          {isOpen ? (
            /* Close X Icon */
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            /* Person / Concierge Icon */
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          )}
          {!isOpen && <span className="ai-chat-trigger__live-dot" />}
        </div>
      </button>

      {/* ── Glossy Glassmorphism Chatbot Window ── */}
      {isOpen && (
        <div className="ai-chat-window" role="dialog" aria-label="Heaven AI Chatbot">
          {/* Frosted Specular Gloss Reflector */}
          <div className="ai-chat-window__gloss" />

          {/* Header */}
          <div className="ai-chat-header">
            <div className="ai-chat-header__profile">
              <div className="ai-chat-avatar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span className="ai-chat-avatar__dot" />
              </div>
              <div className="ai-chat-header__info">
                <div className="ai-chat-header__name-row">
                  <h3 className="ai-chat-header__name">Aria</h3>
                  <span className="ai-chat-header__badge">AI Concierge</span>
                </div>
                <p className="ai-chat-header__status">Heaven Furniture Specialist · Online</p>
              </div>
            </div>

            <button
              type="button"
              className="ai-chat-header__close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat window"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="ai-chat-body">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`ai-chat-msg ${m.sender === 'user' ? 'ai-chat-msg--user' : 'ai-chat-msg--bot'}`}
              >
                {m.sender === 'bot' && (
                  <div className="ai-chat-msg__avatar">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                )}
                <div className="ai-chat-msg__bubble">
                  <p className="ai-chat-msg__text">{m.text}</p>
                  <span className="ai-chat-msg__time">{m.time}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="ai-chat-msg ai-chat-msg--bot">
                <div className="ai-chat-msg__avatar">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="7" r="4" />
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  </svg>
                </div>
                <div className="ai-chat-msg__bubble ai-chat-msg__bubble--typing">
                  <span className="ai-typing-dot" />
                  <span className="ai-typing-dot" />
                  <span className="ai-typing-dot" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="ai-chat-suggestions">
            <span className="ai-chat-suggestions__label">Quick Questions:</span>
            <div className="ai-chat-suggestions__scroll">
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="ai-chat-chip"
                  onClick={() => handleSend(q)}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="ai-chat-footer">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about custom furniture, teak, pricing..."
              className="ai-chat-input"
              aria-label="Message to Aria"
            />
            <button
              type="button"
              className="ai-chat-send"
              onClick={() => handleSend()}
              disabled={!inputVal.trim()}
              aria-label="Send message"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
