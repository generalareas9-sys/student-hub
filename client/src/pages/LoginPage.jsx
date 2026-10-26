import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutGrid, AlertCircle, ArrowRight, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = (role) => {
    if (role === 'student') {
      setEmail('student@studenthub.edu');
      setPassword('password123');
    } else {
      setEmail('instructor@studenthub.edu');
      setPassword('password123');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <Link to="/" className="auth-logo">
            <LayoutGrid size={24} color="#5048e5" />
            <span>StudentHub</span>
          </Link>
          <h2 className="auth-title">Welcome back!</h2>
          <p className="auth-subtitle">Sign in to access your student dashboard</p>
        </div>

        {error && (
          <div className="alert-error">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Student Email</label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="e.g. student@studenthub.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label htmlFor="password">Password</label>
              <Link
                to="/forgot-password"
                style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: '600' }}
              >
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '8px' }}>
            <LogIn size={16} />
            <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
          </button>
        </form>

        {/* Quick Demo Credentials shortcut */}
        <div
          style={{
            marginTop: '20px',
            padding: '12px',
            borderRadius: 'var(--r-btn)',
            background: 'var(--primary-soft)',
            fontSize: '12px',
          }}
        >
          <div style={{ fontWeight: '600', color: 'var(--primary)', marginBottom: '6px' }}>
            ⚡ Instant Demo Accounts:
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              className="btn-secondary"
              style={{ padding: '4px 8px', fontSize: '11px', flex: 1 }}
              onClick={() => handleFillDemo('student')}
            >
              Demo Student
            </button>
            <button
              type="button"
              className="btn-secondary"
              style={{ padding: '4px 8px', fontSize: '11px', flex: 1 }}
              onClick={() => handleFillDemo('instructor')}
            >
              Demo Instructor
            </button>
          </div>
        </div>

        <div className="auth-footer">
          Don't have an account? <Link to="/register">Register here</Link>
        </div>
      </div>
    </div>
  );
}
