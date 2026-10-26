import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutGrid,
  BookOpen,
  MessageSquare,
  Award,
  Calendar,
  Settings,
  LogOut,
  Sparkles,
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
    { name: 'Courses', path: '/courses', icon: BookOpen },
    { name: 'Chat', path: '/chat', icon: MessageSquare },
    { name: 'Grades', path: '/grades', icon: Award },
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
        <div className="brand">
          <div className="brand-logo" aria-hidden="true">
            <LayoutGrid size={20} color="#ffffff" />
          </div>
          <span className="brand-name">StudentHub</span>
        </div>

        <nav className="nav-menu">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                onClick={onClose}
              >
                <Icon size={18} className="nav-icon" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Premium Upgrade Promotion Card */}
        <div className="premium-card">
          <div className="premium-icon" aria-hidden="true">
            <Sparkles size={18} color="#5048e5" />
          </div>
          <h4 className="premium-title">Upgrade to Pro</h4>
          <p className="premium-text">Get unlimited AI tutoring and priority course enrollment.</p>
          <button
            type="button"
            className="premium-btn"
            onClick={() => alert('StudentHub Pro subscription will launch soon!')}
          >
            Upgrade Plan
          </button>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
          <button
            type="button"
            className="nav-item"
            style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'left' }}
            onClick={handleLogout}
          >
            <LogOut size={18} className="nav-icon" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
