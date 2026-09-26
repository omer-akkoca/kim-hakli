import React, { PropsWithChildren, useEffect } from 'react';
import { Linking } from 'react-native';
import { Session } from '@supabase/supabase-js';
import {
  resetAuth,
  resetBookmark,
  setAuthLoading,
  setSession,
  setUser,
  useAppDispatch,
} from '@/src/store';
import { useGetProfile, useSignOut } from '@/src/actions';
import { createUser, onAuthStateChanged } from '@/src/services';
import { useAuth, useModal, useToast } from '@/src/hooks';

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { show: showToast } = useToast();
  const { show: showModal, hide } = useModal();
  const { session } = useAuth();

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
    if (!session?.user) return;

    dispatch(setAuthLoading(true));

    try {
      const sessionUser = session.user;

      let user = await mutateAsync({ userId: sessionUser.id });

      if (!user) {
        user = await createUser(sessionUser);
      }

      if (user && user.status === 'deleted') {
        showModal({
          noClosable: true,
          title: 'Hesabınız Silinmiş',
          subtitle:
            'Hesabınızı yeniden etkinleştirmek istiyorsanız destek sayfamız üzerinden bizimle iletişime geçebilirsiniz.',
          buttons: [
            {
              label: 'Çıkış Yap',
              onPress: () => {
                logOut();
                hide();
              },
            },
            {
              label: 'Hesabı Etkinleştir',
              onPress() {
                logOut();
                hide();
                Linking.openURL('https://kimhakli.tr/support');
              },
            },
          ],
        });
      } else if (user) {
        dispatch(setUser(user));
      }
    } catch {
      handleAuthError(
        'Profil Bilgileri Alınamadı',
        'Lütfen internet bağlantınızı kontrol edip tekrar deneyin.',
      );
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

  const runWithAuthLoading = async (
    callback: () => Promise<void>,
    errorMessage: { title: string; description: string },
  ) => {
    try {
      await callback();
    } catch {
      handleAuthError(errorMessage.title, errorMessage.description);
    } finally {
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
  }, [session?.user?.id]);

  return children;
};

export { AuthProvider };
