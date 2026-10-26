import React, { useState, useEffect } from 'react';
import AppShell from '../components/layout/AppShell';
import { useAuth } from '../context/AuthContext';
import { User, Mail, BookOpen, Phone, MapPin, CheckCircle, Save } from 'lucide-react';
import api from '../services/api';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    major: '',
    yearOfStudy: 'Junior',
    phone: '',
    address: '',
    bio: '',
    avatarUrl: '',
  });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.profile) {
      setFormData({
        fullName: user.profile.fullName || '',
        major: user.profile.major || '',
        yearOfStudy: user.profile.yearOfStudy || 'Junior',
        phone: user.profile.phone || '',
        address: user.profile.address || '',
        bio: user.profile.bio || '',
        avatarUrl: user.profile.avatarUrl || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaved(false);
    setLoading(true);

    try {
      const res = await api.updateProfile(formData);
      if (res.success && res.data) {
        setSaved(true);
        if (user) {
          updateUser({ ...user, profile: res.data });
        }
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) {
      setError(err.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell showRightPanel={false}>
      <div className="page-header-row">
        <div>
          <h2 className="page-title">Student Profile & Credentials</h2>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>
            Update your public profile, contact details, and department information.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '24px', alignItems: 'flex-start' }}>
        {/* Left Avatar Card */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r-panel)',
            padding: '24px',
            textAlign: 'center',
          }}
        >
          <img
            src={formData.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
            alt="Profile Avatar"
            style={{
              width: '96px',
              height: '96px',
              borderRadius: '50%',
              margin: '0 auto 14px',
              objectFit: 'cover',
              border: '3px solid var(--primary-soft)',
            }}
          />
          <h3 style={{ fontSize: '16px', fontWeight: '700' }}>{formData.fullName || 'Student'}</h3>
          <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '4px 0 10px' }}>{formData.major}</p>
          <span
            style={{
              display: 'inline-block',
              background: 'var(--primary-soft)',
              color: 'var(--primary)',
              padding: '4px 10px',
              borderRadius: '99px',
              fontSize: '11px',
              fontWeight: '700',
            }}
          >
            {user?.profile?.studentId || 'STU-948201'}
          </span>
        </div>

        {/* Right Edit Form */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r-panel)',
            padding: '28px',
          }}
        >
          {saved && (
            <div className="alert-success">
              <CheckCircle size={16} />
              <span>Profile details saved successfully!</span>
            </div>
          )}
          {error && <div className="alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label>Full Legal Name</label>
                <input
                  type="text"
                  name="fullName"
                  className="form-input"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Major / Degree Track</label>
                <input
                  type="text"
                  name="major"
                  className="form-input"
                  value={formData.major}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Academic Year</label>
                <select
                  name="yearOfStudy"
                  className="form-input"
                  value={formData.yearOfStudy}
                  onChange={handleChange}
                >
                  <option value="Freshman">Freshman (Year 1)</option>
                  <option value="Sophomore">Sophomore (Year 2)</option>
                  <option value="Junior">Junior (Year 3)</option>
                  <option value="Senior">Senior (Year 4)</option>
                  <option value="Graduate">Graduate / Master's</option>
                </select>
              </div>

              <div className="form-group">
                <label>Contact Phone</label>
                <input
                  type="text"
                  name="phone"
                  className="form-input"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Campus / Residential Address</label>
              <input
                type="text"
                name="address"
                className="form-input"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Bio / Research Interests</label>
              <textarea
                name="bio"
                rows={3}
                className="form-input"
                value={formData.bio}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Avatar Photo URL</label>
              <input
                type="url"
                name="avatarUrl"
                className="form-input"
                value={formData.avatarUrl}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn-primary" disabled={loading} style={{ width: 'auto', padding: '12px 24px', marginTop: '12px' }}>
              <Save size={16} />
              <span>{loading ? 'Saving...' : 'Save Profile Changes'}</span>
            </button>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
