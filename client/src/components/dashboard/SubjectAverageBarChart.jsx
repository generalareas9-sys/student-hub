import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  LabelList,
  Tooltip,
} from 'recharts';

export default function SubjectAverageBarChart({ data, loading }) {
  if (loading) {
    return (
      <div className="rd-card" style={{ minHeight: '340px' }}>
        <div className="rd-card-header">
          <div className="rd-skeleton" style={{ width: '180px', height: '16px' }} />
        </div>
        <div style={{ height: '240px', display: 'flex', alignItems: 'flex-end', gap: '16px', padding: '0 20px' }}>
          {[60, 80, 45, 90, 70].map((h, i) => (
            <div
              key={i}
              className="rd-skeleton"
              style={{ flex: 1, height: `${h}%`, borderRadius: '6px 6px 0 0' }}
            />
          ))}
        </div>
      </div>
    );
  }

  const defaultData = [
    { subject: 'Mathematics', score: 82, color: '#3b82f6' },
    { subject: 'English', score: 76, color: '#22c55e' },
    { subject: 'Science', score: 72, color: '#7c3aed' },
    { subject: 'Social Studies', score: 69, color: '#f97316' },
    { subject: 'Computer Studies', score: 65, color: '#14b8a6' },
  ];

  const subjects = data?.length ? data : defaultData;

  // Custom label formatter to display e.g. "82%"
  const renderCustomBarLabel = ({ x, y, width, value }) => {
    return (
      <text
        x={x + width / 2}
        y={y - 8}
        fill="#1e293b"
        textAnchor="middle"
        dominantBaseline="bottom"
        fontSize="11px"
        fontWeight="700"
      >
        {`${value}%`}
      </text>
    );
  };

  return (
    <div className="rd-card" id="subjectAverageCard">
      <div className="rd-card-header">
        <h3 className="rd-card-title">AVERAGE SCORE BY SUBJECT</h3>
      </div>

      <div style={{ width: '100%', height: 230 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={subjects}
            margin={{ top: 22, right: 12, left: -16, bottom: 20 }}
            barSize={24}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="subject"
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 10, fontWeight: 500 }}
              interval={0}
              dy={8}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              tickFormatter={(val) => `${val}%`}
            />
            <Tooltip
              formatter={(val) => [`${val}%`, 'Average Score']}
              contentStyle={{
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                fontSize: '12px',
                border: '1px solid #e2e8f0',
              }}
            />
            <Bar dataKey="score" radius={[4, 4, 0, 0]}>
              <LabelList dataKey="score" content={renderCustomBarLabel} />
              {subjects.map((entry, index) => (
                <Cell key={`bar-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
