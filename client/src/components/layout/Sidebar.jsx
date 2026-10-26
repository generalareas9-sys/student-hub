import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  BarChart2,
  BookOpen,
  Users,
  UserCheck,
  Calendar,
  FileText,
  Settings,
  Trophy,
  GraduationCap,
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
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Students', path: '/courses', icon: User },
    { name: 'Results', path: '/grades', icon: BarChart2 },
    { name: 'Subjects', path: '/courses', icon: BookOpen },
    { name: 'Classes', path: '/schedule', icon: Users },
    { name: 'Teachers', path: '/chat', icon: UserCheck },
    { name: 'Attendance', path: '/schedule', icon: Calendar },
    { name: 'Reports', path: '/assignments', icon: FileText },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      <div
        className={`rd-sidebar-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className={`rd-sidebar ${isOpen ? 'open' : ''}`} id="sidebar" aria-label="Main navigation">
        {/* Brand Logo matching reference */}
        <div className="rd-sidebar-logo">
          <div className="rd-sidebar-logo-icon">
            <GraduationCap size={28} />
          </div>
          <div className="rd-sidebar-logo-text">
            <span className="rd-sidebar-logo-title">STUDENT RESULT</span>
            <span className="rd-sidebar-logo-subtitle">DASHBOARD</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="rd-sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `rd-nav-item ${isActive ? 'active' : ''}`}
                onClick={onClose}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Motivational Quote Card with Trophy */}
        <div className="rd-sidebar-quote-card">
          <div className="rd-quote-trophy-circle">
            <Trophy size={20} />
          </div>
          <p className="rd-quote-text">
            “ Education is the key to success. Keep learning, keep growing! ”
          </p>
        </div>

        <div style={{ marginTop: '14px' }}>
          <button
            type="button"
            className="rd-nav-item"
            style={{ width: '100%', justifyContent: 'flex-start' }}
            onClick={handleLogout}
            title="Log out"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
