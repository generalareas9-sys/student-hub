import React, { useState } from 'react';
import { Code, Palette, Terminal, BookOpen } from 'lucide-react';
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
      const matchCourse =
        a.courseTitle?.toLowerCase().includes(q) || a.courseCode?.toLowerCase().includes(q);
      if (!matchTitle && !matchCourse) return false;
    }

    return true;
  });

  const handleToggleStatus = async (item) => {
    try {
      setUpdatingId(item.id);
      const nextStatus =
        item.status === 'SUBMITTED' || item.status === 'GRADED' ? 'IN_PROGRESS' : 'SUBMITTED';
      await api.updateAssignmentStatus(item.id, nextStatus);
      if (onStatusUpdate) onStatusUpdate();
    } catch (err) {
      alert('Failed to update assignment status: ' + err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const getIcon = (index) => {
    const icons = [
      { icon: Code, bg: 'peach' },
      { icon: Palette, bg: 'blue' },
      { icon: Terminal, bg: 'mint' },
      { icon: BookOpen, bg: 'peach' },
    ];
    return icons[index % icons.length];
  };

  const formatDueDate = (dateStr) => {
    if (!dateStr) return 'Today, 10:30 AM';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ', 11:59 PM';
  };

  return (
    <section className="panel panel--assignments" aria-label="My assignments">
      <div className="panel-header" style={{ flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
        <h3 className="panel-title">My Assignments</h3>
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

      <div style={{ marginBottom: '14px' }}>
        <input
          type="text"
          className="form-input"
          placeholder="Filter assignments by title or subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '8px 14px', fontSize: '13px', borderRadius: '10px' }}
        />
      </div>

      <div className="assignments-table">
        <div className="assignments-thead">
          <span className="col-task">TASK</span>
          <span className="col-grade">GRADE</span>
          <span className="col-update">UPDATE</span>
        </div>

        {filteredAssignments.length === 0 ? (
          <p className="no-results">No assignments match your filter.</p>
        ) : (
          filteredAssignments.map((a, idx) => {
            const { icon: IconComp, bg } = getIcon(idx);
            const isCompleted = a.status === 'GRADED' || a.status === 'SUBMITTED';

            return (
              <div key={a.id} className="assignment-row">
                <div className={`assignment-icon assignment-icon--${bg}`}>
                  <IconComp size={17} aria-hidden="true" />
                </div>
                <div className="assignment-info">
                  <strong>{a.title}</strong>
                  <span className="assignment-date">{formatDueDate(a.dueDate)}</span>
                </div>
                <div className="assignment-grade">
                  <strong>{a.grade || '--/100'}</strong>
                  <span>Final grade</span>
                </div>
                <button
                  type="button"
                  style={{ border: 'none', background: 'transparent', padding: 0, cursor: 'pointer' }}
                  onClick={() => handleToggleStatus(a)}
                  disabled={updatingId === a.id}
                  title="Click to toggle status"
                >
                  <span
                    className={`status-pill ${
                      isCompleted ? 'status-pill--completed' : 'status-pill--upcoming'
                    }`}
                  >
                    {isCompleted ? 'Completed' : 'Upcoming'}
                  </span>
                </button>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
