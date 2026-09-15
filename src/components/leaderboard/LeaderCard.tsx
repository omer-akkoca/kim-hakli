import React from 'react';
import { Image } from 'expo-image';
import { CreditVector, CrownVector, LOGO } from '@/assets';
import { Box, HStack, VStack } from '@/components/ui';
import { IAllTimeLeaderboardUserWithAvatarUrl } from '@/src/types';
import { useAuth, useTheme } from '@/src/hooks';
import { AppText, AppCard } from '../ui';

interface LeaderCardProps {
  leader?: IAllTimeLeaderboardUserWithAvatarUrl | null;
}

const LeaderCard: React.FC<LeaderCardProps> = ({ leader }) => {
  const { user } = useAuth();
  const { colors } = useTheme();

  if (!leader) return null;

  const avatar = leader.avatar_path_url
    ? { uri: leader.avatar_path_url }
    : leader.avatar_url
      ? { uri: leader.avatar_url }
      : LOGO;

  const isLeader = user?.id === leader.id;

  return (
    <AppCard style={isLeader ? { borderWidth: 1.75, borderColor: colors.primary } : undefined}>
      <VStack space="md" className="items-center justify-center" style={{ paddingBottom: 16 }}>
        <Box className="relative justify-center items-center mb-4">
          <CrownVector
            width={44}
            height={44}
            color={colors.primary}
            style={{ transform: [{ translateY: 12 }] }}
          />
          <Image
            source={avatar}
            contentFit="cover"
            cachePolicy="memory-disk"
            transition={200}
            recyclingKey={leader.id}
            style={{
              width: 100,
              height: 100,
              borderRadius: 99,
              borderWidth: 2,
              borderColor: colors.primary,
            }}
          />
          <Box
            className="absolute items-center justify-center rounded-full"
            style={{
              backgroundColor: colors.primary,
              width: 32,
              height: 32,
              left: 34,
              bottom: -16,
            }}
          >
            <AppText size={16} lineHeight={32} weight={700} color="white">
              1
            </AppText>
          </Box>
        </Box>
        <AppText size={20} lineHeight={28} weight={700} color="headline">
          {leader.full_name}
        </AppText>
        <HStack space="sm" className="items-center">
          <CreditVector width={16} height={16} />
          <AppText size={15} weight={600} color="headline">
            {leader.total_earned_credit}
          </AppText>
        </HStack>
      </VStack>
    </AppCard>
  );
};

export { LeaderCard };
