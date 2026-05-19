import React, { PropsWithChildren } from 'react';
import { useGetBookmarkedStoryIds } from '../actions';

const AppInitializer: React.FC<PropsWithChildren> = ({ children }) => {
  useGetBookmarkedStoryIds();

  return children;
};

export { AppInitializer };
