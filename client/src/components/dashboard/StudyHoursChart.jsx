import React, { useState } from 'react';

export default function StudyHoursChart({ data = [] }) {
  const [period, setPeriod] = useState('weekly');

  const defaultWeekly = [
    { label: 'M', hours: 4.5, val: 56 },
    { label: 'T', hours: 6.0, val: 75 },
    { label: 'W', hours: 3.5, val: 44 },
    { label: 'T', hours: 7.0, val: 88 },
    { label: 'F', hours: 5.0, val: 62 },
    { label: 'S', hours: 8.0, val: 100 },
    { label: 'S', hours: 2.0, val: 25 },
  ];

  const defaultMonthly = [
    { label: 'W1', hours: 24, val: 68 },
    { label: 'W2', hours: 28, val: 80 },
    { label: 'W3', hours: 32, val: 91 },
    { label: 'W4', hours: 35, val: 100 },
  ];

  const activeBars = period === 'weekly' ? defaultWeekly : defaultMonthly;
  const totalHours = activeBars.reduce((sum, b) => sum + b.hours, 0);

  return (
    <section className="chart-card" aria-label="Study hours chart">
      <div className="chart-header">
        <h3 className="chart-title">Hours Spent</h3>
        <div className="chart-toggle" role="tablist">
          <button
            type="button"
            className={`toggle-btn ${period === 'weekly' ? 'active' : ''}`}
            onClick={() => setPeriod('weekly')}
            role="tab"
            aria-selected={period === 'weekly'}
          >
            Weekly
          </button>
          <button
            type="button"
            className={`toggle-btn ${period === 'monthly' ? 'active' : ''}`}
            onClick={() => setPeriod('monthly')}
            role="tab"
            aria-selected={period === 'monthly'}
          >
            Monthly
          </button>
        </div>
      </div>

      <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '14px' }}>
        Total study time: <strong style={{ color: 'var(--primary)' }}>{totalHours} hrs</strong>
      </div>

      <div className="bar-chart" aria-label="Weekly study hours bar chart">
        {activeBars.map((item, idx) => (
          <div key={idx} className="bar-col">
            <div
              className="bar-fill"
              style={{ '--val': item.val, height: `${item.val}%` }}
              title={`${item.hours} hours`}
            />
            <span className="bar-label">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
