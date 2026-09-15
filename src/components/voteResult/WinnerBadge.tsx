import React from 'react';
import { CrownVector } from '@/assets';
import { HStack } from '@/components/ui';
import { useTheme } from '@/src/hooks';
import { AppText } from '../ui';

const WinnerBadge = () => {
  const { colors } = useTheme();
  return (
    <HStack
      space="sm"
      style={{ backgroundColor: colors.primary }}
      className="items-center px-4 rounded-full h-8"
    >
      <CrownVector width={14} height={14} color={colors.title} />
      <AppText size={12} lineHeight={16} weight={700} color="title" className="-tracking-2">
        HAKLI
      </AppText>
    </HStack>
  );
};

export { WinnerBadge };
