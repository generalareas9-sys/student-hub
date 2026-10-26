import React, { useState } from 'react';
import {
  Search,
  Bell,
  Mail,
  ChevronDown,
  ChevronRight,
  Clock,
  TrendingUp,
  FileText,
  Radio,
  Award,
  PieChart as PieIcon,
  Trophy,
  Target,
  Star,
  Megaphone,
  Globe,
  Phone,
  MapPin,
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export default function EdTechStudentDashboard({ onSwitchToInstructor }) {
  const [selectedMonth, setSelectedMonth] = useState('This Month');

  // Score Trend spline data matching reference chart (1 May to 31 May)
  const scoreTrendData = [
    { date: '1 May', score: 25 },
    { date: '6 May', score: 38 },
    { date: '11 May', score: 32 },
    { date: '16 May', score: 48 },
    { date: '21 May', score: 85 },
    { date: '26 May', score: 62 },
    { date: '31 May', score: 70 },
  ];

  // Subject Wise Performance data
  const subjectPerformanceData = [
    { name: 'Data Structures', value: 85, color: '#2563eb' },
    { name: 'DBMS', value: 78, color: '#06b6d4' },
    { name: 'Operating Systems', value: 82, color: '#f59e0b' },
    { name: 'Aptitude', value: 90, color: '#3b82f6' },
  ];

  const upcomingTests = [
    {
      id: 1,
      day: '24',
      month: 'MAY',
      title: 'Data Structures Test',
      time: '10:00 AM - 11:30 AM',
      status: 'Live',
      badgeClass: 'edtech-badge-live',
    },
    {
      id: 2,
      day: '28',
      month: 'MAY',
      title: 'Database Management',
      time: '02:00 PM - 03:30 PM',
      status: 'Upcoming',
      badgeClass: 'edtech-badge-upcoming',
    },
    {
      id: 3,
      day: '02',
      month: 'JUN',
      title: 'Operating Systems Test',
      time: '11:00 AM - 12:30 PM',
      status: 'Upcoming',
      badgeClass: 'edtech-badge-upcoming',
    },
  ];

  return (
    <div className="edtech-portal-root" id="edtechStudentPortal">
      {/* Top Header */}
      <header className="edtech-header" role="banner">
        <div className="edtech-header-left">
          <h1>Online Exam Portal</h1>
          <p>Smart Exams, Better Future</p>
        </div>

        <div className="edtech-header-right">
          <div className="edtech-search-box">
            <Search size={16} color="#94a3b8" />
            <input type="text" placeholder="Search here..." aria-label="Search portal" />
          </div>

          <button type="button" className="edtech-icon-btn" aria-label="Notifications">
            <Bell size={18} />
            <span className="edtech-badge">3</span>
          </button>

          <button type="button" className="edtech-icon-btn" aria-label="Messages">
            <Mail size={18} />
            <span className="edtech-badge">2</span>
          </button>

          <div className="edtech-user-pill">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Aryan Sharma"
              className="edtech-user-avatar"
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                Hi, Aryan 👋
              </span>
              <span style={{ fontSize: '11px', color: '#64748b' }}>Student</span>
            </div>
          </div>

          {/* Role switcher button to jump to School Overview */}
          <button
            type="button"
            onClick={onSwitchToInstructor}
            className="edtech-hero-btn"
            style={{
              padding: '6px 14px',
              fontSize: '11px',
              background: '#0f172a',
              color: '#ffffff',
              marginLeft: '8px',
            }}
            title="Switch to School Overview (Instructor View)"
          >
            Switch to School Overview ↗
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="edtech-main" id="mainContent">
        {/* Welcome Hero Banner */}
        <section className="edtech-hero-banner" aria-label="Welcome banner">
          <div className="edtech-hero-text">
            <h2>Welcome Back, Aryan Sharma! 👋</h2>
            <p>
              Ready to test your knowledge? Start your exam and track your performance with
              real-time analytics.
            </p>
            <button type="button" className="edtech-hero-btn">
              <span>Start New Exam</span>
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="edtech-hero-widgets">
            {/* Time Left Floating Card */}
            <div className="edtech-floating-widget">
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={14} color="#64748b" />
                <span className="edtech-floating-widget-title">Time Left</span>
              </div>
              <div className="edtech-floating-widget-val">01:29:45</div>
              <div className="edtech-floating-widget-title" style={{ marginTop: '4px' }}>
                Current Test
              </div>
              <div className="edtech-floating-widget-sub">Aptitude Test</div>
            </div>

            {/* Score Floating Card */}
            <div className="edtech-floating-widget">
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <TrendingUp size={14} color="#16a34a" />
                <span className="edtech-floating-widget-title">Your Score</span>
              </div>
              <div className="edtech-floating-widget-val" style={{ color: '#16a34a' }}>
                85%
              </div>
              <div className="edtech-floating-widget-sub" style={{ color: '#16a34a' }}>
                ↗ Top 5%
              </div>
            </div>
          </div>
        </section>

        {/* 4 Quick Action Cards */}
        <section className="edtech-actions-grid" aria-label="Exam actions">
          <div className="edtech-action-card">
            <div className="edtech-action-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>
              <FileText size={26} />
            </div>
            <h4>Start Exam</h4>
            <p>Attempt a new scheduled exam</p>
            <button
              type="button"
              className="edtech-action-btn"
              style={{ background: '#2563eb', color: '#ffffff' }}
            >
              <span>Start Now</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="edtech-action-card">
            <div className="edtech-action-icon" style={{ background: '#f0fdf4', color: '#16a34a' }}>
              <Radio size={26} />
            </div>
            <h4>Live Test</h4>
            <p>Join live ongoing test session</p>
            <button
              type="button"
              className="edtech-action-btn"
              style={{ background: '#16a34a', color: '#ffffff' }}
            >
              <span>Join Now</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="edtech-action-card">
            <div className="edtech-action-icon" style={{ background: '#faf5ff', color: '#7c3aed' }}>
              <Award size={26} />
            </div>
            <h4>Results</h4>
            <p>View your graded test results</p>
            <button
              type="button"
              className="edtech-action-btn"
              style={{ background: '#7c3aed', color: '#ffffff' }}
            >
              <span>View Results</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="edtech-action-card">
            <div className="edtech-action-icon" style={{ background: '#fff7ed', color: '#ea580c' }}>
              <PieIcon size={26} />
            </div>
            <h4>Analytics</h4>
            <p>Track your test performance</p>
            <button
              type="button"
              className="edtech-action-btn"
              style={{ background: '#ea580c', color: '#ffffff' }}
            >
              <span>View Analytics</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </section>

        {/* Performance Overview (4 Stat Cards) */}
        <section aria-label="Performance overview">
          <div className="edtech-perf-header">
            <h3>Performance Overview</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  background: '#ffffff',
                  fontSize: '12px',
                }}
              >
                <option value="This Month">This Month</option>
                <option value="Last Month">Last Month</option>
                <option value="This Term">This Term</option>
              </select>
            </div>
          </div>

          <div className="edtech-stats-grid">
            <div className="edtech-stat-card">
              <div className="edtech-stat-badge" style={{ background: '#2563eb' }}>
                <FileText size={20} />
              </div>
              <div>
                <div className="edtech-stat-num">12</div>
                <div className="edtech-stat-lbl">Tests Attempted</div>
                <div className="edtech-stat-sub">↑ 20% vs last month</div>
              </div>
            </div>

            <div className="edtech-stat-card">
              <div className="edtech-stat-badge" style={{ background: '#16a34a' }}>
                <Trophy size={20} />
              </div>
              <div>
                <div className="edtech-stat-num">85%</div>
                <div className="edtech-stat-lbl">Average Score</div>
                <div className="edtech-stat-sub">↑ 15% vs last month</div>
              </div>
            </div>

            <div className="edtech-stat-card">
              <div className="edtech-stat-badge" style={{ background: '#7c3aed' }}>
                <Target size={20} />
              </div>
              <div>
                <div className="edtech-stat-num">8/12</div>
                <div className="edtech-stat-lbl">Tests Qualified</div>
                <div className="edtech-stat-sub">↑ 25% vs last month</div>
              </div>
            </div>

            <div className="edtech-stat-card">
              <div className="edtech-stat-badge" style={{ background: '#ea580c' }}>
                <Star size={20} />
              </div>
              <div>
                <div className="edtech-stat-num">320</div>
                <div className="edtech-stat-lbl">Total Marks</div>
                <div className="edtech-stat-sub">↑ 18% vs last month</div>
              </div>
            </div>
          </div>
        </section>

        {/* Lower Two-Column Body: Charts on Left | Profile & Upcoming on Right */}
        <div className="edtech-body-grid">
          {/* Left Column: Score Trend + Subject Wise Performance */}
          <div className="edtech-charts-stack">
            {/* Score Trend Line Chart */}
            <div className="edtech-card">
              <div className="edtech-card-header">
                <h4 className="edtech-card-title">Score Trend</h4>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#2563eb' }}>
                  85% (21 May)
                </span>
              </div>
              <div style={{ width: '100%', height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={scoreTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                      dataKey="date"
                      axisLine={{ stroke: '#e2e8f0' }}
                      tickLine={false}
                      tick={{ fill: '#64748b', fontSize: 11 }}
                    />
                    <YAxis
                      domain={[0, 100]}
                      ticks={[0, 25, 50, 75, 100]}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#94a3b8', fontSize: 11 }}
                    />
                    <Tooltip
                      formatter={(val) => [`${val}%`, 'Score']}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="#2563eb"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#scoreColor)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Subject Wise Performance Donut */}
            <div className="edtech-card">
              <div className="edtech-card-header">
                <h4 className="edtech-card-title">Subject Wise Performance</h4>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div style={{ width: 140, height: 140, position: 'relative' }}>
                  <ResponsiveContainer width="100%" height={140}>
                    <PieChart>
                      <Pie
                        data={subjectPerformanceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={42}
                        outerRadius={65}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {subjectPerformanceData.map((entry, index) => (
                          <Cell key={`subject-cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(val, name) => [`${val}%`, name]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {subjectPerformanceData.map((item) => (
                    <div
                      key={item.name}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '12px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: item.color,
                          }}
                        />
                        <span style={{ color: '#475569' }}>{item.name}</span>
                      </div>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Student Profile, Upcoming Tests, Announcements */}
          <div className="edtech-right-stack">
            {/* Student Profile Card */}
            <div className="edtech-card edtech-profile-card">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80"
                alt="Aryan Sharma"
                className="edtech-profile-avatar"
              />
              <h4 className="edtech-profile-name">Aryan Sharma</h4>
              <p className="edtech-profile-roll">
                Roll No. 2024EDTECH105
                <br />
                B.Tech – Computer Science | Year: 2nd Year
              </p>

              <div style={{ textAlign: 'left', marginTop: '14px' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '11px',
                    fontWeight: 600,
                  }}
                >
                  <span style={{ color: '#64748b' }}>Profile Completion</span>
                  <span style={{ color: '#2563eb' }}>80%</span>
                </div>
                <div className="edtech-progress-bar">
                  <div className="edtech-progress-fill" style={{ width: '80%' }} />
                </div>
              </div>
            </div>

            {/* Upcoming Tests */}
            <div className="edtech-card">
              <div className="edtech-card-header">
                <h4 className="edtech-card-title">Upcoming Tests</h4>
                <a href="#view-tests" className="edtech-card-link">
                  View All
                </a>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {upcomingTests.map((t) => (
                  <div key={t.id} className="edtech-upcoming-item">
                    <div className="edtech-date-badge">
                      <div className="edtech-date-day">{t.day}</div>
                      <div className="edtech-date-month">{t.month}</div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>
                        {t.title}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>{t.time}</div>
                    </div>
                    <span className={t.badgeClass}>{t.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Announcements */}
            <div className="edtech-card">
              <div className="edtech-card-header">
                <h4 className="edtech-card-title">Announcements</h4>
                <a href="#view-announcements" className="edtech-card-link">
                  View All
                </a>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div
                  style={{
                    background: '#eff6ff',
                    color: '#2563eb',
                    padding: '8px',
                    borderRadius: '8px',
                    flexShrink: 0,
                  }}
                >
                  <Megaphone size={18} />
                </div>
                <div style={{ fontSize: '12px' }}>
                  <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                    Scheduled Maintenance
                  </div>
                  <p style={{ margin: 0, color: '#64748b', lineHeight: 1.4, fontSize: '11px' }}>
                    System maintenance on 25 May 2024 from 01:00 AM to 03:00 AM.
                  </p>
                </div>
              </div>

              {/* Dots pagination */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginTop: '12px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2563eb' }} />
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#cbd5e1' }} />
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#cbd5e1' }} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Banner */}
      <footer className="edtech-footer" role="contentinfo">
        <div className="edtech-footer-info">
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Globe size={14} />
            <a href="https://www.edtechinnovate.com" target="_blank" rel="noreferrer">
              www.edtechinnovate.com
            </a>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Phone size={14} />
            +91 8851920153
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={14} />
            A-18, S1, Second Floor, Sector 59, Noida UP 201301.
          </span>
        </div>
        <div>© 2024 EDTECH Innovate Pvt. Ltd. All Rights Reserved.</div>
      </footer>
    </div>
  );
}
