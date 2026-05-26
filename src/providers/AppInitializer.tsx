import React, { PropsWithChildren, useEffect } from 'react';
import * as NavigationBar from 'expo-navigation-bar';
import { useGetBookmarkedStoryIds, useGetCategories } from '@/src/actions';

const AppInitializer: React.FC<PropsWithChildren> = ({ children }) => {
  useGetCategories();
  useGetBookmarkedStoryIds();

  useEffect(() => {
    NavigationBar.setButtonStyleAsync('light');
  }, []);

  return children;
};

export { AppInitializer };
