import React, { useState } from 'react';
import { HelpCircle, X, Send } from 'lucide-react';

export default function HelpModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setMessage('');
      setIsOpen(false);
    }, 2000);
  };

  return (
    <>
      <button
        type="button"
        className="help-pill"
        onClick={() => setIsOpen(true)}
        aria-label="Open support and help center"
      >
        <HelpCircle size={16} />
        <span>Help</span>
      </button>

      {isOpen && (
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
          onClick={() => setIsOpen(false)}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: 'var(--r-panel)',
              width: '100%',
              maxWidth: '480px',
              padding: '28px',
              boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--muted)',
              }}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>
              Student Hub Support & Help
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '20px' }}>
              Have questions regarding course registration, assignment submissions, or grades? We're here to assist.
            </p>

            {submitted ? (
              <div className="alert-success">
                Thank you! Your ticket has been logged with student services.
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Describe your question or issue</label>
                  <textarea
                    className="form-input"
                    rows={4}
                    placeholder="e.g. How do I request a grade review for CS301?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn-primary">
                  <Send size={15} />
                  <span>Send Help Request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
