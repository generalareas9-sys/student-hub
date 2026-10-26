import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function PerformanceChart({ performanceData }) {
  return (
    <section className="chart-card" aria-label="Academic performance chart">
      <div className="chart-header">
        <h3 className="chart-title">Performance</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--mint)', fontWeight: '600' }}>
          <TrendingUp size={15} />
          <span>+12% this term</span>
        </div>
      </div>

      <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '16px' }}>
        Current Grade Point Average: <strong style={{ color: 'var(--text)' }}>3.80 / 4.0</strong> (Top 10%)
      </div>

      <div className="perf-chart-wrap" style={{ height: '140px', position: 'relative' }}>
        {/* SVG curved trend line */}
        <svg
          viewBox="0 0 300 120"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="perfGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5048e5" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#5048e5" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          {/* Shaded area */}
          <path
            d="M 10 100 Q 75 80, 140 60 T 290 20 L 290 120 L 10 120 Z"
            fill="url(#perfGrad)"
          />
          {/* Main curve */}
          <path
            d="M 10 100 Q 75 80, 140 60 T 290 20"
            fill="none"
            stroke="#5048e5"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Data Points */}
          <circle cx="10" cy="100" r="4" fill="#ffffff" stroke="#5048e5" strokeWidth="2" />
          <circle cx="80" cy="80" r="4" fill="#ffffff" stroke="#5048e5" strokeWidth="2" />
          <circle cx="150" cy="55" r="4" fill="#ffffff" stroke="#5048e5" strokeWidth="2" />
          <circle cx="220" cy="40" r="4" fill="#ffffff" stroke="#5048e5" strokeWidth="2" />
          <circle cx="290" cy="20" r="5" fill="#5048e5" stroke="#ffffff" strokeWidth="2" />
        </svg>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '11px',
            color: 'var(--muted)',
            marginTop: '8px',
          }}
        >
          <span>Jan</span>
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
          <span>May</span>
          <span>Jun</span>
        </div>
      </div>
    </section>
  );
}
