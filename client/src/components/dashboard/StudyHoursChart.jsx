import React, { useState } from 'react';

export default function StudyHoursChart() {
  const [period, setPeriod] = useState('weekly');

  const weeklyBars = [
    { label: 'S', h: 30, hours: '2.5h' },
    { label: 'M', h: 55, hours: '4.5h' },
    { label: 'T', h: 80, hours: '6.0h' },
    { label: 'W', h: 65, hours: '3.5h' },
    { label: 'T', h: 90, hours: '7.0h' },
    { label: 'F', h: 45, hours: '5.0h' },
    { label: 'S', h: 35, hours: '8.0h' },
  ];

  const monthlyBars = [
    { label: 'W1', h: 50, hours: '24h' },
    { label: 'W2', h: 70, hours: '28h' },
    { label: 'W3', h: 85, hours: '32h' },
    { label: 'W4', h: 95, hours: '35h' },
    { label: 'W5', h: 60, hours: '26h' },
    { label: 'W6', h: 75, hours: '30h' },
    { label: 'W7', h: 40, hours: '20h' },
  ];

  const activeBars = period === 'weekly' ? weeklyBars : monthlyBars;

  return (
    <div className="panel panel--hours" aria-label="Active hours chart">
      <div className="panel-header">
        <h3 className="panel-title">Active Hours</h3>
        <div className="dropdown-wrap">
          <select
            id="hoursDropdown"
            className="dropdown"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            aria-label="Time range"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>

      <div className="hours-body">
        <div className="bar-chart" aria-label="Bar chart of active hours per day">
          <div className="bar-y-axis" aria-hidden="true">
            <span>8h</span>
            <span>4h</span>
            <span>2h</span>
            <span>0</span>
          </div>

          <div className="bar-cols">
            {activeBars.map((item, idx) => (
              <div key={idx} className="bar-col">
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{ '--bar-h': `${item.h}%`, height: `${item.h}%` }}
                    title={`${item.label}: ${item.hours}`}
                  />
                </div>
                <span className="bar-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hours-stats">
          <div className="hours-stat">
            <p className="hours-stat-label">Time spent</p>
            <p className="hours-stat-value">
              {period === 'weekly' ? '28' : '119'}{' '}
              <span className="pill pill--green">85%</span>
            </p>
          </div>
          <div className="hours-stat">
            <p className="hours-stat-label">Lessons taken</p>
            <p className="hours-stat-value">
              60 <span className="pill pill--green">79%</span>
            </p>
          </div>
          <div className="hours-stat">
            <p className="hours-stat-label">Exam passed</p>
            <p className="hours-stat-value">
              10 <span className="pill pill--green">100%</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
