import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="auth-wrapper" style={{ textAlign: 'center' }}>
      <div className="auth-card" style={{ maxWidth: '420px' }}>
        <h1 style={{ fontSize: '64px', fontWeight: '800', color: 'var(--primary)', lineHeight: '1' }}>404</h1>
        <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '14px 0 8px' }}>Page Not Found</h2>
        <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '24px' }}>
          The page or academic resource you requested does not exist or has been relocated.
        </p>
        <Link to="/dashboard" className="btn-primary" style={{ justifyContent: 'center' }}>
          <ArrowLeft size={16} />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    </div>
  );
}
