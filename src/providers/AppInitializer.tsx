import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { Linking, Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { useFonts } from 'expo-font';
import {
  useGetAppConfig,
  useGetAvatarUrl,
  useGetBookmarkedStoryIds,
  useGetCategories,
  useSavePushToken,
} from '@/src/actions';
import { FONTS, STORE_URL } from '@/src/constants';
import { AppLoading } from '@/src/components';
import { useAuth, useModal } from '@/src/hooks';
import { registerForPushNotificationsAsync } from '@/src/services';
import { version } from '@/package.json';

const AppInitializer: React.FC<PropsWithChildren> = ({ children }) => {
  const { show } = useModal();
  const [fontsLoaded] = useFonts(FONTS);
  const { user } = useAuth();

  const { data: appConfig, isLoading } = useGetAppConfig();
  useGetCategories();
  useGetBookmarkedStoryIds();
  useGetAvatarUrl({ userId: user?.id, avatarPath: user?.avatar_path });

  const { mutate: savePushToken } = useSavePushToken();

  const notificationRegistrationStarted = useRef(false);

  const isUpdateRequired =
    !!appConfig &&
    (Platform.OS === 'android' ? appConfig.android_version : appConfig.ios_version) !== version;

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setButtonStyleAsync('light');
    }
  }, []);

  useEffect(() => {
    if (isUpdateRequired) {
      show({
        noClosable: true,
        title: 'Güncelleme Gerekli',
        subtitle: appConfig!.update_message,
        buttons: [{ label: 'Güncelle', onPress: () => Linking.openURL(STORE_URL) }],
      });
    }
  }, [isUpdateRequired, appConfig, show]);

  useEffect(() => {
    if (
      !fontsLoaded ||
      isLoading ||
      isUpdateRequired ||
      !user?.id ||
      notificationRegistrationStarted.current
    ) {
      return;
    }

    notificationRegistrationStarted.current = true;

    const registerNotifications = async () => {
      try {
        const token = await registerForPushNotificationsAsync();
        if (!token || !user?.id) return;
        savePushToken({ userId: user.id, token });
      } catch {
        throw Error('Push notification registration error');
      }
    };

    const timeout = setTimeout(registerNotifications, 700);

    return () => clearTimeout(timeout);
  }, [fontsLoaded, isLoading, isUpdateRequired, user?.id, savePushToken]);

  if (!fontsLoaded || isLoading) return <AppLoading fullScreen />;

  return children;
};

export { AppInitializer };
