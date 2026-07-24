import React from 'react';
import { Avatar, AvatarImage, Box, HStack, VStack } from '@/components/ui';
import { CreditVector, CrownVector, LOGO } from '@/assets';
import { ILeaderBoardProfile } from '@/src/types';
import { colors } from '@/src/constants';
import { AppText } from '../ui/AppText';
import { AppCard } from '../ui/AppCard';
import { useAuth } from '@/src/hooks';

interface LeaderCardProps {
  leader: ILeaderBoardProfile | null;
}

const LeaderCard: React.FC<LeaderCardProps> = ({ leader }) => {
  const { user } = useAuth();

  if (!leader) return null;

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
          <Avatar
            className="border-2 border-primary-500 bg-transparent"
            style={{ boxShadow: '0 0 40px rgba(241,118,42,0.28)', width: 100, height: 100 }}
          >
            <AvatarImage source={leader.avatar ? { uri: leader.avatar } : LOGO} />
          </Avatar>
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
            {leader.credit_count}
          </AppText>
        </HStack>
      </VStack>
    </AppCard>
  );
};

export { LeaderCard };
