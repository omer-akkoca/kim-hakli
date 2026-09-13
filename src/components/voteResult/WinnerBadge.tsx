import { HStack } from '@/components/ui';
import React from 'react';
import { AppText } from '../ui/AppText';
import { CrownVector } from '@/assets';
import { colors } from '@/src/constants';

const WinnerBadge = () => {
  return (
    <HStack space="sm" className="items-center px-4 rounded-full bg-primary-500/30 h-8">
      <CrownVector width={14} height={14} color={colors.primary} />
      <AppText size={12} lineHeight={16} weight={700} className="text-primary-500 -tracking-2">
        HAKLI
      </AppText>
    </HStack>
  );
};

export { WinnerBadge };
