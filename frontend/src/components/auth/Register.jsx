import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../store/slices/authSlice';

const Register = ({ onSuccess }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('TRAINEE');
  const [localError, setLocalError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setSuccessMessage('');

    if (!username.trim() || !email.trim() || !password) {
      setLocalError('Please fill in all required fields.');
      return;
    }

    try {
      const resultAction = await dispatch(
        register({
          username: username.trim(),
          email: email.trim(),
          password,
          role
        })
      );

      if (register.fulfilled.match(resultAction)) {
        setSuccessMessage('Account created successfully! Redirecting to login...');
        setTimeout(() => {
          if (onSuccess) {
            onSuccess(resultAction.payload);
          } else {
            navigate('/login');
          }
        }, 1200);
      } else if (resultAction.payload) {
        setLocalError(resultAction.payload);
      }
    } catch (err) {
      const msg =
        (err.response && err.response.data && (err.response.data.message || err.response.data.error)) ||
        err.message ||
        'Registration failed';
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
          maxWidth: '460px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
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
            ✨
          </div>
          <h1
            style={{
              fontSize: '1.65rem',
              fontWeight: 800,
              color: '#0f172a',
              letterSpacing: '-0.025em'
            }}
          >
            Create BrainBuff Account
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.35rem' }}>
            Join the platform to access cognitive training
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
            {typeof displayError === 'string' ? displayError : 'Registration failed'}
          </div>
        )}

        {successMessage && (
          <div
            role="status"
            style={{
              backgroundColor: '#f0fdf4',
              border: '1px solid #bbf7d0',
              color: '#16a34a',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              marginBottom: '1.25rem',
              fontSize: '0.875rem',
              fontWeight: 500
            }}
          >
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label htmlFor="reg-username" className="form-label">
              Username
            </label>
            <input
              id="reg-username"
              name="username"
              type="text"
              className="form-control"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label htmlFor="reg-email" className="form-label">
              Email Address
            </label>
            <input
              id="reg-email"
              name="email"
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label htmlFor="reg-password" className="form-label">
              Password
            </label>
            <input
              id="reg-password"
              name="password"
              type="password"
              className="form-control"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label htmlFor="reg-role" className="form-label">
              Account Role
            </label>
            <select
              id="reg-role"
              name="role"
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="TRAINEE">TRAINEE (Cognitive Learner)</option>
              <option value="NEURO_COACH">NEURO_COACH (Instructor)</option>
              <option value="SYSTEM_ARCHITECT">SYSTEM_ARCHITECT (Admin)</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '0.5rem', padding: '0.75rem' }}
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Register'}
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
          Already have an account?{' '}
          <Link
            to="/login"
            style={{ color: '#2563eb', fontWeight: 600 }}
          >
            Log in here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
