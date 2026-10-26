import React from 'react';
import { Printer, Menu, RefreshCw } from 'lucide-react';

export default function Header({
  academicYear = '2024/2025',
  term = '2nd Term',
  onYearChange,
  onTermChange,
  onMenuClick,
  onToggleView,
  isInstructorView = true,
}) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="rd-overview-header" role="banner">
      <div className="rd-overview-title-group">
        {onMenuClick && (
          <button
            type="button"
            className="rd-btn-mobile-menu"
            onClick={onMenuClick}
            aria-label="Open navigation menu"
          >
            <Menu size={20} />
          </button>
        )}
        <div>
          <h1 className="rd-overview-title">OVERVIEW</h1>
          <span className="rd-overview-subtitle">Performance at a Glance</span>
        </div>
      </div>

      <div className="rd-overview-actions">
        {/* Toggle between Student & Instructor View */}
        {onToggleView && (
          <button
            type="button"
            onClick={onToggleView}
            className="rd-view-toggle-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              fontSize: '11px',
              fontWeight: 600,
              color: '#1e293b',
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            }}
            title="Toggle between School Overview and Student View"
          >
            <RefreshCw size={12} />
            <span>{isInstructorView ? 'Student Portal ↗' : 'School Overview ↗'}</span>
          </button>
        )}

        <div className="rd-select-pill-group">
          <div className="rd-select-pill">
            <label htmlFor="academicYearSelect">Academic Year</label>
            <select
              id="academicYearSelect"
              value={academicYear}
              onChange={(e) => onYearChange && onYearChange(e.target.value)}
              aria-label="Academic Year"
            >
              <option value="2024/2025">2024/2025</option>
              <option value="2023/2024">2023/2024</option>
              <option value="2022/2023">2022/2023</option>
            </select>
          </div>

          <div className="rd-select-pill">
            <label htmlFor="termSelect">Term</label>
            <select
              id="termSelect"
              value={term}
              onChange={(e) => onTermChange && onTermChange(e.target.value)}
              aria-label="Academic Term"
            >
              <option value="1st Term">1st Term</option>
              <option value="2nd Term">2nd Term</option>
              <option value="3rd Term">3rd Term</option>
            </select>
          </div>
        </div>

        <button
          type="button"
          className="rd-btn-print"
          onClick={handlePrint}
          aria-label="Print Dashboard"
          title="Print or Export Dashboard"
        >
          <Printer size={18} />
        </button>
      </div>
    </header>
  );
}
