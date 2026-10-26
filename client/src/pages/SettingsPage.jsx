import React, { useState } from 'react';
import AppShell from '../components/layout/AppShell';
import { Shield, Key, Bell, CheckCircle, AlertCircle } from 'lucide-react';
import api from '../services/api';

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMsg('');
    setErr('');

    if (newPassword !== confirmPassword) {
      return setErr('New passwords do not match.');
    }
    if (newPassword.length < 6) {
      return setErr('Password must be at least 6 characters.');
    }

    setLoading(true);
    try {
      const res = await api.changePassword({ currentPassword, newPassword });
      if (res.success) {
        setMsg('Password updated successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      setErr(error.message || 'Failed to update password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell showRightPanel={false}>
      <div className="page-header-row">
        <div>
          <h2 className="page-title">Account & Security Settings</h2>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>
            Manage security credentials, two-factor authentication, and notifications.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '640px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Security / Password Card */}
        <div style={{ background: '#ffffff', border: '1px solid var(--border)', borderRadius: 'var(--r-panel)', padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Key size={20} color="var(--primary)" />
            <h3 style={{ fontSize: '16px', fontWeight: '600' }}>Change Password</h3>
          </div>

          {msg && <div className="alert-success">{msg}</div>}
          {err && <div className="alert-error">{err}</div>}

          <form onSubmit={handlePasswordChange}>
            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="At least 6 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Repeat new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-primary" disabled={loading} style={{ width: 'auto', padding: '10px 20px', marginTop: '10px' }}>
              <span>{loading ? 'Updating...' : 'Update Password'}</span>
            </button>
          </form>
        </div>

        {/* Notifications & System Preferences */}
        <div style={{ background: '#ffffff', border: '1px solid var(--border)', borderRadius: 'var(--r-panel)', padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Bell size={20} color="var(--primary)" />
            <h3 style={{ fontSize: '16px', fontWeight: '600' }}>Notification Preferences</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px' }}>
              <input type="checkbox" defaultChecked style={{ accentColor: 'var(--primary)' }} />
              <span>Email notifications when new assignments are posted</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px' }}>
              <input type="checkbox" defaultChecked style={{ accentColor: 'var(--primary)' }} />
              <span>Reminders 24 hours prior to assignment deadlines</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px' }}>
              <input type="checkbox" defaultChecked style={{ accentColor: 'var(--primary)' }} />
              <span>Direct messages from professors and study group teammates</span>
            </label>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
