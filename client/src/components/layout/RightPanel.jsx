import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Pencil } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function RightPanel() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const profile = user?.profile;
  const fullName = profile?.fullName || 'Alex Morgan';
  const major = profile?.major || 'Human Computer Interaction';
  const studentId = profile?.studentId || 'STU-948201';
  const avatarUrl =
    profile?.avatarUrl ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';

  // 6-day sliding window calendar logic
  const [calendarOffset, setCalendarOffset] = useState(0);

  // Compute 6-day chips: window = 3 days before today through 2 days after, shifted by offset * 6
  const today = new Date();
  const baseDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3 + calendarOffset * 6);

  const days = [];
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  for (let i = 0; i < 6; i++) {
    const d = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + i);
    const isToday =
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear();
    days.push({
      date: d.getDate(),
      dayName: dayNames[d.getDay()],
      isToday,
      fullDate: d,
    });
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const currentMonthName = monthNames[baseDate.getMonth()];
  const currentYear = baseDate.getFullYear();

  return (
    <aside className="right-col" id="rightCol" aria-label="Profile and events">
      {/* 2. Profile Section */}
      <div className="profile-section">
        <div className="profile-header">
          <h3 className="profile-heading">Profile</h3>
          <button
            type="button"
            className="icon-btn"
            id="btnEditProfile"
            aria-label="Edit profile"
            onClick={() => navigate('/profile')}
          >
            <Pencil size={15} aria-hidden="true" />
          </button>
        </div>

        <div className="profile-avatar-wrap">
          <div className="avatar-ring">
            <img src={avatarUrl} alt={fullName} className="avatar-img" id="avatarImg" />
          </div>
          <h4 className="profile-name" id="profileName">{fullName}</h4>
          <p className="profile-caption" style={{ fontSize: '12px', color: 'var(--muted)', margin: '2px 0' }}>
            {major}
          </p>
          <span style={{ fontSize: '12px', color: 'var(--muted)', display: 'block' }}>
            {studentId}
          </span>
        </div>
      </div>

      {/* 3. Calendar Strip */}
      <div className="calendar-card">
        <div className="calendar-header">
          <button
            type="button"
            className="cal-arrow"
            id="calPrev"
            aria-label="Previous days"
            onClick={() => setCalendarOffset((prev) => prev - 1)}
          >
            <ChevronLeft size={16} aria-hidden="true" />
          </button>
          <h4 className="cal-month" id="calMonth">
            {currentMonthName} {currentYear}
          </h4>
          <button
            type="button"
            className="cal-arrow"
            id="calNext"
            aria-label="Next days"
            onClick={() => setCalendarOffset((prev) => prev + 1)}
          >
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>

        <div className="cal-days" id="calDays" role="tablist">
          {days.map((item, index) => (
            <div
              key={index}
              className={`day-chip ${item.isToday ? 'day-chip--today' : ''}`}
              role="tab"
              aria-selected={item.isToday}
              tabIndex={0}
            >
              <span className="day-chip-label">{item.dayName}</span>
              <span className="day-chip-date">{item.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Upcoming Events Timeline */}
      <div className="events-section">
        <h3 className="events-heading">Upcoming Events</h3>
        <div className="events-grid">
          {/* Time header */}
          <div className="events-times" aria-hidden="true">
            <span>9:30</span>
            <span>10:00</span>
            <span>10:30</span>
            <span>11:00</span>
            <span>11:30</span>
            <span>12:00</span>
            <span>12:30</span>
            <span>13:00</span>
            <span>13:30</span>
          </div>

          {/* Day rows with event pills */}
          <div className="events-body">
            <div className="event-row">
              <span className="event-day">Sun</span>
              <div className="event-track">
                <span
                  className="event-pill event-pill--orange"
                  style={{ '--col': 2, '--span': 3 }}
                  title="Team Meetup"
                >
                  Team Meetup
                </span>
              </div>
            </div>

            <div className="event-row">
              <span className="event-day">Mon</span>
              <div className="event-track"></div>
            </div>

            <div className="event-row">
              <span className="event-day">Tue</span>
              <div className="event-track">
                <span
                  className="event-pill event-pill--dark"
                  style={{ '--col': 6, '--span': 3 }}
                  title="Illustration"
                >
                  Illustration
                </span>
              </div>
            </div>

            <div className="event-row">
              <span className="event-day">Wed</span>
              <div className="event-track">
                <span
                  className="event-pill event-pill--blue"
                  style={{ '--col': 4, '--span': 3 }}
                  title="Research"
                >
                  Research
                </span>
              </div>
            </div>

            <div className="event-row">
              <span className="event-day">Thu</span>
              <div className="event-track">
                <span
                  className="event-pill event-pill--coral"
                  style={{ '--col': 7, '--span': 3 }}
                  title="Presentation"
                >
                  Presentation
                </span>
              </div>
            </div>

            <div className="event-row">
              <span className="event-day">Fri</span>
              <div className="event-track"></div>
            </div>

            <div className="event-row">
              <span className="event-day">Sat</span>
              <div className="event-track">
                <span
                  className="event-pill event-pill--green"
                  style={{ '--col': 3, '--span': 3 }}
                  title="Review Session"
                >
                  Review Session
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
