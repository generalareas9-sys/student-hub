import React from 'react';
import { Users, GraduationCap, Award, ClipboardList, Percent } from 'lucide-react';

export default function StatCardsRow({ statCards, loading }) {
  if (loading) {
    return (
      <section className="rd-stat-cards-grid" aria-label="Loading overview statistics">
        {[1, 2, 3, 4, 5].map((idx) => (
          <div key={idx} className="rd-stat-card" style={{ background: '#e2e8f0', minHeight: '100px' }}>
            <div className="rd-skeleton" style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="rd-skeleton" style={{ width: '60%', height: '12px' }} />
              <div className="rd-skeleton" style={{ width: '80%', height: '24px' }} />
              <div className="rd-skeleton" style={{ width: '50%', height: '10px' }} />
            </div>
          </div>
        ))}
      </section>
    );
  }

  const cards = [
    {
      id: 'total-students',
      gradientClass: 'rd-stat-card--blue',
      icon: Users,
      label: 'TOTAL STUDENTS',
      value: statCards?.totalStudents?.value ?? '1,250',
      sub: statCards?.totalStudents?.trend ?? '↑ 8.5% vs Last Term',
    },
    {
      id: 'students-passed',
      gradientClass: 'rd-stat-card--green',
      icon: GraduationCap,
      label: 'STUDENTS PASSED',
      value: statCards?.studentsPassed?.value ?? '1,078',
      sub: statCards?.studentsPassed?.sub ?? '86.2% Pass Rate',
    },
    {
      id: 'distinctions',
      gradientClass: 'rd-stat-card--purple',
      icon: Award,
      label: 'DISTINCTIONS',
      value: statCards?.distinctions?.value ?? '312',
      sub: statCards?.distinctions?.sub ?? '25.0% of Total',
    },
    {
      id: 'average-score',
      gradientClass: 'rd-stat-card--orange',
      icon: ClipboardList,
      label: 'AVERAGE SCORE',
      value: statCards?.averageScore?.value ?? '76.4%',
      sub: statCards?.averageScore?.trend ?? '▲ 4.7% vs Last Term',
    },
    {
      id: 'fail-rate',
      gradientClass: 'rd-stat-card--teal',
      icon: Percent,
      label: 'FAIL RATE',
      value: statCards?.failRate?.value ?? '13.8%',
      sub: statCards?.failRate?.trend ?? '▼ 4.7% vs Last Term',
    },
  ];

  return (
    <section className="rd-stat-cards-grid" aria-label="Academic overview statistics">
      {cards.map((card) => {
        const IconComponent = card.icon;
        return (
          <div key={card.id} className={`rd-stat-card ${card.gradientClass}`}>
            <div className="rd-stat-icon-wrap" aria-hidden="true">
              <IconComponent size={24} />
            </div>
            <div className="rd-stat-info">
              <span className="rd-stat-label">{card.label}</span>
              <span className="rd-stat-value">{card.value}</span>
              <span className="rd-stat-sub">{card.sub}</span>
            </div>
          </div>
        );
      })}
    </section>
  );
}
