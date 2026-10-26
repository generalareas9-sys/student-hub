import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutGrid, BookOpen, Award, Calendar, Shield, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LandingPage() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const handleDemoLogin = async () => {
    try {
      await login('student@studenthub.edu', 'password123');
      navigate('/dashboard');
    } catch (err) {
      navigate('/login');
    }
  };

  return (
    <div className="auth-wrapper" style={{ flexDirection: 'column', padding: '40px 24px' }}>
      {/* Top Navbar */}
      <nav
        style={{
          width: '100%',
          maxWidth: '1200px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: '#5048e5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <LayoutGrid size={22} color="#ffffff" />
          </div>
          <span style={{ fontSize: '22px', fontWeight: '800', color: '#ffffff' }}>StudentHub</span>
        </div>

        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          {isAuthenticated ? (
            <Link to="/dashboard" className="btn-primary" style={{ width: 'auto' }}>
              <span>Go to Dashboard</span>
              <ArrowRight size={16} />
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                style={{ color: '#ffffff', fontWeight: '600', padding: '10px 18px', fontSize: '14px' }}
              >
                Sign In
              </Link>
              <Link to="/register" className="btn-primary" style={{ width: 'auto' }}>
                <span>Get Started Free</span>
                <ArrowRight size={16} />
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="landing-hero">
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(80, 72, 229, 0.25)',
            border: '1px solid rgba(80, 72, 229, 0.5)',
            padding: '6px 14px',
            borderRadius: '99px',
            color: '#c5c2ff',
            fontSize: '12px',
            fontWeight: '600',
            marginBottom: '20px',
          }}
        >
          <Sparkles size={14} color="#5048e5" />
          <span>Student Hub Academic Management 2.0</span>
        </div>

        <h1>Master Your Academic Journey in One Seamless Hub</h1>
        <p>
          Real-time course tracking, integrated assignment deadlines, verified GPA performance curves, and intelligent scheduling — built for high-performing students.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <Link
            to="/register"
            className="btn-primary"
            style={{ width: 'auto', padding: '14px 28px', fontSize: '15px' }}
          >
            <span>Create Student Account</span>
            <ArrowRight size={18} />
          </Link>
          <button
            type="button"
            className="btn-secondary"
            onClick={handleDemoLogin}
            style={{
              padding: '14px 28px',
              fontSize: '15px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <span>Explore Demo Student Account</span>
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="landing-features">
        <div className="landing-card">
          <BookOpen size={28} color="#e8734a" />
          <h3>Curated Course Tracking</h3>
          <p>Monitor your active enrollments, syllabus milestones, and credit completion progress across all academic terms.</p>
        </div>

        <div className="landing-card">
          <Award size={28} color="#2fb37c" />
          <h3>GPA & Performance Analytics</h3>
          <p>Real-time weighted score calculations, assessment breakdowns, and trend projections to stay ahead of graduation requirements.</p>
        </div>

        <div className="landing-card">
          <Calendar size={28} color="#5048e5" />
          <h3>Sliding Schedule Timeline</h3>
          <p>Visual 6-day timeline with time-block tracking for lectures, team meetups, exam slots, and assignment deadlines.</p>
        </div>

        <div className="landing-card">
          <Shield size={28} color="#0b5cab" />
          <h3>Enterprise Security</h3>
          <p>Argon2/bcrypt password protection, role-based access control, secure HTTP-only sessions, and audit logging.</p>
        </div>
      </section>
    </div>
  );
}
