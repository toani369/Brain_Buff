import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../store/slices/authSlice';

const Login = ({ onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!username.trim() || !password) {
      setLocalError('Please enter both username and password.');
      return;
    }

    try {
      const resultAction = await dispatch(login({ username, password }));
      if (login.fulfilled.match(resultAction)) {
        if (onSuccess) {
          onSuccess(resultAction.payload);
        } else {
          navigate('/dashboard');
        }
      } else if (resultAction.payload) {
        setLocalError(resultAction.payload);
      }
    } catch (err) {
      const msg =
        (err.response && err.response.data && (err.response.data.message || err.response.data.error)) ||
        err.message ||
        'Login failed';
      setLocalError(msg);
    }
  };

  const displayError = localError || error;

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '440px',
          background: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 35px rgba(37, 99, 235, 0.2)',
          padding: '2.5rem 2rem'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
              color: '#ffffff',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              marginBottom: '0.75rem',
              boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.3)'
            }}
          >
            🧠
          </div>
          <h1
            style={{
              fontSize: '1.65rem',
              fontWeight: 800,
              color: '#0f172a',
              letterSpacing: '-0.025em'
            }}
          >
            Login to BrainBuff
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.35rem' }}>
            Enter your credentials to access cognitive training
          </p>
        </div>

        {displayError && (
          <div
            role="alert"
            style={{
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              marginBottom: '1.25rem',
              fontSize: '0.875rem',
              fontWeight: 500
            }}
          >
            {typeof displayError === 'string' ? displayError : 'Invalid credentials'}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                style={{ paddingRight: '2.75rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                title={showPassword ? 'Hide password' : 'Show password'}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.35rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: showPassword ? '#2563eb' : '#64748b',
                  borderRadius: '6px',
                  transition: 'color 0.2s, background-color 0.2s'
                }}
              >
                {showPassword ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-login-submit"
            style={{ width: '100%', marginTop: '0.75rem', padding: '0.75rem' }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div
          style={{
            marginTop: '1.75rem',
            textAlign: 'center',
            fontSize: '0.9rem',
            color: '#64748b'
          }}
        >
          Don't have an account?{' '}
          <Link
            to="/register"
            style={{ color: '#2563eb', fontWeight: 600 }}
          >
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
