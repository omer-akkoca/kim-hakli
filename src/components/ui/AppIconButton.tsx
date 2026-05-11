import { Pressable } from '@/components/ui';
import React from 'react';
import { ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

interface IAppIconButton {
  icon: React.FC<SvgProps>;
  onPress: () => void;
  color?: string;
  width?: number;
  height?: number;
  className?: string;
  style?: ViewStyle;
}

const AppIconButton: React.FC<IAppIconButton> = ({
  icon: Icon,
  onPress,
  color = '#000',
  height = 24,
  width = 24,
  className,
  style,
}) => {
  return (
    <Pressable
      onPress={onPress}
      className={className}
      style={style}
      hitSlop={{ bottom: 4, left: 4, right: 4, top: 4 }}
    >
      <Icon width={width} height={height} color={color} />
    </Pressable>
  );
};

export { AppIconButton };
