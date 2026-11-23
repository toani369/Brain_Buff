import React from 'react';
import Login from '../components/auth/Login';
import brainBg from '../assets/brain_login_bg.jpg';

const LoginPage = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#070b14',
        backgroundImage: `linear-gradient(135deg, rgba(7, 11, 20, 0.72) 0%, rgba(15, 23, 42, 0.85) 100%), url(${brainBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
    >
      <Login />
    </div>
  );
};

export default LoginPage;
