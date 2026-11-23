import React from 'react';

const EmptyState = ({
  icon,
  title = 'No items found',
  description = "You haven't created any memory decks yet.",
  actionLabel,
  onAction
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3.5rem 1.5rem',
        textAlign: 'center',
        background: '#ffffff',
        borderRadius: '14px',
        border: '1px dashed #cbd5e1',
        margin: '1rem 0'
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#eff6ff',
          color: '#2563eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem',
          fontSize: '1.5rem'
        }}
      >
        {icon || '📭'}
      </div>
      <h3
        style={{
          fontSize: '1.15rem',
          fontWeight: 700,
          color: '#0f172a',
          marginBottom: '0.35rem'
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: '0.925rem',
          color: '#64748b',
          maxWidth: '400px',
          marginBottom: actionLabel ? '1.25rem' : 0
        }}
      >
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          type="button"
          className="btn btn-primary"
          onClick={onAction}
          style={{ marginTop: '0.75rem' }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
