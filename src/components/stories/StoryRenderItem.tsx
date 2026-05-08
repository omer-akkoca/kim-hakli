import React, { useState } from 'react';
import { ImageBackground } from 'react-native';
import { Box, HStack, LinearGradient, Pressable, VStack } from '@/components/ui';
import { colors, width } from '@/src/constants';
import { IStory } from '@/src/types';
import { useRouter } from 'expo-router';
import { AppText } from '@/src/components/ui/AppText';
import { formatStoryLikeCount, formatStoryVoteCount } from '@/src/utils';
import {
  BookmarkFillVector,
  BookmarkOutlineVector,
  HeartFillVector,
  HeartOutlineVector,
} from '@/assets';
import { AppIconButton } from '../ui/AppIconButton';

interface IStoryRenderItem {
  story: IStory;
  order: number;
}

const itemWidth = (width - 32 - 8) / 2;
const itemHeight = (itemWidth / 9) * 16;

const StoryRenderItem: React.FC<IStoryRenderItem> = ({ story, order }) => {
  const router = useRouter();

  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const price = story.creditCost === 0 ? 'Ücretsiz' : `${story.creditCost} Kredi`;
  const totalVotes = Object.values(story.votes).reduce((sum, vote) => sum + vote, 0);
  const likeCount = 0;

  const BookmarkIcon = isBookmarked ? BookmarkFillVector : BookmarkOutlineVector;
  const LikedIcon = isLiked ? HeartFillVector : HeartOutlineVector;

  return (
    <Pressable
      onPress={() => router.push(`/story/${story.id}`)}
      className="bg-background-500 border border-white/5 rounded-3xl overflow-hidden shadow-story-card"
      style={{
        width: itemWidth,
        height: itemHeight,
        marginRight: order % 2 === 0 ? 8 : 0,
        boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
      }}
    >
      <ImageBackground source={{ uri: story.coverImageUrl }} className="flex-1" resizeMode="cover">
        <Box className="flex-1 bg-background-500/10">
          <LinearGradient
            colors={['rgba(0,0,0,0.08)', 'rgba(0,0,0,0.18)', 'rgba(0,0,0,0.78)']}
            locations={[0, 0.57, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            className="flex-1 justify-end"
          >
            <VStack className="flex-1 p-3 justify-between">
              {/* Price and Bookmark */}
              <HStack className="items-center justify-between">
                <Box className="bg-black/75 rounded-lg px-2 py-0.5">
                  <AppText
                    size={10}
                    weight={700}
                    className={`${story.creditCost === 0 ? 'text-secondary-500' : 'text-primary-400'}`}
                  >
                    {price}
                  </AppText>
                </Box>
                <AppIconButton
                  icon={BookmarkIcon}
                  onPress={() => setIsBookmarked((prev) => !prev)}
                  width={20}
                  height={20}
                  color={colors.white}
                />
              </HStack>
              <VStack space="sm">
                {/* Title */}
                <AppText
                  size={20}
                  weight={700}
                  lineHeight={24}
                  className="text-text-500/95 -tracking-2"
                  numberOfLines={2}
                >
                  {story.title}
                </AppText>
                {/* Vote and Like Count */}
                <HStack className="items-center justify-between">
                  <AppText size={10} weight={500} className="text-text-500/75">
                    {formatStoryVoteCount(totalVotes)} Oy
                  </AppText>
                  <Pressable onPress={() => setIsLiked((prev) => !prev)}>
                    <HStack space="sm" className="items-center">
                      <LikedIcon width={14} height={14} color={colors.primary} />
                      <AppText size={10} weight={500} className="text-primary-400">
                        {formatStoryLikeCount(likeCount)}
                      </AppText>
                    </HStack>
                  </Pressable>
                </HStack>
              </VStack>
            </VStack>
          </LinearGradient>
        </Box>
      </ImageBackground>
    </Pressable>
  );
};

export { StoryRenderItem };
