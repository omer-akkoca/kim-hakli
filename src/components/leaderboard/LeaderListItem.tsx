import React, { useCallback } from 'react';
import { CreditVector, LOGO } from '@/assets';
import { Box, HStack } from '@/components/ui';
import { useAuth } from '@/src/hooks';
import { AppText } from '../ui/AppText';
import { LeaderSelfCard } from './LeaderSelfCard';
import { IAllTimeLeaderboardUserWithAvatarUrl } from '@/src/types';
import { Image } from 'expo-image';

interface LeaderListItemProps {
  profile: IAllTimeLeaderboardUserWithAvatarUrl;
  order: number;
}

const LeaderListItem: React.FC<LeaderListItemProps> = ({ profile, order }) => {
  const { user } = useAuth();

  const avatar = profile.avatar_path_url
    ? { uri: profile.avatar_path_url }
    : profile.avatar_url
      ? { uri: profile.avatar_url }
      : LOGO;

  const renderContent = useCallback(() => {
    return (
      <HStack space="md" className="items-center">
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
              {order}
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
            {profile.full_name}
          </AppText>
        </HStack>
        <HStack space="sm" className="items-center">
          <CreditVector width={14} height={14} />
          <AppText size={12} lineHeight={14} weight={600} className="text-headline">
            {profile.total_earned_credit}
          </AppText>
        </HStack>
      </HStack>
    );
  }, []);

  if (user?.id === profile.id) return <LeaderSelfCard profile={profile} />;

  return renderContent();
};

export { LeaderListItem };
