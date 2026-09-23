import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Linking, Platform, Modal } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { useFonts } from 'expo-font';
import { Image } from 'expo-image';
import { usePathname } from 'expo-router';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { version } from '@/package.json';
import { CrossVector } from '@/assets';
import { Box } from '@/components/ui';
import {
  useGetAppConfig,
  useGetAvatarUrl,
  useGetBookmarkedStoryIds,
  useGetCategories,
  useSavePushToken,
} from '@/src/actions';
import { FONTS, STORAGE_KEYS, STORE_URL, width } from '@/src/constants';
import { AppIconButton, AppNoInternet, AppSplash } from '@/src/components';
import { useAppState, useAuth, useModal, useTheme } from '@/src/hooks';
import { registerForPushNotificationsAsync } from '@/src/services';
import { getMonthlyRewardUrl, isVersionLower, storage } from '@/src/utils';
import { setBookmarks, setHasSeenOnboarding, setHasSeenReward, useAppDispatch } from '@/src/store';
import '@/src/configs/google';

const AppInitializer: React.FC<PropsWithChildren> = ({ children }) => {
  const [fontsLoaded] = useFonts(FONTS);
  const { user } = useAuth();
  const { hasSeenOnboarding, hasSeenReward } = useAppState();
  const pathName = usePathname();
  const { show, hide } = useModal();
  const { loading: themeLoading } = useTheme();
  const dispatch = useAppDispatch();

  const { data: appConfig, isLoading } = useGetAppConfig();
  const { data: bookmarkData, isSuccess: bookmarkSuccess } = useGetBookmarkedStoryIds(user?.id);
  useGetCategories();
  useGetAvatarUrl({ userId: user?.id, avatarPath: user?.avatar_path });

  const { mutate: savePushToken } = useSavePushToken();

  const notificationRegistrationStarted = useRef(false);

  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  const getIsOnline = (state: NetInfoState) =>
    state.isConnected === true && state.isInternetReachable !== false;

  const minimumVersion =
    Platform.OS === 'android' ? appConfig?.android_version : appConfig?.ios_version;
  const isUpdateRequired = !!minimumVersion && isVersionLower(version, minimumVersion);

  const isRewardAvailable = pathName === '/home' && !hasSeenReward;

  // navigation bar style
  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setButtonStyleAsync('light');
    }
  }, []);

  // onboarding kontrolü
  useEffect(() => {
    const initializeOnboarding = async () => {
      const value = await storage.get<boolean>(STORAGE_KEYS.HAS_SEEN_ONBOARDING);
      dispatch(setHasSeenOnboarding(value ?? false));
    };

    initializeOnboarding();
  }, [dispatch]);

  // İlk bağlantı kontrolü + uygulama açıkken değişimleri dinleme
  useEffect(() => {
    let mounted = true;

    const checkInitialConnection = async () => {
      const state = await NetInfo.fetch();

      if (mounted) {
        setIsOnline(getIsOnline(state));
      }
    };

    checkInitialConnection();

    const unsubscribe = NetInfo.addEventListener((state) => {
      if (mounted) {
        setIsOnline(getIsOnline(state));
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

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

  // aylık ödül popup'ı
  useEffect(() => {
    if (isRewardAvailable) {
      dispatch(setHasSeenReward(true));
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
              <AppIconButton icon={CrossVector} onPress={hide} withBg color="title" />
            </Box>
          </Box>
        ),
      });
    }
  }, [isRewardAvailable]);

  // kullanıcının kaydedilen hikayeleri getirme
  useEffect(() => {
    if (bookmarkSuccess && bookmarkData) {
      dispatch(setBookmarks(bookmarkData));
    }
  }, [bookmarkSuccess, bookmarkData]);

  if (
    !fontsLoaded ||
    isLoading ||
    hasSeenOnboarding === null ||
    themeLoading ||
    isOnline === null
  ) {
    return <AppSplash />;
  }

  return (
    <>
      {children}

      <Modal visible={!isOnline} animationType="fade">
        <AppNoInternet setIsOnline={setIsOnline} />
      </Modal>
    </>
  );
};

export { AppInitializer };
