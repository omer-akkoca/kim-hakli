import React from 'react';
import { Image as RnImage } from 'react-native';
import { Box, HStack, LinearGradient, Pressable, VStack } from '@/components/ui';
import { VoteHistory } from '@/src/types';
import { BlurView } from 'expo-blur';
import { AppText } from '../ui/AppText';
import { CalendarVector, UsersVector } from '@/assets';
import { colors } from '@/src/constants';
import { timeAgo } from '@/src/utils';
import { useGetStoryCoverImageUrl } from '@/src/actions';
import { useRouter } from 'expo-router';

interface VoteHistoryCardProps {
  voteHistory: VoteHistory;
}

const VoteHistoryCard: React.FC<VoteHistoryCardProps> = ({ voteHistory }) => {
  const { navigate } = useRouter();

  const { data } = useGetStoryCoverImageUrl({ path: voteHistory.cover_image_path });

  return (
    <Pressable
      onPress={() => navigate(`/story/voteResult/${voteHistory.story_id}`)}
      className="bg-background-500/75 rounded-xl border border-white/10 overflow-hidden disabled:opacity-50"
      style={{ boxShadow: '0 10px 24px rgba(0,0,0,0.24)' }}
    >
      <BlurView intensity={18} tint="dark" className="flex-1">
        <LinearGradient
          colors={['rgba(124,144,164,0.05)', 'rgba(124,144,164,0)']}
          locations={[0, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="flex-1"
        >
          <Box className="flex-1">
            <HStack space="lg" className="flex-1 p-4">
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
          </Box>
        </LinearGradient>
      </BlurView>
    </Pressable>
  );
};

export { VoteHistoryCard };
