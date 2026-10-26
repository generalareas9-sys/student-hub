import React, { useState, useEffect } from 'react';
import AppShell from '../components/layout/AppShell';
import { Calendar as CalendarIcon, Clock, MapPin, Plus, Trash2 } from 'lucide-react';
import api from '../services/api';

export default function SchedulePage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    eventType: 'CLASS',
    startTime: '2026-10-26T14:00',
    endTime: '2026-10-26T15:30',
    location: 'Campus Hall A',
    color: '#5048e5',
  });

  const loadEvents = async () => {
    try {
      const res = await api.getEvents();
      if (res.success) {
        setEvents(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      await api.createEvent(newEvent);
      setShowAddModal(false);
      setNewEvent({
        title: '',
        eventType: 'CLASS',
        startTime: '2026-10-26T14:00',
        endTime: '2026-10-26T15:30',
        location: 'Campus Hall A',
        color: '#5048e5',
      });
      loadEvents();
    } catch (err) {
      alert('Failed to create event: ' + err.message);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await api.deleteEvent(id);
      loadEvents();
    } catch (err) {
      alert('Failed to delete event: ' + err.message);
    }
  };

  return (
    <AppShell showRightPanel={false}>
      <div className="page-header-row">
        <div>
          <h2 className="page-title">Academic Schedule & Calendar</h2>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>
            Plan lectures, lab time, study groups, and exam timetables.
          </p>
        </div>
        <button
          type="button"
          className="btn-primary"
          style={{ width: 'auto' }}
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={16} />
          <span>Add Schedule Event</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
        {events.map((ev) => {
          const start = new Date(ev.startTime);
          const end = new Date(ev.endTime);
          return (
            <div
              key={ev.id}
              style={{
                background: '#ffffff',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r-panel)',
                padding: '20px',
                borderLeft: `5px solid ${ev.color || 'var(--primary)'}`,
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: `${ev.color || '#5048e5'}20`,
                    color: ev.color || '#5048e5',
                    textTransform: 'uppercase',
                  }}
                >
                  {ev.eventType}
                </span>

                <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '10px 0 6px', color: 'var(--text)' }}>
                  {ev.title}
                </h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--muted)', marginBottom: '6px' }}>
                  <Clock size={14} />
                  <span>
                    {start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} –{' '}
                    {end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--muted)' }}>
                  <MapPin size={14} />
                  <span>{ev.location || 'Online Campus'}</span>
                </div>
              </div>

              <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => handleDeleteEvent(ev.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#e8734a',
                    cursor: 'pointer',
                    padding: '4px',
                  }}
                  title="Remove event"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showAddModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(27, 27, 75, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
          onClick={() => setShowAddModal(false)}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: 'var(--r-panel)',
              width: '100%',
              maxWidth: '460px',
              padding: '28px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>
              Add Academic Schedule Event
            </h3>

            <form onSubmit={handleCreateEvent}>
              <div className="form-group">
                <label>Event Title</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. HCI Lecture: Usability Testing"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Location / Room</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Science Hall 202 or Zoom"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Start Time</label>
                  <input
                    type="datetime-local"
                    className="form-input"
                    value={newEvent.startTime}
                    onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>End Time</label>
                  <input
                    type="datetime-local"
                    className="form-input"
                    value={newEvent.endTime}
                    onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                <button
                  type="button"
                  className="btn-secondary"
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppShell>
  );
}
