import React, { PropsWithChildren } from 'react';
import { useGetBookmarkedStoryIds, useGetCategories } from '@/src/actions';

const AppInitializer: React.FC<PropsWithChildren> = ({ children }) => {
  useGetCategories();
  useGetBookmarkedStoryIds();

  return children;
};

export { AppInitializer };
