import React, { PropsWithChildren, useEffect } from 'react';
import {
  resetAuth,
  resetBookmark,
  setAuthLoading,
  setSession,
  setUser,
  useAppDispatch,
} from '@/src/store';
import { useGetProfile } from '@/src/actions';
import { Session } from '@supabase/supabase-js';
import { getSession, onAuthStateChanged } from '@/src/services';

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();

  const { mutateAsync } = useGetProfile();

  const syncAuth = async (session: Session | null) => {
    dispatch(setSession(session));

    if (session?.user) {
      const user = await mutateAsync({ userId: session.user.id });
      if (user) {
        dispatch(setUser(user));
      }
    } else {
      dispatch(resetAuth());
      dispatch(resetBookmark());
    }

    dispatch(setAuthLoading(false));
  };

  const loadInitialSession = async () => {
    dispatch(setAuthLoading(true));
    const { data } = await getSession();
    await syncAuth(data.session);
  };

  useEffect(() => {
    loadInitialSession();

    const subscription = onAuthStateChanged(async (session) => {
      await syncAuth(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return children;
};

export { AuthProvider };
