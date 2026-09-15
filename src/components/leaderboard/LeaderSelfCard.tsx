import React from 'react';
import { Image } from 'expo-image';
import { CreditVector, LOGO } from '@/assets';
import { Box, HStack } from '@/components/ui';
import { IAllTimeLeaderboardUserWithAvatarUrl } from '@/src/types';
import { useTheme } from '@/src/hooks';
import { AppCard, AppText } from '../ui';
interface LeaderSelfCardProps {
  profile: IAllTimeLeaderboardUserWithAvatarUrl;
}

const LeaderSelfCard: React.FC<LeaderSelfCardProps> = ({ profile }) => {
  const { colors } = useTheme();

  const avatar = profile.avatar_path_url
    ? { uri: profile.avatar_path_url }
    : profile.avatar_url
      ? { uri: profile.avatar_url }
      : LOGO;

  return (
    <AppCard style={{ borderWidth: 1.75, borderColor: colors.primary }}>
      <HStack space="md" className="px-4 py-2 items-center">
        <HStack space="sm" className="flex-1 items-center">
          <Box className="w-10">
            <AppText
              size={16}
              weight={600}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.75}
              color="headline"
              className="w-full text-center"
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
          <AppText color="headline" weight={500} className="flex-1" numberOfLines={1}>
            {profile?.full_name ?? ''}
          </AppText>
        </HStack>
        <HStack space="sm" className="items-center">
          <CreditVector width={14} height={14} />
          <AppText size={12} lineHeight={14} weight={600} color="headline">
            {profile.total_earned_credit}
          </AppText>
        </HStack>
      </HStack>
    </AppCard>
  );
};

export { LeaderSelfCard };
