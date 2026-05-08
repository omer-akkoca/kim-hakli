import { Pressable } from '@/components/ui';
import React from 'react';
import { SvgProps } from 'react-native-svg';

interface IAppIconButton {
  icon: React.FC<SvgProps>;
  onPress: () => void;
  color?: string;
  width?: number;
  height?: number;
  className?: string;
}

const AppIconButton: React.FC<IAppIconButton> = ({
  icon: Icon,
  onPress,
  color = '#000',
  height = 24,
  width = 24,
  className,
}) => {
  return (
    <Pressable
      className={className}
      onPress={onPress}
      hitSlop={{ bottom: 4, left: 4, right: 4, top: 4 }}
    >
      <Icon width={width} height={height} color={color} />
    </Pressable>
  );
};

export { AppIconButton };
