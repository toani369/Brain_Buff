import { useState, useCallback } from 'react';

let globalNotificationHandler = null;

export const showNotification = (message, type = 'info', duration = 4000) => {
  if (globalNotificationHandler) {
    globalNotificationHandler(message, type, duration);
  }
};

export const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random();
    setNotifications((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        setNotifications((prev) => prev.filter((item) => item.id !== id));
      }, duration);
    }
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  }, []);

  globalNotificationHandler = addNotification;

  return {
    notifications,
    addNotification,
    removeNotification,
    showSuccess: (msg, dur) => addNotification(msg, 'success', dur),
    showError: (msg, dur) => addNotification(msg, 'error', dur),
    showWarning: (msg, dur) => addNotification(msg, 'warning', dur),
    showInfo: (msg, dur) => addNotification(msg, 'info', dur)
  };
};

export default useNotification;
