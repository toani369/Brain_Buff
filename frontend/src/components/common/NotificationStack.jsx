import React from 'react';

const NotificationStack = ({ notifications = [], onDismiss }) => {
  if (!notifications || notifications.length === 0) return null;

  const typeConfig = {
    success: { bg: '#f0fdf4', border: '#86efac', text: '#15803d', icon: '✅' },
    warning: { bg: '#fffbeb', border: '#fde68a', text: '#b45309', icon: '⚠️' },
    error: { bg: '#fef2f2', border: '#fca5a5', text: '#b91c1c', icon: '❌' },
    info: { bg: '#eff6ff', border: '#93c5fd', text: '#1d4ed8', icon: 'ℹ️' }
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.625rem',
        maxWidth: '380px',
        width: '100%'
      }}
    >
      {notifications.map((n) => {
        const config = typeConfig[n.type] || typeConfig.info;
        return (
          <div
            key={n.id}
            role="status"
            style={{
              backgroundColor: config.bg,
              border: `1px solid ${config.border}`,
              color: config.text,
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.9rem',
              fontWeight: 500,
              animation: 'slideInRight 0.25s ease-out'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <span>{config.icon}</span>
              <span>{n.message}</span>
            </div>
            {onDismiss && (
              <button
                type="button"
                onClick={() => onDismiss(n.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: config.text,
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  lineHeight: 1,
                  padding: '0 0.25rem'
                }}
                aria-label="Close notification"
              >
                &times;
              </button>
            )}
          </div>
        );
      })}
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default NotificationStack;
