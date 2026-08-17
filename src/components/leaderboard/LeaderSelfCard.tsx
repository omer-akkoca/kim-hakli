import React from 'react';
import { Box, HStack } from '@/components/ui';
import { LOGO } from '@/assets';
import { AppCard } from '../ui/AppCard';
import { AppText } from '../ui/AppText';
import { CreditBadge } from '../ui/CreditBadge';
import { Image } from 'expo-image';
import { IAllTimeLeaderboardUserWithAvatarUrl } from '@/src/types';

interface LeaderSelfCardProps {
  profile: IAllTimeLeaderboardUserWithAvatarUrl;
}

const LeaderSelfCard: React.FC<LeaderSelfCardProps> = ({ profile }) => {
  const avatar = profile.avatar_path_url
    ? { uri: profile.avatar_path_url }
    : profile.avatar_url
      ? { uri: profile.avatar_url }
      : LOGO;

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
              {profile.order}
            </AppText>
          </Box>
          <Image
            source={avatar}
            contentFit="cover"
            cachePolicy="memory-disk"
            transition={200}
            recyclingKey={profile.id}
            style={{
              width: 42,
              height: 42,
              borderRadius: 99,
            }}
          />
          <AppText className="flex-1 text-headline" numberOfLines={1}>
            {profile?.full_name ?? ''}
          </AppText>
        </HStack>
        <CreditBadge credit={profile?.total_earned_credit ?? 0} withNumber />
      </HStack>
    </AppCard>
  );
};

export { LeaderSelfCard };
