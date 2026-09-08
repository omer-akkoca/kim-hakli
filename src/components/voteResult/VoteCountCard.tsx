import React from 'react';
import { AppCard } from '../ui/AppCard';
import { Box, HStack } from '@/components/ui';
import { UsersVector } from '@/assets';
import { AppText } from '../ui/AppText';
import { formatStoryVoteCount } from '@/src/utils';
import { colors } from '@/src/constants';

interface VoteCountCardProps {
  voteCount: number;
}

const VoteCountCard: React.FC<VoteCountCardProps> = ({ voteCount }) => {
  return (
    <AppCard>
      <HStack className="items-center justify-between px-4 py-2">
        <HStack space="md" className="items-center">
          <Box className="w-12 h-12 bg-background-500 rounded-lg items-center justify-center">
            <UsersVector width={20} height={20} color={colors.primary} />
          </Box>
          <AppText
            size={14}
            lineHeight={20}
            weight={500}
            className="-tracking-1 text-whiteSmoke-500"
          >
            Toplam Oy
          </AppText>
        </HStack>
        <AppText
          size={28}
          lineHeight={34}
          weight={800}
          className="-tracking-4 text-headline"
          style={{
            textShadowColor: 'rgba(0,0,0,0.22)',
            textShadowOffset: { width: 0, height: 4 },
            textShadowRadius: 12,
          }}
        >
          {formatStoryVoteCount(voteCount)}
        </AppText>
      </HStack>
    </AppCard>
  );
};

export { VoteCountCard };
