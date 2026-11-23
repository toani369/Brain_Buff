import React from 'react';

const ErrorHandler = ({ error, onDismiss }) => {
  if (!error) return null;

  let message = '';
  if (typeof error === 'string') {
    message = error;
  } else if (error && error.message) {
    message = error.message;
  } else if (error && error.data && error.data.message) {
    message = error.data.message;
  } else {
    message = 'An unexpected error occurred.';
  }

  return (
    <div
      role="alert"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: '#dc2626',
        color: '#ffffff',
        padding: '0.75rem 1.5rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.925rem',
        fontWeight: 600,
        animation: 'slideDown 0.3s ease-out'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontSize: '1.2rem' }}>⚠️</span>
        <span>{message}</span>
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          style={{
            background: 'none',
            border: 'none',
            color: '#ffffff',
            fontSize: '1.25rem',
            cursor: 'pointer',
            padding: '0 0.5rem',
            lineHeight: 1
          }}
          aria-label="Dismiss error"
        >
          &times;
        </button>
      )}
      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ErrorHandler;
