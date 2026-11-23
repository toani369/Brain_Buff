const TOKEN_KEY = 'token';
const USER_KEY = 'user';
const ROLE_KEY = 'role';

export const storage = {
  getToken: () => {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  setToken: (token) => {
    try {
      if (token) {
        localStorage.setItem(TOKEN_KEY, token);
      } else {
        localStorage.removeItem(TOKEN_KEY);
      }
    } catch {
      // Ignore storage errors in mock/restricted environments
    }
  },
  getUser: () => {
    try {
      const user = localStorage.getItem(USER_KEY);
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },
  setUser: (user) => {
    try {
      if (user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(USER_KEY);
      }
    } catch {
      // Ignore storage errors
    }
  },
  getRole: () => {
    try {
      return localStorage.getItem(ROLE_KEY);
    } catch {
      return null;
    }
  },
  setRole: (role) => {
    try {
      if (role) {
        localStorage.setItem(ROLE_KEY, role);
      } else {
        localStorage.removeItem(ROLE_KEY);
      }
    } catch {
      // Ignore storage errors
    }
  },
  clearAuth: () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(ROLE_KEY);
    } catch {
      // Ignore storage errors
    }
  }
};
