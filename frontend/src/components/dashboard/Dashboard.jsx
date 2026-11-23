import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RecentActivity from './RecentActivity';
import { fetchMetrics } from '../../store/slices/metricSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, role } = useSelector((state) => state.auth);

  const username = (user && user.username) || (typeof user === 'string' ? user : 'Neuro-Trainee');
  const userRole = (user && user.role) || role || 'TRAINEE';

  useEffect(() => {
    const userId = user && user.id ? user.id : 1;
    dispatch(fetchMetrics(userId));
  }, [dispatch, user]);

  return (
    <div style={{ width: '100%' }}>
      {/* Welcome Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
          borderRadius: '16px',
          padding: '2rem',
          color: '#ffffff',
          marginBottom: '2rem',
          boxShadow: '0 10px 15px -3px rgba(15, 23, 42, 0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 600,
              marginBottom: '0.75rem',
              backdropFilter: 'blur(4px)'
            }}
          >
            <span>Role: {userRole}</span>
          </div>
          <h1
            style={{
              fontSize: '1.85rem',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              color: '#ffffff',
              marginBottom: '0.5rem'
            }}
          >
            Welcome back,{' '}
            <span
              onClick={() => navigate('/profile')}
              style={{
                cursor: 'pointer',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
                color: '#ffffff'
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  navigate('/profile');
                }
              }}
              title="Go to profile"
            >
              {username}
            </span>
          </h1>
          <p style={{ color: '#93c5fd', fontSize: '0.95rem', maxWidth: '600px' }}>
            Your neuroplastic training metrics are primed. Complete your daily spaced repetition and executive function modules.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate('/exercises')}
            style={{
              backgroundColor: '#ffffff',
              color: '#1e3a8a',
              fontWeight: 700,
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          >
            Start Training
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/memory')}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              borderColor: 'transparent',
              backdropFilter: 'blur(4px)'
            }}
          >
            Memory Hub
          </button>
        </div>
      </div>

      {/* Grid Layout: Recent Activity & Quick Navigation */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          alignItems: 'start'
        }}
      >
        <RecentActivity />

        {/* Training Recommendations Card */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Recommended Modules</h3>
            <span className="badge badge-primary">Curated</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
            <div
              style={{
                padding: '1rem',
                backgroundColor: '#eff6ff',
                borderRadius: '10px',
                border: '1px solid #bfdbfe'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, color: '#1e3a8a', fontSize: '0.95rem' }}>
                  Dual-N-Back Working Memory
                </span>
                <span className="badge badge-warning">Medium</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#475569', marginTop: '0.35rem' }}>
                Enhance prefrontal executive control buffers and working memory capacity.
              </p>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => navigate('/training/1')}
                style={{ marginTop: '0.75rem' }}
              >
                Launch Session
              </button>
            </div>

            <div
              style={{
                padding: '1rem',
                backgroundColor: '#f0fdf4',
                borderRadius: '10px',
                border: '1px solid #bbf7d0'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, color: '#166534', fontSize: '0.95rem' }}>
                  Memory Hub: Spaced Repetition
                </span>
                <span className="badge badge-success">Active</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#475569', marginTop: '0.35rem' }}>
                Review flashcard decks to reinforce long-term memory synaptic consolidation.
              </p>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => navigate('/memory')}
                style={{ marginTop: '0.75rem' }}
              >
                Open Decks
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
