import { useSelector, useDispatch } from 'react-redux';
import { logout, login } from '../store/slices/authSlice';
import { ROLES } from '../utils/constants';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, role, isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const effectiveRole = (role || user?.role || '').toUpperCase();
  const isTrainee = effectiveRole === ROLES.TRAINEE;
  const isCoach = effectiveRole === ROLES.NEURO_COACH;
  const isAdmin = effectiveRole === ROLES.SYSTEM_ARCHITECT;

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleLogin = (credentials) => {
    return dispatch(login(credentials));
  };

  return {
    user,
    token,
    role,
    isAuthenticated,
    loading,
    error,
    isTrainee,
    isCoach,
    isAdmin,
    login: handleLogin,
    logout: handleLogout
  };
};

export default useAuth;
