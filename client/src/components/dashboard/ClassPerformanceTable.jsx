import React from 'react';
import Sparkline from '../common/Sparkline';

export default function ClassPerformanceTable({ classes, loading }) {
  if (loading) {
    return (
      <div className="rd-card" style={{ minHeight: '360px' }}>
        <div className="rd-card-header">
          <div className="rd-skeleton" style={{ width: '220px', height: '16px' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '14px' }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="rd-skeleton" style={{ width: '100%', height: '40px' }} />
          ))}
        </div>
      </div>
    );
  }

  const defaultClasses = [
    {
      className: 'SS 1',
      totalStudents: 250,
      averageScore: '78.6%',
      passRate: '88.5%',
      distinctions: '68 (27.2%)',
      failRate: '11.5%',
      trend: [65, 70, 68, 75, 78, 88.5],
      trendColor: '#22c55e',
    },
    {
      className: 'SS 2',
      totalStudents: 240,
      averageScore: '76.1%',
      passRate: '86.7%',
      distinctions: '60 (25.0%)',
      failRate: '13.3%',
      trend: [66, 68, 72, 70, 78, 86.7],
      trendColor: '#22c55e',
    },
    {
      className: 'SS 3',
      totalStudents: 230,
      averageScore: '74.2%',
      passRate: '84.1%',
      distinctions: '50 (21.7%)',
      failRate: '15.9%',
      trend: [82, 80, 78, 76, 75, 84.1],
      trendColor: '#ef4444',
    },
    {
      className: 'SS 4',
      totalStudents: 270,
      averageScore: '75.8%',
      passRate: '85.6%',
      distinctions: '64 (23.7%)',
      failRate: '14.4%',
      trend: [68, 71, 74, 78, 80, 85.6],
      trendColor: '#22c55e',
    },
    {
      className: 'SS 5',
      totalStudents: 260,
      averageScore: '77.3%',
      passRate: '86.1%',
      distinctions: '70 (26.9%)',
      failRate: '13.9%',
      trend: [70, 72, 75, 78, 82, 86.1],
      trendColor: '#22c55e',
    },
  ];

  const classRows = classes?.length ? classes : defaultClasses;

  return (
    <div className="rd-card" id="classPerformanceCard">
      <div className="rd-card-header">
        <h3 className="rd-card-title">CLASS PERFORMANCE OVERVIEW</h3>
      </div>

      <div className="rd-table-responsive">
        <table className="rd-class-table" aria-label="Class performance breakdown">
          <thead>
            <tr>
              <th scope="col">CLASS</th>
              <th scope="col">TOTAL STUDENTS</th>
              <th scope="col">AVERAGE SCORE</th>
              <th scope="col">PASS RATE</th>
              <th scope="col">DISTINCTIONS</th>
              <th scope="col">FAIL RATE</th>
              <th scope="col">TREND</th>
            </tr>
          </thead>
          <tbody>
            {classRows.map((row) => (
              <tr key={row.className}>
                <td style={{ fontWeight: 700, color: '#0f172a' }}>{row.className}</td>
                <td>{row.totalStudents}</td>
                <td>{row.averageScore}</td>
                <td style={{ fontWeight: 600 }}>{row.passRate}</td>
                <td>{row.distinctions}</td>
                <td>{row.failRate}</td>
                <td>
                  <Sparkline
                    data={row.trend}
                    color={row.trendColor || '#22c55e'}
                    width={72}
                    height={22}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
