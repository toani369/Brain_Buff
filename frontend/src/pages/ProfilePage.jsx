import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PageContainer from '../components/layout/PageContainer';
import { logout } from '../store/slices/authSlice';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, role } = useSelector((state) => state.auth);

  const username = (user && user.username) || (typeof user === 'string' ? user : 'Trainee');
  const email = (user && user.email) || `${username.toLowerCase()}@brainbuff.io`;
  const userRole = (user && user.role) || role || 'TRAINEE';
  const memberSince = (user && user.createdAt) ? new Date(user.createdAt).toLocaleDateString() : 'August 2026';

  return (
    <PageContainer
      title="User Profile"
      subtitle="Manage your BrainBuff account credentials and training configuration"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.75rem',
                fontWeight: 800,
                boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.3)'
              }}
            >
              {username.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a' }}>{username}</h2>
              <span className="badge badge-primary" style={{ marginTop: '0.25rem' }}>
                {userRole}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>USERNAME</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0f172a', marginTop: '0.15rem' }}>{username}</div>
            </div>

            <div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>EMAIL ADDRESS</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0f172a', marginTop: '0.15rem' }}>{email}</div>
            </div>

            <div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>SYSTEM ROLE</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0f172a', marginTop: '0.15rem' }}>{userRole}</div>
            </div>

            <div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>MEMBER SINCE</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0f172a', marginTop: '0.15rem' }}>{memberSince}</div>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem' }}>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => dispatch(logout())}
              style={{ width: '100%' }}
            >
              Sign Out of Account
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Cognitive Training Preferences</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.95rem' }}>Adaptive Difficulty</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Dynamically adjust exercise complexity</div>
              </div>
              <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: '#2563eb' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.95rem' }}>Spaced Repetition Reminders</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Notify when memory deck intervals expire</div>
              </div>
              <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: '#2563eb' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.95rem' }}>Auditory Feedback</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Play cognitive cues during training runs</div>
              </div>
              <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: '#2563eb' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.95rem' }}>Daily Training Goal</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Target modules per day</div>
              </div>
              <select className="form-control" style={{ width: '110px' }} defaultValue="3">
                <option value="1">1 Module</option>
                <option value="3">3 Modules</option>
                <option value="5">5 Modules</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default ProfilePage;
