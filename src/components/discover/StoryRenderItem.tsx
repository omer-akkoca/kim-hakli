import React, { memo } from 'react';
import { Platform } from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Box, HStack, LinearGradient, Pressable, VStack } from '@/components/ui';
import { width } from '@/src/constants';
import { IStory } from '@/src/types';
import { setToStoryDetail, useAppDispatch, useAppSelector } from '@/src/store';
import { useBookmark } from '@/src/hooks/useBookmark';
import { getCoverImageUrl } from '@/src/utils';
import { useTheme } from '@/src/hooks';
import { AppIconButton, AppSkeleton, CreditBadge, AppText } from '../ui';

interface IStoryRenderItem {
  story: IStory;
  order: number;
}

const itemWidth = (width - 48 - 8) / 2;
const itemHeight = (itemWidth / 9) * 14;
const completedBlur = Platform.OS === 'ios' ? 10 : 3;

const StoryRenderItemComponent: React.FC<IStoryRenderItem> = ({ story, order }) => {
  const { colors } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const { BookmarkIcon, toggleBookmark, loading } = useBookmark(story.id);

  const user = useAppSelector((state) => state.auth.user);

  const coverImageUrl = getCoverImageUrl(story.id);

  const handleRoute = () => {
    dispatch(setToStoryDetail(pathname));
    router.push(`/story/${story.id}`);
  };

  return (
    <Pressable
      onPress={handleRoute}
      className="rounded-3xl overflow-hidden"
      style={{
        width: itemWidth,
        height: itemHeight,
        marginRight: order % 2 === 0 ? 8 : 0,
        boxShadow: colors.shadow,
        backgroundColor: colors.background,
        borderWidth: 1.75,
        borderColor: colors.white_5,
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
        blurRadius={story.status === 'completed' ? completedBlur : undefined}
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
              {story.status !== 'completed' ? (
                <CreditBadge credit={story.credit_cost} withBg />
              ) : (
                <Box />
              )}
              {user ? (
                <AppIconButton
                  icon={BookmarkIcon}
                  onPress={toggleBookmark}
                  color={'title'}
                  size={24}
                  buttonSize={40}
                  disabled={loading}
                  withBg
                />
              ) : null}
            </HStack>
            <AppText
              size={18}
              lineHeight={24}
              weight={600}
              color="title"
              className="-tracking-2"
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

const StoryRenderItem = memo(StoryRenderItemComponent);

const StorySkeletonItem: React.FC<{ order: number }> = ({ order }) => {
  const { colors } = useTheme();
  return (
    <Box
      style={{
        width: itemWidth,
        height: itemHeight,
        marginRight: order % 2 === 0 ? 8 : 0,
        boxShadow: colors.shadow,
        backgroundColor: colors.background,
        borderColor: colors.white_5,
      }}
      className="border rounded-3xl overflow-hidden"
    >
      <AppSkeleton />
    </Box>
  );
};

export { StoryRenderItem, StorySkeletonItem };
