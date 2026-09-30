import React, { PropsWithChildren } from 'react';
import { ViewStyle } from 'react-native';
import { Pressable } from '@/components/ui';
import { useTheme } from '@/src/hooks';

interface AppCardProps extends PropsWithChildren {
  flex?: boolean;
  onPress?: () => void;
  className?: string;
  style?: ViewStyle | ViewStyle[];
}

const AppCard: React.FC<AppCardProps> = ({ onPress, flex, className, style, children }) => {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      className={`border rounded-xl overflow-hidden ${className}`}
      style={[
        {
          flex: flex ? 1 : undefined,
          backgroundColor: colors.appCardBg,
          boxShadow: colors.shadow,
          borderColor: colors.appCardBorder,
        },
        style,
      ]}
      disabled={!onPress}
    >
      {children}
    </Pressable>
  );
};

export { AppCard };
