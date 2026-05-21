import React, { useCallback, useMemo } from 'react';
import { ImageBackground } from 'react-native';
import { HStack, LinearGradient, Pressable, VStack } from '@/components/ui';
import { colors, width } from '@/src/constants';
import { BookmarkParams, IStory } from '@/src/types';
import { useRouter } from 'expo-router';
import { AppText } from '@/src/components/ui/AppText';
import { BookmarkFillVector, BookmarkOutlineVector } from '@/assets';
import { CreditBadge } from '../ui/CreditBadge';
import { AppIconButton } from '../ui/AppIconButton';
import { useAddBookmarkStory, useGetStoryCoverImageUrl, useRemoveBookmark } from '@/src/actions';
import { getIsBookmarked, useAppSelector } from '@/src/store';

interface IStoryRenderItem {
  story: IStory;
  order: number;
}

const itemWidth = (width - 48) / 2;
const itemHeight = (itemWidth / 9) * 14;

const StoryRenderItem: React.FC<IStoryRenderItem> = ({ story, order }) => {
  const router = useRouter();

  const user = useAppSelector((state) => state.auth.user);
  const isBookmarked = useAppSelector((state) => getIsBookmarked(state, story.id));

  const BookmarkIcon = useMemo(
    () => (isBookmarked ? BookmarkFillVector : BookmarkOutlineVector),
    [isBookmarked],
  );

  const { data } = useGetStoryCoverImageUrl({ path: story.cover_image_path });

  const { mutate: add, isPending: addPending } = useAddBookmarkStory();
  const { mutate: remove, isPending: removePending } = useRemoveBookmark();

  const toggleBookmark = useCallback(() => {
    const params: BookmarkParams = {
      storyId: story.id,
      userId: user?.id ?? '',
    };
    if (isBookmarked) {
      remove(params);
    } else {
      add(params);
    }
  }, [isBookmarked]);

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
      <ImageBackground source={{ uri: data }} className="flex-1">
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
                    disabled={addPending || removePending}
                  />
                ) : null}
              </HStack>
              <AppText
                size={18}
                lineHeight={24}
                weight={600}
                className="text-headline -tracking-2"
                numberOfLines={3}
              >
                {story.title}
              </AppText>
            </VStack>
          </LinearGradient>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
};

export { StoryRenderItem };
