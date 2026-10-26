import React, { useState } from 'react';
import { Check, Clock, AlertCircle } from 'lucide-react';
import api from '../../services/api';

export default function AssignmentsTable({ assignments = [], onStatusUpdate }) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const tabs = [
    { key: 'all', label: 'All' },
    { key: 'in-progress', label: 'In Progress' },
    { key: 'completed', label: 'Completed' },
    { key: 'pending', label: 'Pending' },
  ];

  const filteredAssignments = assignments.filter((a) => {
    // Status filter
    if (filter === 'in-progress' && a.status !== 'IN_PROGRESS') return false;
    if (filter === 'completed' && a.status !== 'GRADED' && a.status !== 'SUBMITTED') return false;
    if (filter === 'pending' && a.status !== 'NOT_STARTED') return false;

    // Search query
    if (search) {
      const q = search.toLowerCase();
      const matchTitle = a.title.toLowerCase().includes(q);
      const matchCourse = a.courseTitle?.toLowerCase().includes(q) || a.courseCode?.toLowerCase().includes(q);
      if (!matchTitle && !matchCourse) return false;
    }

    return true;
  });

  const handleToggleStatus = async (item) => {
    try {
      setUpdatingId(item.id);
      const nextStatus = item.status === 'SUBMITTED' || item.status === 'GRADED' ? 'IN_PROGRESS' : 'SUBMITTED';
      await api.updateAssignmentStatus(item.id, nextStatus);
      if (onStatusUpdate) onStatusUpdate();
    } catch (err) {
      alert('Failed to update assignment status: ' + err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'GRADED':
        return <span className="status-pill status-pill--completed">Graded</span>;
      case 'SUBMITTED':
        return <span className="status-pill status-pill--completed">Submitted</span>;
      case 'IN_PROGRESS':
        return <span className="status-pill status-pill--progress">In Progress</span>;
      case 'NOT_STARTED':
      default:
        return <span className="status-pill status-pill--pending">Pending</span>;
    }
  };

  const formatDueDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <section className="assignments-card" aria-label="Assignments">
      <div className="assignments-header">
        <h3 className="assignments-title">Assignments</h3>
        <div className="assignments-tabs" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`tab-btn ${filter === tab.key ? 'active' : ''}`}
              onClick={() => setFilter(tab.key)}
              role="tab"
              aria-selected={filter === tab.key}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '12px' }}>
        <input
          type="text"
          className="form-input"
          placeholder="Filter assignments by title or subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '8px 12px', fontSize: '13px' }}
        />
      </div>

      <div className="assignments-table-wrap">
        <div className="assignments-thead" role="row">
          <span className="col-title">Assignment Title</span>
          <span className="col-course">Course</span>
          <span className="col-due">Due Date</span>
          <span className="col-grade">Grade</span>
          <span className="col-status">Status</span>
          <span className="col-update">Action</span>
        </div>

        <div className="assignments-tbody">
          {filteredAssignments.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--muted)', fontSize: '13px' }}>
              No assignments found matching this filter.
            </div>
          ) : (
            filteredAssignments.map((a) => (
              <div key={a.id} className="assignment-row" role="row">
                <div className="assignment-title-cell">
                  <span
                    className="course-dot"
                    style={{ background: a.courseColor || '#5048e5' }}
                    aria-hidden="true"
                  />
                  <span className="assignment-name" title={a.title}>
                    {a.title}
                  </span>
                </div>
                <span className="assignment-course">{a.courseCode || 'CS301'}</span>
                <span className="assignment-due">{formatDueDate(a.dueDate)}</span>
                <span className="assignment-grade">{a.grade || '—'}</span>
                <div className="assignment-status">{getStatusBadge(a.status)}</div>
                <div className="assignment-action">
                  <button
                    type="button"
                    className="btn-secondary"
                    style={{ padding: '4px 8px', fontSize: '11px' }}
                    onClick={() => handleToggleStatus(a)}
                    disabled={updatingId === a.id}
                  >
                    {a.status === 'SUBMITTED' || a.status === 'GRADED' ? 'Reopen' : 'Submit'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
