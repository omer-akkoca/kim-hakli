import React, { PropsWithChildren, useEffect } from 'react';
import { Linking } from 'react-native';
import {
  resetAuth,
  resetBookmark,
  setAuthLoading,
  setSession,
  setUser,
  useAppDispatch,
} from '@/src/store';
import { useGetProfile, useSignOut } from '@/src/actions';
import { Session } from '@supabase/supabase-js';
import { createUser, getSession, onAuthStateChanged } from '@/src/services';
import { IUser } from '@/src/types';
import { useModal } from '@/src/hooks';

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { show } = useModal();

  const { mutateAsync } = useGetProfile();
  const { mutate: logOut } = useSignOut();

  const syncAuth = async (session: Session | null) => {
    dispatch(setSession(session));

    if (session) {
      const sessionUser = session.user;
      let user: IUser | null = null;
      user = await mutateAsync({ userId: sessionUser.id });

      if (!user) {
        user = await createUser(sessionUser);
      }

      if (user && user.status === 'deleted') {
        show({
          title: 'Hesabınız Silinmiş',
          subtitle:
            'Bu hesap daha önce silinmiştir. Hesabınızı yeniden etkinleştirmek istiyorsanız destek sayfamız üzerinden bizimle iletişime geçebilirsiniz.',
          buttons: [
            {
              label: 'Çıkış Yap',
              onPress: logOut,
            },
            {
              label: 'Hesabı Etkinleştir',
              onPress: () => Linking.openURL('https://kimhakli.tr/support'),
            },
          ],
        });
      } else {
        dispatch(setUser(user!));
      }
    } else {
      dispatch(resetAuth());
      dispatch(resetBookmark());
    }

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
