import React from 'react';
import { Image } from 'expo-image';
import { Box, HStack } from '@/components/ui';
import { StoryVoteCard } from '@/src/types';
import { W } from '@/src/constants';
import { formatStoryVoteCount } from '@/src/utils';
import { AppCard, AppText } from '../ui';
import { WinnerBadge } from './WinnerBadge';
import { VotedBadge } from './VotedBadge';

interface WinnerResultCardProps {
  winner: StoryVoteCard;
  votedId?: string;
}

const WinnerResultCard: React.FC<WinnerResultCardProps> = ({ winner, votedId }) => {
  const titleWords = winner.title.trim().split(/\s+/);
  const isSingleWord = titleWords.length === 1;

  const iVoted = votedId === winner.side_id;

  return (
    <AppCard className="border-1.5 border-primary-500/60">
      <HStack>
        <Box className="relative">
          <Image
            source={winner.avatar_url}
            contentFit="cover"
            cachePolicy="memory-disk"
            transition={200}
            recyclingKey={winner.side_id}
            style={{ width: W(175), height: W(200) }}
            contentPosition={'center'}
            className="rounded-2xl"
          />
          {iVoted ? <VotedBadge /> : null}
        </Box>
        <Box className="flex-1 items-center justify-center px-4">
          <WinnerBadge />
          <AppText
            family="PlayfairDisplay"
            size={30}
            lineHeight={36}
            weight={700}
            color="headline"
            className="mt-2 text-center"
            numberOfLines={isSingleWord ? 1 : 2}
            adjustsFontSizeToFit
            minimumFontScale={0.72}
          >
            {winner.title}
          </AppText>
          <AppText
            size={30}
            lineHeight={40}
            weight={800}
            color="primary"
            className="text-center"
            style={{
              textShadowColor: 'rgba(241,118,42,0.22)',
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 24,
            }}
          >
            {winner.percentage}%
          </AppText>
          <AppText weight={500} color="headline_82" className="-tracking-1 text-center">
            {formatStoryVoteCount(winner.vote_count)} Oy
          </AppText>
        </Box>
      </HStack>
    </AppCard>
  );
};

interface ResultCardProps {
  side: StoryVoteCard;
  votedId?: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ side, votedId }) => {
  const titleWords = side.title.trim().split(/\s+/);
  const isSingleWord = titleWords.length === 1;

  const iVoted = votedId === side.side_id;

  return (
    <AppCard>
      <HStack className="items-center p-4">
        <Box className="relative">
          <Image
            source={side.avatar_url}
            contentFit="cover"
            cachePolicy="memory-disk"
            transition={200}
            recyclingKey={side.side_id}
            style={{ width: W(125), height: W(125), borderRadius: 16 }}
            className="rounded-2xl"
          />
          {iVoted ? <VotedBadge /> : null}
        </Box>
        <Box className="flex-1 items-center justify-center pl-4">
          <AppText
            family="PlayfairDisplay"
            size={25}
            lineHeight={35}
            weight={700}
            color="headline"
            className="text-center w-full"
            numberOfLines={isSingleWord ? 1 : 2}
            adjustsFontSizeToFit
            minimumFontScale={0.72}
          >
            {side.title}
          </AppText>
          <AppText size={25} lineHeight={35} weight={800} color="primary" className="text-center">
            {side.percentage}%
          </AppText>
          <AppText weight={500} color="headline_82" className="-tracking-1 text-center">
            {formatStoryVoteCount(side.vote_count)} Oy
          </AppText>
        </Box>
      </HStack>
    </AppCard>
  );
};

export { WinnerResultCard, ResultCard };
