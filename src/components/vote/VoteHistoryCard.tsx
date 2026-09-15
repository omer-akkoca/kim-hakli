import React from 'react';
import { useDispatch } from 'react-redux';
import { Image } from 'expo-image';
import { usePathname, useRouter } from 'expo-router';
import { CalendarVector, UsersVector } from '@/assets';
import { HStack, VStack } from '@/components/ui';
import { VoteHistory } from '@/src/types';
import { getCoverImageUrl, timeAgo } from '@/src/utils';
import { setToStoryDetail } from '@/src/store';
import { useTheme } from '@/src/hooks';
import { AppCard, AppText } from '../ui';

interface VoteHistoryCardProps {
  voteHistory: VoteHistory;
}

const VoteHistoryCard: React.FC<VoteHistoryCardProps> = ({ voteHistory }) => {
  const { colors } = useTheme();
  const { navigate } = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch();

  const coverImage = getCoverImageUrl(voteHistory.story_id);

  const handleRoute = () => {
    dispatch(setToStoryDetail(pathName));
    navigate(`/story/voteResult/${voteHistory.story_id}`);
  };

  return (
    <AppCard onPress={handleRoute}>
      <HStack space="lg" className="p-4">
        <Image
          source={coverImage}
          contentFit="cover"
          cachePolicy="memory-disk"
          transition={200}
          recyclingKey={voteHistory.story_id}
          style={{ width: 54, height: 96 }}
        />
        <VStack space="sm" className="flex-1">
          <AppText
            size={16}
            lineHeight={22}
            weight={600}
            color="headline"
            className="-tracking-2"
            numberOfLines={1}
          >
            {voteHistory.story_title}
          </AppText>
          <AppText size={12} lineHeight={18} color="headline_75">
            Sen{' '}
            <AppText size={12} lineHeight={18} color="primary" weight={500}>
              {voteHistory.side_title}
            </AppText>{' '}
            tarafını seçtin
          </AppText>
          <HStack space="sm" className="items-center">
            <UsersVector width={14} height={14} color={colors.headline_50} />
            <AppText size={12} lineHeight={14} color="headline_50" className="flex-1">
              Topluluk{' '}
              <AppText size={12} lineHeight={14} color="primary">
                {voteHistory.same_vote_percentage}% {voteHistory.side_title}
              </AppText>{' '}
              dedi.
            </AppText>
          </HStack>
          <HStack space="sm">
            <CalendarVector width={14} height={14} color={colors.headline_50} />
            <AppText size={12} lineHeight={14} color="headline_50" className="flex-1">
              {timeAgo(voteHistory.voted_at)}
            </AppText>
          </HStack>
        </VStack>
      </HStack>
    </AppCard>
  );
};

export { VoteHistoryCard };
