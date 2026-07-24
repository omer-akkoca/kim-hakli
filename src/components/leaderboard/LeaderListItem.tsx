import React, { useCallback } from 'react';
import { LOGO } from '@/assets';
import { Avatar, AvatarImage, Box, HStack } from '@/components/ui';
import { ILeaderBoardProfile } from '@/src/types';
import { useAuth } from '@/src/hooks';
import { AppText } from '../ui/AppText';
import { CreditBadge } from '../ui/CreditBadge';
import { LeaderSelfCard } from './LeaderSelfCard';

interface LeaderListItemProps {
  profile: ILeaderBoardProfile;
  order: number;
}

const LeaderListItem: React.FC<LeaderListItemProps> = ({ profile, order }) => {
  const { user } = useAuth();

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
          <Avatar size="md">
            <AvatarImage source={profile.avatar ? { uri: profile.avatar } : LOGO} />
          </Avatar>
          <AppText className="flex-1 text-headline" numberOfLines={1}>
            {profile.full_name}
          </AppText>
        </HStack>
        <CreditBadge credit={profile.credit_count} />
      </HStack>
    );
  }, []);

  if (user?.id === profile.id) return <LeaderSelfCard rank={profile.order} />;

  return renderContent();
};

export { LeaderListItem };
