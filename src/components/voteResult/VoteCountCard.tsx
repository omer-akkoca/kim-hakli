import React from 'react';
import { UsersVector } from '@/assets';
import { HStack } from '@/components/ui';
import { colors } from '@/src/constants';
import { formatStoryVoteCount } from '@/src/utils';
import { AppCard } from '../ui/AppCard';
import { AppText } from '../ui/AppText';

interface VoteCountCardProps {
  voteCount: number;
}

const VoteCountCard: React.FC<VoteCountCardProps> = ({ voteCount }) => {
  return (
    <AppCard>
      <HStack className="items-center justify-between px-4 py-3">
        <HStack space="md" className="items-center">
          <UsersVector width={20} height={20} color={colors.primary} />
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
