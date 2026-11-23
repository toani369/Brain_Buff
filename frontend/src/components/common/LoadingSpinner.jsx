import React from 'react';

const LoadingSpinner = ({ message = 'Loading...', size = 'medium' }) => {
  const sizeMap = {
    small: '1.25rem',
    medium: '2rem',
    large: '3rem'
  };

  const spinnerSize = sizeMap[size] || sizeMap.medium;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2.5rem 1rem',
        gap: '0.875rem'
      }}
    >
      <div
        style={{
          width: spinnerSize,
          height: spinnerSize,
          border: '3px solid #e2e8f0',
          borderTopColor: '#2563eb',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }}
      />
      {message && (
        <span style={{ fontSize: '0.925rem', color: '#64748b', fontWeight: 500 }}>
          {message}
        </span>
      )}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
