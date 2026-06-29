import React, { PropsWithChildren, useEffect } from 'react';
import { Linking } from 'react-native';
import {
  resetAuth,
  resetBookmark,
  setAuthLoading,
  setSession,
  setUser,
  useAppDispatch,
  useAppSelector,
} from '@/src/store';
import { useGetProfile, useSignOut } from '@/src/actions';
import { Session } from '@supabase/supabase-js';
import { createUser, onAuthStateChanged } from '@/src/services';
import { useModal, useToast } from '@/src/hooks';

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { show } = useModal();
  const { show: showToast } = useToast();
  const session = useAppSelector((state) => state.auth.session);

  const { mutateAsync } = useGetProfile();
  const { mutate: logOut } = useSignOut();

  const handleAuthError = (title: string, description: string) => {
    dispatch(resetAuth());
    dispatch(resetBookmark());

    showToast({ title, description, type: 'error' });
  };

  const syncSession = async (session: Session | null) => {
    dispatch(setSession(session));

    if (!session?.user) {
      dispatch(resetAuth());
      dispatch(resetBookmark());
      return;
    }
  };

  const syncAuth = async () => {
    if (session) {
      const sessionUser = session.user;

      let user = await mutateAsync({ userId: sessionUser.id });

      if (!user) {
        user = await createUser(sessionUser);
      }

      if (user?.status === 'deleted') {
        show({
          title: 'Hesabınız Silinmiş',
          subtitle:
            'Hesabınızı yeniden etkinleştirmek istiyorsanız destek sayfamız üzerinden bizimle iletişime geçebilirsiniz.',
          buttons: [
            {
              label: 'Çıkış Yap',
              onPress: logOut,
            },
            {
              label: 'Hesabı Etkinleştir',
              onPress() {
                logOut();
                Linking.openURL('https://kimhakli.tr/support');
              },
            },
          ],
          noClosable: true,
        });

        return;
      }

      if (user) {
        dispatch(setUser(user));
      }
    }
  };

  const runWithAuthLoading = async (
    callback: () => Promise<void>,
    errorMessage: { title: string; description: string },
  ) => {
    dispatch(setAuthLoading(true));
    try {
      await callback();
    } catch {
      handleAuthError(errorMessage.title, errorMessage.description);
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

  useEffect(() => {
    const subscription = onAuthStateChanged(async (event, session) => {
      await runWithAuthLoading(
        async () => {
          await syncSession(session);
        },
        event === 'INITIAL_SESSION'
          ? {
              title: 'Oturum Kontrol Edilemedi',
              description: 'Lütfen internet bağlantınızı kontrol edip tekrar deneyin.',
            }
          : {
              title: 'Oturumunuz Sonlandırıldı',
              description:
                'Oturumunuz güvenlik nedeniyle sonlandırıldı. Lütfen tekrar giriş yapın.',
            },
      );
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (session) {
      syncAuth();
    }
  }, [session]);

  return children;
};

export { AuthProvider };
