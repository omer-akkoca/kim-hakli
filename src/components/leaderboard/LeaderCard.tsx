import React from 'react';
import { Box, HStack, VStack } from '@/components/ui';
import { CreditVector, CrownVector, LOGO } from '@/assets';
import { IAllTimeLeaderboardUserWithAvatarUrl } from '@/src/types';
import { colors } from '@/src/constants';
import { AppText } from '../ui/AppText';
import { AppCard } from '../ui/AppCard';
import { useAuth } from '@/src/hooks';
import { Image } from 'expo-image';

interface LeaderCardProps {
  leader?: IAllTimeLeaderboardUserWithAvatarUrl | null;
}

const LeaderCard: React.FC<LeaderCardProps> = ({ leader }) => {
  const { user } = useAuth();

  if (!leader) return null;

  const avatar = leader.avatar_path_url
    ? { uri: leader.avatar_path_url }
    : leader.avatar_url
      ? { uri: leader.avatar_url }
      : LOGO;

  return (
    <AppCard className={user?.id === leader.id ? 'border-2 border-primary-500' : ''}>
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
            className="absolute items-center justify-center bg-primary-500 rounded-full shadow-xl shadow-background-500"
            style={{ width: 32, height: 32, left: 34, bottom: -16 }}
          >
            <AppText size={16} lineHeight={32} weight={700} className="text-headline">
              1
            </AppText>
          </Box>
        </Box>
        <AppText size={20} lineHeight={28} weight={700} className="text-headline">
          {leader.full_name}
        </AppText>
        <HStack space="sm" className="items-center">
          <CreditVector width={16} height={16} />
          <AppText size={15} weight={500} className="text-headline">
            {leader.total_earned_credit}
          </AppText>
        </HStack>
      </VStack>
    </AppCard>
  );
};

export { LeaderCard };
