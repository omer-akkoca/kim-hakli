import React from 'react';
import { UsersVector } from '@/assets';
import { HStack } from '@/components/ui';
import { formatStoryVoteCount } from '@/src/utils';
import { useTheme } from '@/src/hooks';
import { AppCard, AppText } from '../ui';
interface VoteCountCardProps {
  voteCount: number;
}

const VoteCountCard: React.FC<VoteCountCardProps> = ({ voteCount }) => {
  const { colors } = useTheme();
  return (
    <AppCard>
      <HStack className="items-center justify-between px-4 py-3">
        <HStack space="md" className="items-center">
          <UsersVector width={20} height={20} color={colors.primary} />
          <AppText size={14} lineHeight={20} weight={500} color="headline" className="-tracking-1">
            Toplam Oy
          </AppText>
        </HStack>
        <AppText size={28} lineHeight={34} weight={800} color="headline" className="-tracking-4">
          {formatStoryVoteCount(voteCount)}
        </AppText>
      </HStack>
    </AppCard>
  );
};

export { VoteCountCard };
