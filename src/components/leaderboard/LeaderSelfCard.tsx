import React from 'react';
import { Avatar, AvatarImage, Box, HStack } from '@/components/ui';
import { LOGO } from '@/assets';
import { AppCard } from '../ui/AppCard';
import { AppText } from '../ui/AppText';
import { CreditBadge } from '../ui/CreditBadge';
import { useAuth } from '@/src/hooks';

interface LeaderSelfCardProps {
  rank: number;
}

const LeaderSelfCard: React.FC<LeaderSelfCardProps> = ({ rank }) => {
  const { user, profile_photo } = useAuth();

  return (
    <AppCard className="border-2 border-primary-500">
      <HStack space="md" className="px-4 py-2 items-center">
        <HStack space="sm" className="flex-1 items-center">
          <Box className="w-10">
            <AppText
              size={16}
              weight={600}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.75}
              className="w-full text-headline text-center"
            >
              {rank}
            </AppText>
          </Box>
          <Avatar size="md">
            <AvatarImage
              source={
                profile_photo || user?.avatar_url
                  ? { uri: profile_photo ?? user?.avatar_url }
                  : LOGO
              }
            />
          </Avatar>
          <AppText className="flex-1 text-headline" numberOfLines={1}>
            {user!.full_name}
          </AppText>
        </HStack>
        <CreditBadge credit={user!.credit_count} withNumber />
      </HStack>
    </AppCard>
  );
};

export { LeaderSelfCard };
