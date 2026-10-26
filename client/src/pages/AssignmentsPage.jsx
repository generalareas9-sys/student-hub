import React, { useState, useEffect } from 'react';
import AppShell from '../components/layout/AppShell';
import AssignmentsTable from '../components/dashboard/AssignmentsTable';
import api from '../services/api';

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAssignments = async () => {
    try {
      const res = await api.getAssignments();
      if (res.success) {
        setAssignments(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssignments();
  }, []);

  return (
    <AppShell showRightPanel={false}>
      <div className="page-header-row">
        <div>
          <h2 className="page-title">Assignments & Submissions</h2>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>
            Track project deliverables, grading feedback, and upcoming due dates.
          </p>
        </div>
      </div>

      <AssignmentsTable
        assignments={assignments}
        onStatusUpdate={loadAssignments}
      />
    </AppShell>
  );
}
