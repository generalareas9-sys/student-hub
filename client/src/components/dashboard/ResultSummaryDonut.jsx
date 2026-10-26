import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function ResultSummaryDonut({ data, loading }) {
  if (loading) {
    return (
      <div className="rd-card" style={{ minHeight: '340px' }}>
        <div className="rd-card-header">
          <div className="rd-skeleton" style={{ width: '140px', height: '16px' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '240px' }}>
          <div className="rd-skeleton" style={{ width: '160px', height: '160px', borderRadius: '50%' }} />
        </div>
      </div>
    );
  }

  const defaultSlices = [
    { name: 'Distinction (80-100)', count: 312, percent: 25.0, color: '#7c3aed' },
    { name: 'Credit (60-79)', count: 445, percent: 35.6, color: '#22c55e' },
    { name: 'Pass (50-59)', count: 228, percent: 18.2, color: '#3b82f6' },
    { name: 'Average (40-49)', count: 155, percent: 12.4, color: '#f97316' },
    { name: 'Fail (0-39)', count: 110, percent: 8.8, color: '#ef4444' },
  ];

  const slices = data?.slices?.length ? data.slices : defaultSlices;
  const totalStudents = data?.total ?? '1,250';

  return (
    <div className="rd-card" id="resultSummaryCard">
      <div className="rd-card-header">
        <h3 className="rd-card-title">RESULT SUMMARY</h3>
      </div>

      <div className="rd-donut-wrap">
        {/* Donut Chart with Centered Total */}
        <div className="rd-donut-container">
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={slices}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={78}
                paddingAngle={2}
                dataKey="percent"
              >
                {slices.map((entry, index) => (
                  <Cell key={`slice-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(val, name, item) => [
                  `${item.payload.count} students (${val}%)`,
                  item.payload.name,
                ]}
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
            <div className="rd-donut-center-total">{totalStudents}</div>
            <div className="rd-donut-center-label">TOTAL</div>
          </div>
        </div>

        {/* Legend List */}
        <div className="rd-legend-list" role="list">
          {slices.map((item, idx) => (
            <div key={idx} className="rd-legend-item" role="listitem">
              <div className="rd-legend-label-wrap">
                <span className="rd-legend-dot" style={{ backgroundColor: item.color }} />
                <span className="rd-legend-name">{item.name}</span>
              </div>
              <div className="rd-legend-count">
                {item.count} ({item.percent}%)
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
