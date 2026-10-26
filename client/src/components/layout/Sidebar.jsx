import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutGrid,
  Briefcase,
  MessageCircle,
  BarChart3,
  Calendar,
  Settings,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar({ isOpen, onClose }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutGrid },
    { name: 'Courses', path: '/courses', icon: Briefcase },
    { name: 'Chat', path: '/chat', icon: MessageCircle },
    { name: 'Grades', path: '/grades', icon: BarChart3 },
    { name: 'Schedule', path: '/schedule', icon: Calendar },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`} id="sidebar" aria-label="Main navigation">
        {/* Logo: two overlapping rounded squares (purple + lavender) before bold 18px StudentHub */}
        <div className="sidebar-logo">
          <div className="logo-icon" aria-hidden="true">
            <span className="logo-sq logo-sq--back" />
            <span className="logo-sq logo-sq--front" />
          </div>
          <span className="logo-text">StudentHub</span>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav" aria-label="Dashboard navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                onClick={onClose}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Premium Upgrade Promotion Card */}
        <div className="premium-card">
          <h4 className="premium-title">Get Premium</h4>
          <p className="premium-desc">Buy premium and get access to new courses</p>
          <button
            type="button"
            className="premium-btn"
            id="btnSubscribe"
            onClick={() => alert('StudentHub Pro subscription will launch soon!')}
          >
            Subscribe
          </button>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
          <button
            type="button"
            className="nav-item"
            style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer' }}
            onClick={handleLogout}
          >
            <LogOut size={18} aria-hidden="true" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
