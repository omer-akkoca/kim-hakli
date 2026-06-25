import React from 'react';
import { StatusBar } from 'react-native';

interface AppStatusBarProps {
  hidden?: boolean;
}

const AppStatusBar: React.FC<AppStatusBarProps> = ({ hidden = false }) => {
  return (
    <StatusBar
      translucent
      backgroundColor="transparent"
      animated
      barStyle={'light-content'}
      hidden={hidden}
    />
  );
};

export { AppStatusBar };
