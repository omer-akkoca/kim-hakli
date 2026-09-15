import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from '@/src/hooks';

interface AppStatusBarProps {
  hidden?: boolean;
}

const AppStatusBar: React.FC<AppStatusBarProps> = ({ hidden = false }) => {
  const { theme } = useTheme();
  return (
    <StatusBar
      animated
      barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      hidden={hidden}
    />
  );
};

export { AppStatusBar };
