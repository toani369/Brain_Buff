import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const Navbar = ({ onToggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, role, token, isAuthenticated } = useSelector((state) => state.auth);
  const [isLogoutHovered, setIsLogoutHovered] = useState(false);

  const isUserLoggedIn = isAuthenticated || !!token || !!user;
  const username = (user && user.username) || (typeof user === 'string' ? user : 'User');
  const userRole = (user && user.role) || role || 'TRAINEE';

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="navbar" aria-label="Main Navigation">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {onToggleSidebar && (
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onToggleSidebar}
            aria-label="Toggle menu"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.35rem 0.6rem',
              fontSize: '1.1rem',
              lineHeight: 1
            }}
          >
            ☰
          </button>
        )}
        <Link to="/" className="navbar-brand">
          <span style={{ fontSize: '1.5rem' }}>🧠</span>
          <span>BrainBuff</span>
        </Link>
      </div>

      <div
        className="navbar-center"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        <span
          style={{
            fontSize: '1.15rem',
            fontWeight: 800,
            color: '#0ea5e9',
            letterSpacing: '-0.01em'
          }}
        >
          Best Cognitive learning app
        </span>
      </div>

      <div className="navbar-right">
        {isUserLoggedIn ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="user-profile-badge">
              <div className="user-avatar">
                {username.charAt(0).toUpperCase()}
              </div>
              <div className="user-info">
                <span className="user-name">{username}</span>
                <span className="user-role-tag">{userRole}</span>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleLogout}
              onMouseEnter={() => setIsLogoutHovered(true)}
              onMouseLeave={() => setIsLogoutHovered(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <span>Logout</span>
              {isLogoutHovered && <span aria-hidden="true">😢</span>}
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link to="/login" className="btn btn-secondary btn-sm">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
