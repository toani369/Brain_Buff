import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const AppLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);

  const handleToggle = () => {
    if (isPinned) {
      setIsPinned(false);
      setIsOpen(false);
    } else {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div className={`app-layout ${isPinned ? 'sidebar-is-pinned' : ''}`}>
      <Sidebar
        isOpen={isOpen}
        isPinned={isPinned}
        setIsOpen={setIsOpen}
        setIsPinned={setIsPinned}
      />
      <div className="main-wrapper">
        <Navbar onToggleSidebar={handleToggle} />
        <main style={{ flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
