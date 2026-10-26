import React from 'react';
import { Star } from 'lucide-react';

export default function MotivationalCard() {
  return (
    <div className="rd-motivational-card" id="motivationalCard">
      <div className="rd-motivational-content">
        <h4>Keep up the great work!</h4>
        <p>Consistent effort today leads to brighter tomorrows.</p>
        <div
          className="rd-motivational-stars"
          style={{ display: 'flex', gap: '4px', marginTop: '8px' }}
          aria-label="5 out of 5 stars"
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={15}
              fill="#3b82f6"
              color="#3b82f6"
              aria-hidden="true"
            />
          ))}
        </div>
      </div>

      {/* Graduation Cap, Books & Scroll Graphic */}
      <div className="rd-motivational-graphic" aria-hidden="true">
        <svg
          width="96"
          height="80"
          viewBox="0 0 120 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Books Stack */}
          {/* Bottom Book: White pages & Red cover */}
          <rect x="25" y="70" width="80" height="12" rx="3" fill="#dc2626" />
          <rect x="28" y="72" width="74" height="8" rx="1" fill="#f8fafc" />

          {/* Middle Book: Blue cover */}
          <rect x="30" y="58" width="75" height="12" rx="3" fill="#2563eb" />
          <rect x="33" y="60" width="69" height="8" rx="1" fill="#f1f5f9" />

          {/* Top Book: Burgundy cover */}
          <rect x="35" y="46" width="68" height="12" rx="3" fill="#991b1b" />
          <rect x="38" y="48" width="62" height="8" rx="1" fill="#f8fafc" />

          {/* Graduation Cap Base */}
          <path
            d="M50 42 C50 38, 85 38, 85 42 L82 48 C82 52, 53 52, 53 48 Z"
            fill="#1e293b"
          />

          {/* Graduation Cap Diamond Top */}
          <polygon
            points="68,14 108,30 68,42 28,30"
            fill="#0f172a"
          />
          <polygon
            points="68,16 104,30 68,40 32,30"
            fill="#334155"
          />

          {/* Cap Button */}
          <circle cx="68" cy="29" r="3.5" fill="#eab308" />

          {/* Tassel */}
          <path
            d="M68 29 Q78 30 79 44 L77 48"
            stroke="#eab308"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="77" cy="48" r="2" fill="#ca8a04" />

          {/* Diploma Scroll */}
          <rect
            x="10"
            y="76"
            width="42"
            height="14"
            rx="7"
            transform="rotate(-15 10 76)"
            fill="#ffffff"
            stroke="#e2e8f0"
            strokeWidth="1.5"
          />
          {/* Scroll Ribbon */}
          <rect
            x="24"
            y="75"
            width="8"
            height="16"
            rx="2"
            transform="rotate(-15 24 75)"
            fill="#ef4444"
          />
        </svg>
      </div>
    </div>
  );
}
