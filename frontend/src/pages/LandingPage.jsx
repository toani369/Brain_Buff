import React from 'react';
import { useNavigate } from 'react-router-dom';
import galaxyBrainGif from '../assets/galaxy_brain.gif';
import realisticBrainImg from '../assets/realistic_human_brain.png';
import '../styles/landing.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleBrainClick = () => {
    navigate('/login');
  };

  return (
    <div className="simple-landing-container">
      {/* Background GIF playing fully across screen ratio */}
      <img
        src={galaxyBrainGif}
        alt="Galaxy Brain Background"
        className="fullscreen-bg-gif"
      />

      {/* Subtle vignette overlay */}
      <div className="fullscreen-overlay" />

      {/* Top Left Subtle Brand Tag */}
      <div className="corner-branding">
        <span>🧠</span>
        <span>BrainBuff</span>
      </div>

      {/* Center Interactive Brain with Overlaid BUFF Text */}
      <button
        type="button"
        className="center-brain-btn"
        onClick={handleBrainClick}
        aria-label="Activate brain to enter login page"
        title="Click brain to enter"
      >
        <div className="brain-hero-wrapper">
          <img
            src={realisticBrainImg}
            alt="Realistic Human Brain"
            className="realistic-brain-image"
          />
          <span className="buff-hero-text">BUFF</span>
        </div>

        {/* Pulsing Hint Badge Below Brain */}
        <div className="brain-hint">
          <span className="hint-dot" />
          <span className="hint-text">Click Brain to Enter</span>
        </div>
      </button>
    </div>
  );
};

export default LandingPage;
