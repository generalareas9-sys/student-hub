import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Edit2 } from 'lucide-react';
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
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function loadEvents() {
      try {
        const res = await api.getEvents();
        if (res.success) {
          setEvents(res.data);
        }
      } catch (err) {
        // Fallback demo events
      }
    }
    loadEvents();
  }, []);

  // Compute 6-day chips based on today + calendarOffset
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
    <aside className="right-panel" aria-label="Student profile and schedule">
      {/* Student Profile Card */}
      <section className="profile-card" aria-label="Student profile">
        <div className="profile-avatar-wrap">
          <img src={avatarUrl} alt={fullName} className="profile-avatar" />
          <button
            type="button"
            className="profile-edit-btn"
            title="Edit profile"
            onClick={() => navigate('/profile')}
          >
            <Edit2 size={13} color="#ffffff" />
          </button>
        </div>
        <h3 className="profile-name">{fullName}</h3>
        <p className="profile-dept">{major}</p>
        <span className="profile-id">{studentId}</span>
      </section>

      {/* Calendar Strip */}
      <section className="calendar-card" aria-label="Calendar">
        <div className="calendar-header">
          <span className="cal-month">
            {currentMonthName} {currentYear}
          </span>
          <div className="cal-controls">
            <button
              type="button"
              className="cal-arrow"
              onClick={() => setCalendarOffset((prev) => prev - 1)}
              aria-label="Previous days"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              className="cal-arrow"
              onClick={() => setCalendarOffset((prev) => prev + 1)}
              aria-label="Next days"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="cal-days" role="tablist">
          {days.map((item, index) => (
            <div
              key={index}
              className={`cal-day ${item.isToday ? 'active' : ''}`}
              role="tab"
              aria-selected={item.isToday}
              tabIndex={0}
            >
              <span className="day-name">{item.dayName}</span>
              <span className="day-num">{item.date}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="events-card" aria-label="Upcoming events">
        <div className="events-header">
          <h4 className="events-title">Upcoming Events</h4>
          <span className="events-sub">Today</span>
        </div>

        <div className="events-timeline">
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

          <div className="events-tracks">
            <div className="event-track">
              <span
                className="event-pill event-pill--orange"
                style={{ '--col': 2, '--span': 3 }}
                title="Team Meetup (10:00 - 11:30)"
              >
                Team Meetup
              </span>
            </div>
            <div className="event-track">
              <span
                className="event-pill event-pill--purple"
                style={{ '--col': 4, '--span': 3 }}
                title="HCI Lecture: User Research (11:00 - 12:30)"
              >
                HCI Lecture
              </span>
            </div>
            <div className="event-track">
              <span
                className="event-pill event-pill--mint"
                style={{ '--col': 6, '--span': 3 }}
                title="Algorithm Lab (12:00 - 13:30)"
              >
                Algorithm Lab
              </span>
            </div>
          </div>
        </div>
      </section>
    </aside>
  );
}
