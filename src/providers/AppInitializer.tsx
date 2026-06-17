import React, { PropsWithChildren, useEffect } from 'react';
import * as NavigationBar from 'expo-navigation-bar';
import { useFonts } from 'expo-font';
import { useGetBookmarkedStoryIds, useGetCategories } from '@/src/actions';
import { FONTS } from '@/src/constants';
import { AppLoading } from '../components';

const AppInitializer: React.FC<PropsWithChildren> = ({ children }) => {
  const [fontsLoaded] = useFonts(FONTS);
  useGetCategories();
  useGetBookmarkedStoryIds();

  useEffect(() => {
    NavigationBar.setButtonStyleAsync('light');
  }, []);

  if (!fontsLoaded) return <AppLoading fullScreen />;

  return children;
};

export { AppInitializer };
