import React, { useState, useEffect } from 'react';
import { Search, Bell, Menu, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function Header({ onMenuClick, onSearch, searchValue }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fullName = user?.profile?.fullName || user?.email?.split('@')[0] || 'Student';
  const firstName = fullName.split(' ')[0];
  const avatarUrl =
    user?.profile?.avatarUrl ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';

  useEffect(() => {
    async function loadNotifications() {
      try {
        const res = await api.getNotifications();
        if (res.success) {
          setNotifications(res.data);
          setUnreadCount(res.unreadCount);
        }
      } catch (err) {
        // Silently fail if unauthenticated
      }
    }
    loadNotifications();
  }, []);

  const handleMarkAllRead = async () => {
    try {
      await api.markAllNotificationsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="main-topbar" role="banner">
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <button
          type="button"
          className="menu-toggle"
          id="menuToggle"
          aria-label="Open navigation menu"
          onClick={onMenuClick}
        >
          <Menu size={20} />
        </button>
        <div className="greeting">
          <h1>
            Hello {firstName} <span aria-hidden="true">👋</span>
          </h1>
          <p className="greeting-sub">Let's learn something new today!</p>
        </div>
      </div>

      <div className="topbar-actions">
        <div className="search-box">
          <Search size={16} className="search-icon" aria-hidden="true" />
          <input
            type="search"
            id="searchInput"
            placeholder="Search"
            value={searchValue || ''}
            onChange={(e) => onSearch && onSearch(e.target.value)}
            aria-label="Search assignments"
          />
        </div>

        <div style={{ position: 'relative' }}>
          <button
            type="button"
            className="bell-btn"
            id="notifBtn"
            aria-label="Notifications"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={18} aria-hidden="true" />
            {unreadCount > 0 && <span className="bell-dot" aria-hidden="true" />}
          </button>

          {showNotifications && (
            <div
              style={{
                position: 'absolute',
                top: '46px',
                right: '0',
                width: '320px',
                background: '#ffffff',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r-panel)',
                boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                zIndex: 100,
                padding: '16px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px',
                  borderBottom: '1px solid var(--border)',
                  paddingBottom: '8px',
                }}
              >
                <h4 style={{ fontSize: '14px', fontWeight: '600' }}>Notifications</h4>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={handleMarkAllRead}
                    style={{
                      border: 'none',
                      background: 'none',
                      color: 'var(--primary)',
                      fontSize: '11px',
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
                {notifications.length === 0 ? (
                  <p style={{ fontSize: '13px', color: 'var(--muted)', textAlign: 'center', padding: '16px' }}>
                    No notifications yet.
                  </p>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      style={{
                        padding: '8px 10px',
                        borderRadius: '8px',
                        marginBottom: '6px',
                        background: n.isRead ? '#ffffff' : 'var(--primary-soft)',
                        fontSize: '12px',
                      }}
                    >
                      <div style={{ fontWeight: '600', color: 'var(--text)' }}>{n.title}</div>
                      <div style={{ color: 'var(--muted)', marginTop: '2px' }}>{n.message}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div
          className="topbar-avatar"
          onClick={() => navigate('/profile')}
          title="Go to profile"
          style={{ cursor: 'pointer' }}
        >
          <img
            src={avatarUrl}
            alt={fullName}
            className="avatar-circle"
          />
        </div>
      </div>
    </div>
  );
}
