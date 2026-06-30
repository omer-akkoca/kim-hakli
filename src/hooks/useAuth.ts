import { useMemo } from 'react';
import { useAppSelector } from '../store';

const useAuth = () => {
  const { user, loading: authLoading, profile_photo } = useAppSelector((state) => state.auth);

  const isAuthenticated = useMemo(() => !!user, [user]);
  
  return { user, isAuthenticated, authLoading, profile_photo };
};

export { useAuth };
