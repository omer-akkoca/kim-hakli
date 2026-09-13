import React from 'react';
import { VoteVector } from '@/assets';
import { Box, HStack } from '@/components/ui';
import { colors } from '@/src/constants';
import { AppText } from '../ui/AppText';

const VotedBadge = () => {
  return (
    <Box className="items-center" style={{ position: 'absolute', left: 0, right: 0, bottom: 8 }}>
      <HStack space="sm" className="items-center px-4 py-2 rounded-full bg-background-500 h-8">
        <VoteVector width={14} height={14} color={colors.headline} />
        <AppText size={10} lineHeight={14} weight={700} className="text-headline -tracking-2">
          OYLADIN
        </AppText>
      </HStack>
    </Box>
  );
};

export { VotedBadge };
