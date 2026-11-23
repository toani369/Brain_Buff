import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const Sidebar = ({ isOpen, isPinned, setIsOpen, setIsPinned }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);

  // Internal state fallback if not passed from parent
  const [internalOpen, setInternalOpen] = useState(false);
  const [internalPinned, setInternalPinned] = useState(false);

  const open = isOpen !== undefined ? isOpen : internalOpen;
  const setOpen = setIsOpen || setInternalOpen;
  const pinned = isPinned !== undefined ? isPinned : internalPinned;
  const setPinned = setIsPinned || setInternalPinned;

  const isVisible = open || pinned;

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: '📊' },
    { to: '/memory', label: 'Memory Hub', icon: '🧠' },
    { to: '/exercises', label: 'Exercises', icon: '⚡' },
    { to: '/programs', label: 'Programs', icon: '🎯' },
    { to: '/profile', label: 'Profile', icon: '👤' }
  ];

  return (
    <>
      {/* Invisible hover trigger strip on the far-left edge to detect arrow cursor */}
      <div
        className="sidebar-hover-trigger"
        onMouseEnter={() => setOpen(true)}
        aria-hidden="true"
      />

      {/* Floating Arrow Toggle tab on the left screen edge */}
      <button
        type="button"
        className={`sidebar-arrow-toggle ${isVisible ? 'open' : ''}`}
        onClick={() => {
          if (isVisible) {
            setOpen(false);
            setPinned(false);
          } else {
            setOpen(true);
          }
        }}
        onMouseEnter={() => setOpen(true)}
        aria-label={isVisible ? 'Hide navigation menu' : 'Show navigation menu'}
        title={isVisible ? 'Click to hide sidebar' : 'Hover or click to view menu'}
      >
        <span className="arrow-icon">{isVisible ? '◀' : '▶'}</span>
      </button>

      {/* Dimmed backdrop when unpinned and open */}
      {isVisible && !pinned && (
        <div
          className="sidebar-backdrop"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Collapsible Sidebar */}
      <aside
        className={`sidebar ${isVisible ? 'sidebar-visible' : 'sidebar-hidden'}`}
        aria-label="Sidebar Navigation"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => {
          if (!pinned) {
            setOpen(false);
          }
        }}
      >
        <div className="sidebar-header" style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <span style={{ fontSize: '1.75rem' }}>🧠</span>
            <span className="sidebar-logo-text">BrainBuff</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <button
              type="button"
              className="sidebar-header-btn"
              onClick={() => setPinned(!pinned)}
              title={pinned ? 'Unpin sidebar (auto-hide)' : 'Pin sidebar (keep always visible)'}
              aria-label={pinned ? 'Unpin sidebar' : 'Pin sidebar'}
              style={{
                background: pinned ? 'rgba(59, 130, 246, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '6px',
                color: '#ffffff',
                cursor: 'pointer',
                padding: '4px 8px',
                fontSize: '0.85rem'
              }}
            >
              {pinned ? '📌' : '📍'}
            </button>
            <button
              type="button"
              className="sidebar-header-btn"
              onClick={() => {
                setPinned(false);
                setOpen(false);
              }}
              title="Hide sidebar"
              aria-label="Hide sidebar"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '6px',
                color: '#ffffff',
                cursor: 'pointer',
                padding: '4px 8px',
                fontSize: '0.85rem'
              }}
            >
              ◀
            </button>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => {
                if (!pinned) setOpen(false);
              }}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <span className="sidebar-icon" style={{ fontSize: '1.15rem' }}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button
            type="button"
            className="sidebar-link"
            onClick={handleLogout}
            onMouseEnter={() => setIsLogoutHovered(true)}
            onMouseLeave={() => setIsLogoutHovered(false)}
            style={{
              width: '100%',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <span className="sidebar-icon" style={{ fontSize: '1.15rem' }}>
              {isLogoutHovered ? '😢' : '🚪'}
            </span>
            <span>Logout</span>
            {isLogoutHovered && (
              <span style={{ marginLeft: 'auto', fontSize: '1.15rem' }} aria-hidden="true">
                😢
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
