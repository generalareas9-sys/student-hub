import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import { ArrowLeft, BookOpen, User, Calendar, Award, CheckCircle } from 'lucide-react';
import api from '../services/api';

export default function CourseDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCourse() {
      try {
        const res = await api.getCourseById(id);
        if (res.success) {
          setCourse(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadCourse();
  }, [id]);

  if (loading) {
    return (
      <AppShell showRightPanel={false}>
        <div style={{ padding: '40px', textAlign: 'center' }}>Loading course details...</div>
      </AppShell>
    );
  }

  if (!course) {
    return (
      <AppShell showRightPanel={false}>
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h3>Course Not Found</h3>
          <button type="button" className="btn-primary" onClick={() => navigate('/courses')} style={{ width: 'auto', marginTop: '16px' }}>
            <ArrowLeft size={16} />
            <span>Back to Courses</span>
          </button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell showRightPanel={false}>
      <button
        type="button"
        className="btn-secondary"
        onClick={() => navigate('/courses')}
        style={{ marginBottom: '20px' }}
      >
        <ArrowLeft size={16} />
        <span>Back to All Courses</span>
      </button>

      <div
        style={{
          background: '#ffffff',
          border: '1px solid var(--border)',
          borderRadius: 'var(--r-panel)',
          padding: '28px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span
              className="course-badge"
              style={{ background: `${course.color}20`, color: course.color, fontSize: '13px', padding: '6px 12px' }}
            >
              {course.code}
            </span>
            <h1 style={{ fontSize: '24px', fontWeight: '700', marginTop: '10px', color: 'var(--text)' }}>
              {course.title}
            </h1>
            <p style={{ color: 'var(--muted)', marginTop: '4px', fontSize: '14px' }}>
              Instructor: <strong>{course.instructorName}</strong> &bull; {course.semester} &bull; {course.credits} Credits
            </p>
          </div>

          <div>
            {course.isEnrolled ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'var(--mint-bg)',
                  color: 'var(--mint)',
                  padding: '8px 16px',
                  borderRadius: 'var(--r-btn)',
                  fontWeight: '600',
                  fontSize: '13px',
                }}
              >
                <CheckCircle size={16} />
                <span>Enrolled ({course.studentCount} peers)</span>
              </div>
            ) : (
              <button
                type="button"
                className="btn-primary"
                onClick={async () => {
                  await api.enrollCourse(course.id);
                  setCourse({ ...course, isEnrolled: true });
                }}
              >
                <span>Enroll in Course</span>
              </button>
            )}
          </div>
        </div>

        <div style={{ marginTop: '24px', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Course Overview</h3>
          <p style={{ color: '#444', lineHeight: '1.6', fontSize: '14px' }}>{course.description}</p>
        </div>

        <div style={{ marginTop: '28px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '14px' }}>
            Course Assignments & Deadlines
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {course.assignments && course.assignments.length > 0 ? (
              course.assignments.map((a) => (
                <div
                  key={a.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '14px 18px',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--r-btn)',
                    background: '#fafafc',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '14px' }}>{a.title}</div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '2px' }}>
                      Due: {new Date(a.dueDate).toLocaleDateString()} &bull; Max Score: {a.maxScore} pts ({a.weight}% of grade)
                    </div>
                  </div>
                  <span
                    className={`status-pill status-pill--${a.status === 'GRADED' ? 'completed' : 'progress'}`}
                  >
                    {a.status}
                  </span>
                </div>
              ))
            ) : (
              <p style={{ color: 'var(--muted)', fontSize: '13px' }}>No active assignments posted for this course.</p>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
