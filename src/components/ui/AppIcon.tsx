import React from 'react';
import { SvgProps } from 'react-native-svg';
import { useColorScheme } from 'react-native';

interface AppIconProps {
  icon: React.FC<SvgProps>;
  width: number;
  height: number;
  color: string;
  darkColor: string;
}

const AppIcon: React.FC<AppIconProps> = ({ icon: Icon, width, height, color, darkColor }) => {
  const colorScheme = useColorScheme();

  const iconColor = colorScheme ? (colorScheme === 'dark' ? darkColor : color) : color;

  return <Icon width={width} height={height} color={iconColor} />;
};

export { AppIcon };
