import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { Linking, Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { useFonts } from 'expo-font';
import { Image } from 'expo-image';
import { version } from '@/package.json';
import { CrossVector } from '@/assets';
import { Box } from '@/components/ui';
import {
  useGetAppConfig,
  useGetAvatarUrl,
  useGetBookmarkedStoryIds,
  useGetCategories,
  useSavePushToken,
  useSignOut,
} from '@/src/actions';
import { FONTS, STORE_URL, width } from '@/src/constants';
import { AppLoading, DetailIconButton } from '@/src/components';
import { useAuth, useModal } from '@/src/hooks';
import { registerForPushNotificationsAsync } from '@/src/services';
import { getMonthlyRewardUrl, isVersionLower } from '@/src/utils';
import '@/src/configs/google';

const AppInitializer: React.FC<PropsWithChildren> = ({ children }) => {
  const { show, hide } = useModal();
  const [fontsLoaded] = useFonts(FONTS);
  const { user } = useAuth();

  const { mutate: logOut } = useSignOut();

  const { data: appConfig, isLoading } = useGetAppConfig();
  useGetCategories();
  useGetBookmarkedStoryIds();
  useGetAvatarUrl({ userId: user?.id, avatarPath: user?.avatar_path });

  const { mutate: savePushToken } = useSavePushToken();

  const notificationRegistrationStarted = useRef(false);

  const deletedAccount = user?.status === 'deleted';

  const minimumVersion =
    Platform.OS === 'android' ? appConfig?.android_version : appConfig?.ios_version;
  const isUpdateRequired =
    !deletedAccount && !!minimumVersion && isVersionLower(version, minimumVersion);

  const isRewardAvailable = !deletedAccount || !isUpdateRequired;

  // navigation bar style
  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setButtonStyleAsync('light');
    }
  }, []);

  // silinmiş hesap uyarısı
  useEffect(() => {
    if (deletedAccount) {
      show({
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
    }
  }, [deletedAccount]);

  // version kontrolü ve güncelleme uyarısı
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

  // push notification kaydı
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

  useEffect(() => {
    if (isRewardAvailable) {
      const imageWidth = width * 0.9;
      const imageHeight = (imageWidth / 9) * 16;
      show({
        content: (
          <Box
            className="relative mx-auto items-center justify-center"
            style={{ width: imageWidth, height: imageHeight }}
          >
            <Image
              source={getMonthlyRewardUrl()}
              contentFit="cover"
              cachePolicy="memory-disk"
              transition={200}
              recyclingKey="getMonthlyRewardUrl"
              style={{ width: '100%', height: '100%' }}
            />
            <Box className="absolute top-2 right-2">
              <DetailIconButton icon={CrossVector} onPress={hide} />
            </Box>
          </Box>
        ),
      });
    }
  }, [isRewardAvailable]);

  if (!fontsLoaded || isLoading) return <AppLoading fullScreen />;

  return children;
};

export { AppInitializer };
