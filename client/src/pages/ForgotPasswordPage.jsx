import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, AlertCircle, CheckCircle2, ArrowLeft, Mail } from 'lucide-react';
import api from '../services/api';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.forgotPassword(email);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Failed to submit reset request.');
    } finally {
      setLoading(false);
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
          <h2 className="auth-title">Reset Password</h2>
          <p className="auth-subtitle">Enter your student email to receive recovery instructions</p>
        </div>

        {error && (
          <div className="alert-error">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {submitted ? (
          <div>
            <div className="alert-success" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>
                <CheckCircle2 size={18} />
                <span>Instructions Dispatched</span>
              </div>
              <p style={{ marginTop: '6px', fontSize: '12px' }}>
                If an account matches <strong>{email}</strong>, a secure reset token has been issued.
              </p>
            </div>
            <Link to="/login" className="btn-primary" style={{ marginTop: '16px' }}>
              <ArrowLeft size={16} />
              <span>Back to Sign In</span>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Registered Email</label>
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

            <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '8px' }}>
              <Mail size={16} />
              <span>{loading ? 'Sending...' : 'Send Reset Instructions'}</span>
            </button>

            <div className="auth-footer">
              Remember your password? <Link to="/login">Sign in</Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
