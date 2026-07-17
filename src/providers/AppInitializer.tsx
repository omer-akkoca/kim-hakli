import React, { PropsWithChildren, useEffect } from 'react';
import { Linking } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { useFonts } from 'expo-font';
import { useGetAppConfig, useGetBookmarkedStoryIds, useGetCategories } from '@/src/actions';
import { FONTS, STORE_URL } from '@/src/constants';
import { AppLoading } from '@/src/components';
import { useModal } from '@/src/hooks';
import { version } from '@/package.json';

const AppInitializer: React.FC<PropsWithChildren> = ({ children }) => {
  const { show } = useModal();
  const [fontsLoaded] = useFonts(FONTS);

  const { data: appConfig, isLoading } = useGetAppConfig();
  useGetCategories();
  useGetBookmarkedStoryIds();

  useEffect(() => {
    NavigationBar.setButtonStyleAsync('light');
  }, []);

  useEffect(() => {
    if (!appConfig) return;
    if (version !== appConfig.version) {
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
