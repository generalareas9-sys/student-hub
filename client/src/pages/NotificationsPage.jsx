import React, { useState, useEffect } from 'react';
import AppShell from '../components/layout/AppShell';
import { Bell, Check, Clock, AlertCircle } from 'lucide-react';
import api from '../services/api';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadNotifications = async () => {
    try {
      const res = await api.getNotifications();
      if (res.success) {
        setNotifications(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleMarkRead = async (id) => {
    try {
      await api.markNotificationRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await api.markAllNotificationsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AppShell showRightPanel={false}>
      <div className="page-header-row">
        <div>
          <h2 className="page-title">Notification Center</h2>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>
            System announcements, grade notifications, and upcoming deadlines.
          </p>
        </div>
        <button
          type="button"
          className="btn-secondary"
          onClick={handleMarkAllRead}
        >
          <Check size={16} />
          <span>Mark All Read</span>
        </button>
      </div>

      <div style={{ background: '#ffffff', border: '1px solid var(--border)', borderRadius: 'var(--r-panel)', padding: '20px' }}>
        {notifications.length === 0 ? (
          <div style={{ padding: '30px', textAlign: 'center', color: 'var(--muted)' }}>
            No notifications available.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {notifications.map((n) => (
              <div
                key={n.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '14px 18px',
                  borderRadius: 'var(--r-btn)',
                  border: '1px solid var(--border)',
                  background: n.isRead ? '#ffffff' : 'var(--primary-soft)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: '600', fontSize: '14px', color: 'var(--text)' }}>
                      {n.title}
                    </span>
                    {!n.isRead && (
                      <span
                        style={{
                          background: 'var(--primary)',
                          color: '#ffffff',
                          fontSize: '10px',
                          fontWeight: '700',
                          padding: '2px 6px',
                          borderRadius: '4px',
                        }}
                      >
                        NEW
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '13px', color: '#555', marginTop: '4px' }}>{n.message}</p>
                  <span style={{ fontSize: '11px', color: 'var(--muted)' }}>
                    {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })},{' '}
                    {new Date(n.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {!n.isRead && (
                  <button
                    type="button"
                    className="btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '12px' }}
                    onClick={() => handleMarkRead(n.id)}
                  >
                    Mark Read
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
