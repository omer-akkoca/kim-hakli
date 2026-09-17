import React from 'react';
import { VoteVector } from '@/assets';
import { Box, HStack } from '@/components/ui';
import { useTheme } from '@/src/hooks';
import { AppCard, AppText } from '../ui';

const VotedBadge = () => {
  const { colors } = useTheme();
  return (
    <Box className="items-center" style={{ position: 'absolute', left: 0, right: 0, bottom: 8 }}>
      <AppCard className="h-8 rounded-full">
        <HStack space="sm" className="flex-1 items-center justify-center px-4">
          <VoteVector width={14} height={14} color={colors.headline} />
          <AppText size={10} lineHeight={14} weight={700} color="headline" className="-tracking-2">
            OY VERDİN
          </AppText>
        </HStack>
      </AppCard>
    </Box>
  );
};

export { VotedBadge };
