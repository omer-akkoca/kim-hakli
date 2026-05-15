import React, { PropsWithChildren } from 'react';
import { Image as RnImage } from 'react-native';
import { Box, HStack, LinearGradient } from '@/components/ui';
import { StorySide } from '@/src/types';
import { AppText } from '../ui/AppText';
import { W } from '@/src/constants';
import { formatStoryVoteCount } from '@/src/utils';
import { WinnerBadge } from './WinnerBadge';

interface WinnerResultCardProps {
  winner: StorySide;
  winnerVote: number;
  totalVote: number;
}

const WinnerResultCard: React.FC<WinnerResultCardProps> = ({ winner, winnerVote, totalVote }) => {
  const winnerPercent = Math.round((winnerVote / totalVote) * 1000) / 10;

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
            <RnImage
              source={{ uri: winner.photo }}
              className="h-full"
              style={{ width: W(175) }}
              resizeMode="cover"
            />
            <Box className="flex-1 items-center justify-center">
              <WinnerBadge />
              <AppText
                family="PlayfairDisplay"
                size={30}
                lineHeight={36}
                weight={700}
                className="text-headline mt-2"
              >
                {winner.name}
              </AppText>
              <AppText
                size={30}
                lineHeight={40}
                weight={800}
                className="text-primary-500 "
                style={{
                  textShadowColor: 'rgba(241,118,42,0.22)',
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: 24,
                }}
              >
                {winnerPercent}%
              </AppText>
              <AppText weight={500} className="-tracking-1 text-whiteSmoke-500/40">
                {formatStoryVoteCount(winnerVote)} Oy
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
  totalVote: number;
  vote: number;
  side: StorySide;
}

const ResultCard: React.FC<ResultCardProps> = ({ side, totalVote, vote }) => {
  const sidePercent = Math.round((vote / totalVote) * 1000) / 10;

  return (
    <Box
      className="w-full rounded-2xl border border-white/5 overflow-hidden"
      style={{ boxShadow: '0 12px 28px rgba(0,0,0,0.20)' }}
    >
      <LinearGradient
        colors={['rgba(80,140,255,0.06)', 'rgba(80,140,255,0.03)', 'rgba(0,0,0,0)']}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="flex-1 relative"
      >
        <Box className="flex-1 p-4">
          <HStack className="flex-1">
            <RnImage
              source={{ uri: side.photo }}
              style={{ width: W(125), height: W(125) }}
              resizeMode="cover"
              className="rounded-2xl"
            />
            <Box className="flex-1 items-center justify-center">
              <AppText
                family="PlayfairDisplay"
                size={30}
                lineHeight={36}
                weight={700}
                className="text-headline"
              >
                {side.name}
              </AppText>
              <AppText
                size={30}
                lineHeight={40}
                weight={800}
                className="text-primary-500 "
                style={{
                  textShadowColor: 'rgba(241,118,42,0.22)',
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: 24,
                }}
              >
                {sidePercent}%
              </AppText>
              <AppText weight={500} className="-tracking-1 text-whiteSmoke-500/40">
                {formatStoryVoteCount(vote)} Oy
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

interface TotalVoteCardProps extends PropsWithChildren {
  className?: string;
}

const TotalVoteCard: React.FC<TotalVoteCardProps> = ({ children }) => {
  return (
    <Box
      className="w-full rounded-2xl border border-white/5 overflow-hidden"
      style={{ boxShadow: '0 12px 28px rgba(0,0,0,0.20)' }}
    >
      <LinearGradient
        colors={['rgba(80,140,255,0.06)', 'rgba(80,140,255,0.03)', 'rgba(0,0,0,0)']}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="flex-1 relative"
      >
        {children}
      </LinearGradient>
    </Box>
  );
};

export { WinnerResultCard, ResultCard, TotalVoteCard };
