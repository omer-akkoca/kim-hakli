import React from 'react';
import { Image } from 'expo-image';
import { Box, HStack, LinearGradient } from '@/components/ui';
import { StoryVoteCard } from '@/src/types';
import { AppText } from '../ui/AppText';
import { W } from '@/src/constants';
import { formatStoryVoteCount } from '@/src/utils';
import { WinnerBadge } from './WinnerBadge';

interface WinnerResultCardProps {
  winner: StoryVoteCard;
}

const WinnerResultCard: React.FC<WinnerResultCardProps> = ({ winner }) => {
  const titleWords = winner.title.trim().split(/\s+/);
  const isSingleWord = titleWords.length === 1;

  return (
    <Box
      className="w-full rounded-2xl bg-background-500/70 border-1.5 border-primary-500/60 overflow-hidden"
      style={{ height: W(200), boxShadow: '0 0 34px rgba(241,118,42,0.20)' }}
    >
      <LinearGradient
        colors={['rgba(241,118,42,0.12)', 'rgba(241,118,42,0.06)', 'rgba(0,0,0,0)']}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="flex-1 relative"
      >
        <Box className="flex-1">
          <HStack className="flex-1">
            <Image
              source={winner.avatar_url}
              contentFit="cover"
              cachePolicy="memory-disk"
              transition={200}
              recyclingKey={winner.side_id}
              style={{ width: W(175), height: '100%' }}
              contentPosition={'center'}
              className="rounded-2xl"
            />
            <Box className="flex-1 items-center justify-center px-4">
              <WinnerBadge />
              <AppText
                family="PlayfairDisplay"
                size={30}
                lineHeight={36}
                weight={700}
                className="text-headline mt-2 text-center"
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
                className="text-primary-500 text-center"
                style={{
                  textShadowColor: 'rgba(241,118,42,0.22)',
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: 24,
                }}
              >
                {winner.percentage}%
              </AppText>
              <AppText weight={500} className="-tracking-1 text-whiteSmoke-500/40 text-center">
                {formatStoryVoteCount(winner.vote_count)} Oy
              </AppText>
            </Box>
          </HStack>
        </Box>
        <Box
          className="absolute inset-0 rounded-4xl"
          style={{
            shadowColor: 'rgba(241,118,42,1)',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.2,
            shadowRadius: 34,
          }}
        />
      </LinearGradient>
    </Box>
  );
};

interface ResultCardProps {
  side: StoryVoteCard;
}

const ResultCard: React.FC<ResultCardProps> = ({ side }) => {
  const titleWords = side.title.trim().split(/\s+/);
  const isSingleWord = titleWords.length === 1;

  return (
    <Box
      className="rounded-2xl border border-white/5 overflow-hidden"
      style={{ boxShadow: '0 12px 28px rgba(0,0,0,0.20)' }}
    >
      <LinearGradient
        colors={['rgba(80,140,255,0.06)', 'rgba(80,140,255,0.03)', 'rgba(0,0,0,0)']}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="relative"
      >
        <Box className="p-4">
          <HStack className="items-center">
            <Image
              source={side.avatar_url}
              contentFit="cover"
              cachePolicy="memory-disk"
              transition={200}
              recyclingKey={side.side_id}
              style={{ width: W(125), height: W(125), borderRadius: 16 }}
              className="rounded-2xl"
            />
            <Box className="flex-1 items-center justify-center pl-4">
              <AppText
                family="PlayfairDisplay"
                size={25}
                lineHeight={35}
                weight={700}
                className="text-headline text-center w-full"
                numberOfLines={isSingleWord ? 1 : 2}
                adjustsFontSizeToFit
                minimumFontScale={0.72}
              >
                {side.title}
              </AppText>
              <AppText
                size={25}
                lineHeight={35}
                weight={800}
                className="text-primary-500 text-center"
                style={{
                  textShadowColor: 'rgba(241,118,42,0.22)',
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: 24,
                }}
              >
                {side.percentage}%
              </AppText>
              <AppText weight={500} className="-tracking-1 text-whiteSmoke-500/40 text-center">
                {formatStoryVoteCount(side.vote_count)} Oy
              </AppText>
            </Box>
          </HStack>
        </Box>
        <LinearGradient
          colors={['rgba(0,0,0,0.10)', 'rgba(0,0,0,0)']}
          locations={[0, 0.3]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="absolute inset-0 rounded-xl"
        />
      </LinearGradient>
    </Box>
  );
};

export { WinnerResultCard, ResultCard };
