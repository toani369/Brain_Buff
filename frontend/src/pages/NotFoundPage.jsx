import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem'
      }}
    >
      <div
        style={{
          fontSize: '5rem',
          fontWeight: 900,
          color: '#cbd5e1',
          lineHeight: 1,
          marginBottom: '1rem'
        }}
      >
        404
      </div>
      <h1
        style={{
          fontSize: '1.75rem',
          fontWeight: 800,
          color: '#0f172a',
          marginBottom: '0.5rem'
        }}
      >
        Page Not Found
      </h1>
      <p
        style={{
          color: '#64748b',
          maxWidth: '440px',
          fontSize: '0.95rem',
          marginBottom: '1.75rem'
        }}
      >
        The requested neural route does not exist or has been shifted in memory. Return to your dashboard to resume training.
      </p>
      <Link to="/dashboard" className="btn btn-primary">
        Return to Dashboard
      </Link>
    </div>
  );
};

export default NotFoundPage;
