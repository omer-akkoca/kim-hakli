import React, { PropsWithChildren, useEffect } from 'react';
import { onAuthStateChanged } from '@/src/services';
import { setAuthLoading, useAppDispatch } from '@/src/store';

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (user) => {
      dispatch(setAuthLoading(true));
      if (user) {
        const userId = user.uid;
        // userId ile users collection'dan user bilgilerini çek
        // çekilen bilgileri redux user state'ine yaz
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
