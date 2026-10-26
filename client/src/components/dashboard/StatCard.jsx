import React from 'react';
import { BookOpen, CheckCircle, Award, Users } from 'lucide-react';

const iconMap = {
  book: BookOpen,
  check: CheckCircle,
  award: Award,
  users: Users,
};

export default function StatCard({ type, label, value, icon, bgClass }) {
  const IconComponent = iconMap[icon] || BookOpen;

  return (
    <article className={`stat-card stat-card--${bgClass}`}>
      <div className={`stat-badge stat-badge--${bgClass}`} aria-hidden="true">
        <IconComponent size={18} />
      </div>
      <p className="stat-label">{label}</p>
      <h3 className="stat-number">{value}</h3>
      <span className={`stat-bar stat-bar--${bgClass}`} aria-hidden="true" />
    </article>
  );
}
