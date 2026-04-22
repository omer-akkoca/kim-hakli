import React, { PropsWithChildren, useEffect } from 'react';
import { getUser, onAuthStateChanged } from '@/src/services';
import { setAuthLoading, setUser, useAppDispatch } from '@/src/store';

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (user) => {
      dispatch(setAuthLoading(true));
      if (user) {
        const userId = user.uid;
        const userInfo = await getUser(userId);
        if (userInfo) {
          dispatch(setUser(userInfo));
        }
      } else {
        // user yokken yapılacaklar
      }
      dispatch(setAuthLoading(false));
    });

    return unsubscribe;
  }, []);

  return children;
};

export { AuthProvider };
