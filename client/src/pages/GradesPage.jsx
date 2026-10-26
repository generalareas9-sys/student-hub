import React, { useState, useEffect } from 'react';
import AppShell from '../components/layout/AppShell';
import { Award, TrendingUp, BookOpen, CheckCircle } from 'lucide-react';
import api from '../services/api';

export default function GradesPage() {
  const [grades, setGrades] = useState([]);
  const [summary, setSummary] = useState({ gpa: '3.80', totalCredits: 24, letterGradeAverage: 'A-' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGrades() {
      try {
        const res = await api.getGrades();
        if (res.success) {
          setGrades(res.data);
          if (res.summary) setSummary(res.summary);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadGrades();
  }, []);

  return (
    <AppShell showRightPanel={false}>
      <div className="page-header-row">
        <div>
          <h2 className="page-title">Grades & Academic Transcript</h2>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>
            Verified grade records, cumulative GPA, and faculty assessment evaluations.
          </p>
        </div>
      </div>

      {/* GPA & Standing Highlights */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: '#ffffff', border: '1px solid var(--border)', borderRadius: 'var(--r-panel)', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary)', marginBottom: '8px' }}>
            <Award size={20} />
            <span style={{ fontSize: '13px', fontWeight: '600' }}>Cumulative GPA</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text)' }}>{summary.gpa}</div>
          <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>Out of 4.0 scale (Dean's Honor List)</div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid var(--border)', borderRadius: 'var(--r-panel)', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--mint)', marginBottom: '8px' }}>
            <TrendingUp size={20} />
            <span style={{ fontSize: '13px', fontWeight: '600' }}>Average Letter Grade</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text)' }}>{summary.letterGradeAverage}</div>
          <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>Superior academic performance</div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid var(--border)', borderRadius: 'var(--r-panel)', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--blue)', marginBottom: '8px' }}>
            <BookOpen size={20} />
            <span style={{ fontSize: '13px', fontWeight: '600' }}>Credits Completed</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text)' }}>{summary.totalCredits}</div>
          <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>On track for degree requirements</div>
        </div>
      </div>

      {/* Grade Records Table */}
      <div style={{ background: '#ffffff', border: '1px solid var(--border)', borderRadius: 'var(--r-panel)', padding: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Course Grade History</h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)', color: 'var(--muted)' }}>
                <th style={{ padding: '12px 14px' }}>Course</th>
                <th style={{ padding: '12px 14px' }}>Credits</th>
                <th style={{ padding: '12px 14px' }}>Score</th>
                <th style={{ padding: '12px 14px' }}>Grade</th>
                <th style={{ padding: '12px 14px' }}>Feedback</th>
                <th style={{ padding: '12px 14px' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((g) => (
                <tr key={g.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '14px', fontWeight: '600' }}>
                    <span style={{ color: g.course?.color || 'var(--primary)', marginRight: '6px' }}>
                      {g.course?.code}
                    </span>
                    {g.course?.title}
                  </td>
                  <td style={{ padding: '14px' }}>{g.course?.credits || 3}</td>
                  <td style={{ padding: '14px', fontWeight: '600' }}>
                    {g.score} / {g.maxScore} ({Math.round((g.score / g.maxScore) * 100)}%)
                  </td>
                  <td style={{ padding: '14px' }}>
                    <span
                      style={{
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontWeight: '700',
                        fontSize: '12px',
                        background: g.letterGrade.startsWith('A') ? 'var(--mint-bg)' : 'var(--blue-bg)',
                        color: g.letterGrade.startsWith('A') ? 'var(--mint)' : 'var(--blue)',
                      }}
                    >
                      {g.letterGrade}
                    </span>
                  </td>
                  <td style={{ padding: '14px', color: '#555' }}>{g.feedback || 'Evaluated.'}</td>
                  <td style={{ padding: '14px', color: 'var(--muted)' }}>
                    {new Date(g.gradedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
