import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppRoutes from './routes/AppRoutes';
import ErrorHandler from './components/common/ErrorHandler';
import NotificationStack from './components/common/NotificationStack';
import { clearAuthError, restoreSession } from './store/slices/authSlice';
import { clearDeckError } from './store/slices/deckSlice';
import { clearExerciseError } from './store/slices/exerciseSlice';
import { clearProgramError } from './store/slices/programSlice';
import { useNotification } from './hooks/useNotification';
import './styles/globals.css';
import './styles/components.css';
import './styles/responsive.css';

const App = () => {
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth?.error);
  const deckError = useSelector((state) => state.decks?.error);
  const exerciseError = useSelector((state) => state.exercises?.error);
  const programError = useSelector((state) => state.programs?.error);
  const sessionError = useSelector((state) => state.sessions?.error);

  const { notifications, removeNotification } = useNotification();

  // Restore authenticated session on page refresh
  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  const activeError = authError || deckError || exerciseError || programError || sessionError;

  const handleDismissError = () => {
    if (authError) dispatch(clearAuthError());
    if (deckError) dispatch(clearDeckError());
    if (exerciseError) dispatch(clearExerciseError());
    if (programError) dispatch(clearProgramError());
  };

  return (
    <>
      <ErrorHandler error={activeError} onDismiss={handleDismissError} />
      <NotificationStack notifications={notifications} onDismiss={removeNotification} />
      <AppRoutes />
    </>
  );
};

export default App;
