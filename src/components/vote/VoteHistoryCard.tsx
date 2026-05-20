import React from 'react';
import { Image as RnImage } from 'react-native';
import { HStack, VStack } from '@/components/ui';
import { VoteHistory } from '@/src/types';
import { AppText } from '../ui/AppText';
import { CalendarVector, UsersVector } from '@/assets';
import { colors } from '@/src/constants';
import { timeAgo } from '@/src/utils';
import { useGetStoryCoverImageUrl } from '@/src/actions';
import { useRouter } from 'expo-router';
import { AppCard } from '../ui/AppCard';

interface VoteHistoryCardProps {
  voteHistory: VoteHistory;
}

const VoteHistoryCard: React.FC<VoteHistoryCardProps> = ({ voteHistory }) => {
  const { navigate } = useRouter();

  const { data } = useGetStoryCoverImageUrl({ path: voteHistory.cover_image_path });

  return (
    <AppCard onPress={() => navigate(`/story/voteResult/${voteHistory.story_id}`)}>
      <HStack space="lg" className="p-4">
        {data ? (
          <RnImage
            source={{ uri: data }}
            style={{ width: 54, height: 96 }}
            className="rounded-md"
          />
        ) : null}
        <VStack space="sm" className="flex-1">
          <AppText
            size={16}
            lineHeight={22}
            weight={600}
            className="text-headline -tracking-2"
            numberOfLines={1}
          >
            {voteHistory.story_title}
          </AppText>
          <AppText size={12} lineHeight={18} className="text-whiteSmoke-500/75">
            Sen{' '}
            <AppText size={12} lineHeight={18} className="text-primary-500" weight={500}>
              {voteHistory.side_title}
            </AppText>{' '}
            tarafını seçtin
          </AppText>
          <HStack space="sm" className="items-center">
            <UsersVector width={14} height={14} color={colors.whiteSmoke_50} />
            <AppText size={12} lineHeight={14} className="flex-1 text-whiteSmoke-500/50">
              Topluluk{' '}
              <AppText size={12} lineHeight={14} className="text-primary-500">
                {voteHistory.same_vote_percentage}% {voteHistory.side_title}
              </AppText>{' '}
              dedi.
            </AppText>
          </HStack>
          <HStack space="sm">
            <CalendarVector width={14} height={14} color={colors.whiteSmoke_50} />
            <AppText size={12} lineHeight={14} className="flex-1 text-whiteSmoke-500/50">
              {timeAgo(voteHistory.voted_at)}
            </AppText>
          </HStack>
        </VStack>
      </HStack>
    </AppCard>
  );
};

export { VoteHistoryCard };
