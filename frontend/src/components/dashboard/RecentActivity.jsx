import React from 'react';
import { useSelector } from 'react-redux';
import { formatDateTime } from '../../utils/formatters';

const RecentActivity = () => {
  const { recentSessions = [] } = useSelector((state) => state.sessions);

  const activities = recentSessions.length > 0
    ? recentSessions
    : [
        {
          id: 1,
          exerciseName: 'Pattern Matrix Dual-N-Back',
          score: 94,
          timestamp: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: 2,
          exerciseName: 'Spatial Grid Recall',
          score: 88,
          timestamp: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 3,
          exerciseName: 'Selective Stroop Attention',
          score: 91,
          timestamp: new Date(Date.now() - 172800000).toISOString()
        }
      ];

  const getScoreBadge = (score) => {
    if (score >= 90) return { bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0', label: 'Optimal' };
    if (score >= 75) return { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe', label: 'Proficient' };
    return { bg: '#fffbeb', text: '#b45309', border: '#fde68a', label: 'Developing' };
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Recent Activity</h3>
        <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>
          Latest Cognitive Training Sessions
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
        {activities.map((activity, index) => {
          const badge = getScoreBadge(activity.score || activity.rawScore || 85);
          const exerciseTitle = activity.exerciseName || (activity.exercise && activity.exercise.title) || 'Cognitive Challenge';
          const scoreVal = activity.score !== undefined ? activity.score : (activity.rawScore !== undefined ? activity.rawScore : 85);
          const timeVal = activity.timestamp || new Date().toISOString();

          return (
            <div
              key={activity.id || index}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.875rem 1rem',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    backgroundColor: '#eff6ff',
                    color: '#2563eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.1rem'
                  }}
                >
                  ⚡
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.95rem' }}>
                    {exerciseTitle}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.15rem' }}>
                    {formatDateTime(timeVal)}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>
                    {scoreVal} pts
                  </div>
                </div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.5rem',
                    borderRadius: '9999px',
                    backgroundColor: badge.bg,
                    color: badge.text,
                    border: `1px solid ${badge.border}`
                  }}
                >
                  {badge.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;
