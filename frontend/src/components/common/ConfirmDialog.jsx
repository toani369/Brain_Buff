import React from 'react';

const ConfirmDialog = ({
  isOpen,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDanger = false,
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-content" style={{ maxWidth: '420px' }}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onCancel}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <p style={{ color: '#475569', fontSize: '0.95rem', margin: '1rem 0' }}>
          {message}
        </p>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className={`btn ${isDanger ? 'btn-danger' : 'btn-primary'}`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
