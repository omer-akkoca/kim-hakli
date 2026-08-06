import React, { PropsWithChildren, useEffect } from 'react';
import { Linking, Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { useFonts } from 'expo-font';
import {
  useGetAppConfig,
  useGetAvatarUrl,
  useGetBookmarkedStoryIds,
  useGetCategories,
} from '@/src/actions';
import { FONTS, STORE_URL } from '@/src/constants';
import { AppLoading } from '@/src/components';
import { useAuth, useModal } from '@/src/hooks';

const AppInitializer: React.FC<PropsWithChildren> = ({ children }) => {
  const { show } = useModal();
  const [fontsLoaded] = useFonts(FONTS);
  const { user } = useAuth();

  const { data: appConfig, isLoading } = useGetAppConfig();
  useGetCategories();
  useGetBookmarkedStoryIds();
  useGetAvatarUrl({ userId: user?.id, avatarPath: user?.avatar_path });

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setButtonStyleAsync('light');
    }
  }, []);

  useEffect(() => {
    if (!appConfig) return;
    if (appConfig.minimum_required_version !== appConfig.latest_version) {
      show({
        noClosable: true,
        title: 'Güncelleme Gerekli',
        subtitle: appConfig.update_message,
        buttons: [{ label: 'Güncelle', onPress: () => Linking.openURL(STORE_URL) }],
      });
    }
  }, [appConfig]);

  if (!fontsLoaded || isLoading) return <AppLoading fullScreen />;

  return children;
};

export { AppInitializer };
