import React from 'react';

export default function PerformanceChart() {
  return (
    <div className="panel panel--performance" aria-label="Performance chart">
      <div className="panel-header">
        <h3 className="panel-title">Performance</h3>
      </div>
      <div className="performance-body">
        <svg
          className="perf-chart"
          viewBox="0 0 300 130"
          preserveAspectRatio="none"
          aria-label="Performance line chart"
        >
          {/* Light blue secondary curve */}
          <path
            className="perf-line perf-line--secondary"
            d="M0,90 C30,85 60,80 90,75 C120,70 150,78 180,82 C210,86 240,74 270,68 L300,65"
            fill="none"
            strokeWidth="2"
          />
          {/* Purple main curve */}
          <path
            className="perf-line perf-line--primary"
            d="M0,100 C30,80 60,65 90,55 C120,45 150,60 180,50 C210,40 240,55 270,35 L300,30"
            fill="none"
            strokeWidth="2.5"
          />
          {/* Dot marker */}
          <circle className="perf-dot" cx="90" cy="55" r="5" />
        </svg>

        <div className="perf-months" aria-hidden="true">
          <span>Jan</span>
          <span className="perf-month--active">Feb</span>
          <span>Mar</span>
          <span>Apr</span>
          <span>May</span>
          <span>Jun</span>
        </div>

        <div className="perf-summary">
          <span className="perf-big">40%</span>
          <p>Your productivity is 40% higher compared to last month</p>
        </div>
      </div>
    </div>
  );
}
