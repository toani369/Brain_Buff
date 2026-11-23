import React from 'react';
import { useSelector } from 'react-redux';

const StatCards = () => {
  const {
    memoryIndex = 82.5,
    processingSpeed = 79.0,
    attention = 88.4,
    logic = 85.0,
    recentTrend = {
      memory: '+4.2%',
      speed: '+2.8%',
      attention: '+5.1%',
      logic: '+3.5%'
    }
  } = useSelector((state) => state.metrics);

  const stats = [
    {
      id: 'memory',
      title: 'Memory Index',
      value: typeof memoryIndex === 'number' ? `${memoryIndex.toFixed(1)}` : memoryIndex,
      trend: recentTrend.memory || '+4.2%',
      icon: '🧠',
      color: '#2563eb',
      bgLight: '#eff6ff',
      progress: Math.min(100, typeof memoryIndex === 'number' ? memoryIndex : 80)
    },
    {
      id: 'speed',
      title: 'Processing Speed',
      value: typeof processingSpeed === 'number' ? `${processingSpeed.toFixed(1)}` : processingSpeed,
      trend: recentTrend.speed || '+2.8%',
      icon: '⚡',
      color: '#0891b2',
      bgLight: '#ecfeff',
      progress: Math.min(100, typeof processingSpeed === 'number' ? processingSpeed : 75)
    },
    {
      id: 'attention',
      title: 'Attention',
      value: typeof attention === 'number' ? `${attention.toFixed(1)}` : attention,
      trend: recentTrend.attention || '+5.1%',
      icon: '🎯',
      color: '#16a34a',
      bgLight: '#f0fdf4',
      progress: Math.min(100, typeof attention === 'number' ? attention : 85)
    },
    {
      id: 'logic',
      title: 'Logic',
      value: typeof logic === 'number' ? `${logic.toFixed(1)}` : logic,
      trend: recentTrend.logic || '+3.5%',
      icon: '🧩',
      color: '#8b5cf6',
      bgLight: '#f5f3ff',
      progress: Math.min(100, typeof logic === 'number' ? logic : 82)
    }
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2rem'
      }}
    >
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="card"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#64748b',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                {stat.title}
              </span>
              <div
                style={{
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: '#0f172a',
                  marginTop: '0.25rem',
                  lineHeight: 1.2
                }}
              >
                {stat.value}
              </div>
            </div>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                backgroundColor: stat.bgLight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.35rem'
              }}
            >
              {stat.icon}
            </div>
          </div>

          <div style={{ marginTop: '1.25rem' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.375rem',
                fontSize: '0.8rem'
              }}
            >
              <span style={{ color: '#16a34a', fontWeight: 700 }}>
                {stat.trend} this week
              </span>
              <span style={{ color: '#94a3b8', fontWeight: 500 }}>
                Score: {stat.progress}%
              </span>
            </div>
            <div
              style={{
                width: '100%',
                height: '6px',
                backgroundColor: '#f1f5f9',
                borderRadius: '9999px',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  width: `${stat.progress}%`,
                  height: '100%',
                  backgroundColor: stat.color,
                  borderRadius: '9999px',
                  transition: 'width 0.5s ease-in-out'
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatCards;
