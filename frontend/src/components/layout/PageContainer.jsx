import React from 'react';

const PageContainer = ({ title, subtitle, actions, children }) => {
  return (
    <div className="page-container">
      {(title || subtitle || actions) && (
        <div className="page-header">
          <div>
            {title && <h1 className="page-title">{title}</h1>}
            {subtitle && <p className="page-subtitle">{subtitle}</p>}
          </div>
          {actions && <div style={{ display: 'flex', gap: '0.75rem' }}>{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

export default PageContainer;
