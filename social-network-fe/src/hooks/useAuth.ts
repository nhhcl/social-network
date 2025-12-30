import { useAuthStore } from '../stores/auth.store';

export const useAuth = () => {
  const token = localStorage.getItem('access_token');

  const {
    user,
    isAuthenticated,
    login,
    logout
  } = useAuthStore();

  return {
    token,
    user,
    isAuthenticated,
    login,
    logout
  };
};
