import React from 'react';
import AppShell from '../components/layout/AppShell';
import { HelpCircle, FileText, CheckCircle2, MessageCircle } from 'lucide-react';

export default function HelpPage() {
  const faqs = [
    {
      q: 'How are my study hours and statistics calculated?',
      a: 'Study hours are computed from your logged course sessions and platform activity. Weekly charts update dynamically to help you maintain consistent academic momentum.',
    },
    {
      q: 'How do I submit an assignment or project link?',
      a: 'Go to the Assignments tab or Course Syllabus, select the assignment, and click "Submit". You can attach project links, repository URLs, or file uploads.',
    },
    {
      q: 'How is my cumulative GPA determined?',
      a: 'Your cumulative GPA follows the standard 4.0 credit-weighted scale calculated directly from verified course grades published by your instructors.',
    },
    {
      q: 'Can I reschedule an event or lecture in my calendar?',
      a: 'Yes, head to Schedule where you can add new personal study sessions, exam reminders, and track lecture halls.',
    },
  ];

  return (
    <AppShell showRightPanel={false}>
      <div className="page-header-row">
        <div>
          <h2 className="page-title">Help & Student Support</h2>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>
            Frequently asked questions, academic guides, and student service contact channels.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {faqs.map((f, i) => (
          <div
            key={i}
            style={{
              background: '#ffffff',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-panel)',
              padding: '24px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary)', marginBottom: '10px' }}>
              <HelpCircle size={18} />
              <h3 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--text)' }}>{f.q}</h3>
            </div>
            <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.5' }}>{f.a}</p>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
