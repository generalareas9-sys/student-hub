import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function PassRateClassDonut({ data, loading }) {
  if (loading) {
    return (
      <div className="rd-card" style={{ minHeight: '220px' }}>
        <div className="rd-card-header">
          <div className="rd-skeleton" style={{ width: '160px', height: '16px' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px' }}>
          <div className="rd-skeleton" style={{ width: '120px', height: '120px', borderRadius: '50%' }} />
        </div>
      </div>
    );
  }

  const defaultClasses = [
    { name: 'SS 1', rate: 88.5, color: '#3b82f6' },
    { name: 'SS 2', rate: 86.7, color: '#22c55e' },
    { name: 'SS 3', rate: 84.1, color: '#7c3aed' },
    { name: 'SS 4', rate: 85.6, color: '#f97316' },
    { name: 'SS 5', rate: 86.1, color: '#14b8a6' },
  ];

  const classList = data?.classes?.length ? data.classes : defaultClasses;
  const overallRate = data?.overallPassRate ?? '86.2%';

  return (
    <div className="rd-card" id="passRateByClassCard">
      <div className="rd-card-header">
        <h3 className="rd-card-title">PASS RATE BY CLASS</h3>
      </div>

      <div className="rd-donut-wrap">
        <div className="rd-donut-container" style={{ width: 140, height: 140 }}>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie
                data={classList}
                cx="50%"
                cy="50%"
                innerRadius={42}
                outerRadius={65}
                paddingAngle={2}
                dataKey="rate"
              >
                {classList.map((entry, index) => (
                  <Cell key={`class-slice-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(val, name, item) => [`${val}%`, item.payload.name]}
                contentStyle={{
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  fontSize: '12px',
                  border: '1px solid #e2e8f0',
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="rd-donut-center-text">
            <div className="rd-donut-center-total" style={{ fontSize: '15px' }}>
              {overallRate}
            </div>
            <div className="rd-donut-center-label" style={{ fontSize: '8px' }}>
              OVERALL PASS RATE
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="rd-legend-list" role="list">
          {classList.map((item, idx) => (
            <div key={idx} className="rd-legend-item" role="listitem">
              <div className="rd-legend-label-wrap">
                <span className="rd-legend-dot" style={{ backgroundColor: item.color }} />
                <span className="rd-legend-name">{item.name}</span>
              </div>
              <div className="rd-legend-count" style={{ fontWeight: 600 }}>
                {item.rate}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
