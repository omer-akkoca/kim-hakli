import React, { PropsWithChildren, useEffect } from 'react';
import * as NavigationBar from 'expo-navigation-bar';
import { useFonts } from 'expo-font';
import { useGetBookmarkedStoryIds, useGetCategories } from '@/src/actions';
import { FONTS } from '@/src/constants';

const AppInitializer: React.FC<PropsWithChildren> = ({ children }) => {
  useFonts(FONTS);
  useGetCategories();
  useGetBookmarkedStoryIds();

  useEffect(() => {
    NavigationBar.setButtonStyleAsync('light');
  }, []);

  return children;
};

export { AppInitializer };
