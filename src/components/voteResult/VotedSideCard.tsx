import { IVotedSide } from '@/src/types';
import React from 'react';
import { AppCard } from '../ui/AppCard';
import { Box, HStack, VStack } from '@/components/ui';
import { Image } from 'expo-image';
import { AppText } from '../ui/AppText';
import { SuccessCircleVector } from '@/assets';
import { colors } from '@/src/constants';

interface VotedSideCardProps {
  side: IVotedSide;
}

const VotedSideCard: React.FC<VotedSideCardProps> = ({ side }) => {
  return (
    <AppCard>
      <HStack className="items-center justify-between px-4 py-2">
        <HStack space="md" className="flex-1 items-center">
          <Box className="w-12 h-12 items-center justify-center">
            <Image
              source={side.avatar_url}
              contentFit="cover"
              cachePolicy="memory-disk"
              transition={200}
              recyclingKey={side.side_id}
              style={{ width: 40, height: 40, borderRadius: 4 }}
            />
          </Box>
          <VStack className="flex-1 h-12 justify-around0">
            <AppText
              size={14}
              lineHeight={20}
              weight={500}
              className="-tracking-1 text-whiteSmoke-500/75"
            >
              Senin Seçimin
            </AppText>
            <AppText
              size={14}
              lineHeight={20}
              weight={800}
              className="-tracking-1 text-whiteSmoke-500"
              numberOfLines={1}
            >
              {side.title}
            </AppText>
          </VStack>
        </HStack>
        <AppCard className="rounded-full">
          <HStack space="sm" className="items-center px-3 py-2">
            <SuccessCircleVector width={16} height={16} fill={colors.headline} />
            <AppText size={12} lineHeight={16} weight={500} className="-tracking-4 text-headline">
              OY VERDİN
            </AppText>
          </HStack>
        </AppCard>
      </HStack>
    </AppCard>
  );
};

export { VotedSideCard };
