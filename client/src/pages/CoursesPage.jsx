import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import { BookOpen, User, CheckCircle, Clock, PlusCircle } from 'lucide-react';
import api from '../services/api';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const loadCourses = async () => {
    try {
      const res = await api.getCourses();
      if (res.success) {
        setCourses(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      await api.enrollCourse(courseId);
      loadCourses();
    } catch (err) {
      alert(err.message || 'Enrollment failed.');
    }
  };

  const filteredCourses = courses.filter((c) => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return c.title.toLowerCase().includes(q) || c.code.toLowerCase().includes(q);
  });

  return (
    <AppShell showRightPanel={false} searchValue={searchTerm} onSearch={setSearchTerm}>
      <div className="page-header-row">
        <div>
          <h2 className="page-title">Course Catalog & Curriculum</h2>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>
            Manage your registered academic terms, lecture syllabi, and assignment pipelines.
          </p>
        </div>
      </div>

      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)' }}>
          Loading courses...
        </div>
      ) : (
        <div className="courses-grid">
          {filteredCourses.map((c) => (
            <div key={c.id} className="course-card">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span
                    className="course-badge"
                    style={{ background: `${c.color}20`, color: c.color }}
                  >
                    {c.code}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--muted)' }}>
                    {c.credits} Credits
                  </span>
                </div>

                <h3 className="course-card-title">{c.title}</h3>
                <p className="course-card-instructor">
                  <User size={13} style={{ display: 'inline', marginRight: '4px' }} />
                  {c.instructorName}
                </p>

                <p style={{ fontSize: '12px', color: '#666', marginBottom: '14px', lineHeight: '1.4' }}>
                  {c.description}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600' }}>
                  <span>Term Progress</span>
                  <span style={{ color: c.color }}>{c.progressPercent}%</span>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${c.progressPercent}%`, background: c.color }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                <button
                  type="button"
                  className="btn-secondary"
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => navigate(`/courses/${c.id}`)}
                >
                  <BookOpen size={14} />
                  <span>Syllabus</span>
                </button>

                {c.isEnrolled ? (
                  <button
                    type="button"
                    className="btn-secondary"
                    style={{
                      background: 'var(--mint-bg)',
                      color: 'var(--mint)',
                      cursor: 'default',
                    }}
                  >
                    <CheckCircle size={14} />
                    <span>Enrolled</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-primary"
                    style={{ width: 'auto', padding: '8px 14px' }}
                    onClick={() => handleEnroll(c.id)}
                  >
                    <PlusCircle size={14} />
                    <span>Enroll</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </AppShell>
  );
}
