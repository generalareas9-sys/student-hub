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
    <div className={`stat-card stat-card--${bgClass}`}>
      <div className="stat-icon-wrap" aria-hidden="true">
        <IconComponent size={20} className="stat-icon" />
      </div>
      <div className="stat-content">
        <span className="stat-label">{label}</span>
        <h3 className="stat-value">{value}</h3>
      </div>
    </div>
  );
}
