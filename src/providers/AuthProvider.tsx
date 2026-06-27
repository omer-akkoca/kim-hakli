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
import { useModal, useToast } from '@/src/hooks';

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { show } = useModal();
  const { show: showToast } = useToast();

  const { mutateAsync } = useGetProfile();
  const { mutate: logOut } = useSignOut();

  const handleAuthError = (title: string, description: string) => {
    dispatch(resetAuth());
    dispatch(resetBookmark());

    showToast({
      title,
      description,
      type: 'error',
    });
  };

  const syncAuth = async (session: Session | null) => {
    dispatch(setSession(session));

    if (!session?.user) {
      dispatch(resetAuth());
      dispatch(resetBookmark());
      return;
    }

    const sessionUser = session.user;

    let user = await mutateAsync({ userId: sessionUser.id });

    if (!user) {
      user = await createUser(sessionUser);
    }

    if (user?.status === 'deleted') {
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

      dispatch(setUser(user));
      return;
    }

    if (user) {
      dispatch(setUser(user));
    }
  };

  const runWithAuthLoading = async (
    callback: () => Promise<void>,
    errorMessage: {
      title: string;
      description: string;
    },
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

  const loadInitialSession = async () => {
    await runWithAuthLoading(
      async () => {
        const { data } = await getSession();
        await syncAuth(data.session);
      },
      {
        title: 'Oturum Kontrol Edilemedi',
        description: 'Lütfen internet bağlantınızı kontrol edip tekrar deneyin.',
      },
    );
  };

  useEffect(() => {
    loadInitialSession();

    const subscription = onAuthStateChanged(async (session) => {
      await runWithAuthLoading(
        async () => {
          await syncAuth(session);
        },
        {
          title: 'Oturumunuz Sonlandırıldı',
          description: 'Oturumunuz güvenlik nedeniyle sonlandırıldı. Lütfen tekrar giriş yapın.',
        },
      );
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return children;
};

export { AuthProvider };
