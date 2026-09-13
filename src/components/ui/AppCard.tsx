import { Pressable } from '@/components/ui';
import { commonStyles } from '@/src/styles';
import React, { PropsWithChildren } from 'react';

interface AppCardProps extends PropsWithChildren {
  flex?: boolean;
  onPress?: () => void;
  className?: string;
}

const AppCard: React.FC<AppCardProps> = ({ onPress, flex, className, children }) => {
  return (
    <Pressable
      onPress={onPress}
      className={`bg-background-500 border border-white/10 rounded-xl overflow-hidden ${className}`}
      style={[{ flex: flex ? 1 : undefined }, commonStyles.barShadow]}
      disabled={!onPress}
    >
      {children}
    </Pressable>
  );
};

export { AppCard };
