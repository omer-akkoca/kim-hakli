import React from 'react';
import { Box, HStack, LinearGradient, Pressable, VStack } from '@/components/ui';
import { colors, width } from '@/src/constants';
import { IStory } from '@/src/types';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { AppText } from '@/src/components/ui/AppText';
import { CreditBadge } from '../ui/CreditBadge';
import { AppIconButton } from '../ui/AppIconButton';
import { useAppSelector } from '@/src/store';
import { useBookmark } from '@/src/hooks/useBookmark';
import { AppSkeleton } from '../ui/AppSkeleton';
import { getCoverImageUrl } from '@/src/utils';

interface IStoryRenderItem {
  story: IStory;
  order: number;
}

const itemWidth = (width - 48 - 8) / 2;
const itemHeight = (itemWidth / 9) * 14;

const StoryRenderItem: React.FC<IStoryRenderItem> = ({ story, order }) => {
  const router = useRouter();

  const { BookmarkIcon, toggleBookmark, loading } = useBookmark(story.id);

  const user = useAppSelector((state) => state.auth.user);

  const coverImageUrl = getCoverImageUrl(story.id);

  return (
    <Pressable
      onPress={() => router.push(`/story/${story.id}`)}
      className="bg-background-500 border border-white/5 rounded-3xl overflow-hidden"
      style={{
        width: itemWidth,
        height: itemHeight,
        marginRight: order % 2 === 0 ? 8 : 0,
        boxShadow: '0 10px 30px rgba(0,0,0,0.22)',
      }}
    >
      <Image
        source={coverImageUrl}
        contentFit="cover"
        cachePolicy="memory-disk"
        transition={200}
        recyclingKey={story.id}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
      />
      <LinearGradient
        colors={['rgba(0,0,0,0.82)', 'rgba(0,0,0,0.18)', 'rgba(0,0,0,0.06)']}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        className="flex-1"
      >
        <LinearGradient
          colors={['rgba(124,144,164,0.05)', 'rgba(124,144,164,0)']}
          locations={[0, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="flex-1"
        >
          <VStack className="flex-1 p-4 justify-between">
            <HStack className="items-center justify-between">
              <CreditBadge credit={story.credit_cost} withBg />

              {user ? (
                <AppIconButton
                  icon={BookmarkIcon}
                  onPress={toggleBookmark}
                  className="w-9 h-9 bg-credit-bg items-center justify-center rounded-full border border-white/5"
                  color={colors.headline}
                  width={22}
                  height={22}
                  disabled={loading}
                />
              ) : null}
            </HStack>

            <AppText
              size={18}
              lineHeight={24}
              weight={600}
              className="text-headline -tracking-2"
              numberOfLines={3}
              adjustsFontSizeToFit
              minimumFontScale={0.75}
            >
              {story.title}
            </AppText>
          </VStack>
        </LinearGradient>
      </LinearGradient>
    </Pressable>
  );
};

const StorySkeletonItem: React.FC<{ order: number }> = ({ order }) => {
  return (
    <Box
      style={{
        width: itemWidth,
        height: itemHeight,
        marginRight: order % 2 === 0 ? 8 : 0,
        boxShadow: '0 10px 30px rgba(0,0,0,0.22)',
      }}
      className="bg-background-500 border border-white/5 rounded-3xl overflow-hidden"
    >
      <AppSkeleton />
    </Box>
  );
};

export { StoryRenderItem, StorySkeletonItem };
