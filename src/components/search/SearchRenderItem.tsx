import React, { useCallback, useMemo } from 'react';
import { HStack, Image, LinearGradient, Pressable, VStack } from '@/components/ui';
import { BookmarkParams, IStory } from '@/src/types';
import { AppText } from '../ui/AppText';
import { CreditBadge } from '../ui/CreditBadge';
import { useRouter } from 'expo-router';
import { AppIconButton } from '../ui/AppIconButton';
import { BookmarkFillVector, BookmarkOutlineVector } from '@/assets';
import { colors } from '@/src/constants';
import { useAddBookmarkStory, useGetStoryCoverImageUrl, useRemoveBookmark } from '@/src/actions';
import { getIsBookmarked, useAppSelector } from '@/src/store';

interface SearchRenderItemProps {
  story: IStory;
}

const SearchRenderItem: React.FC<SearchRenderItemProps> = ({ story }) => {
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
      className="border border-white/5 rounded-3xl overflow-hidden"
      style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.18)' }}
    >
      <LinearGradient
        colors={['rgba(124,144,164,0.05)', 'rgba(124,144,164,0)']}
        locations={[0, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="flex-1"
      >
        <HStack space="md" className="flex-1">
          <Image source={{ uri: data }} className="w-32 h-32" alt={story.title} />
          <VStack className="flex-1 p-3 pl-0 justify-between">
            <AppText
              size={16}
              lineHeight={20}
              weight={600}
              className="text-headline -tracking-2"
              numberOfLines={1}
            >
              {story.title}
            </AppText>
            <AppText size={12} className="text-loginText" numberOfLines={2}>
              {story.description}
            </AppText>
            <HStack className="items-center justify-between">
              <CreditBadge credit={story.credit_cost} />
              <AppIconButton
                icon={BookmarkIcon}
                onPress={toggleBookmark}
                color={colors.headline}
                width={22}
                height={22}
                disabled={addPending || removePending}
              />
            </HStack>
          </VStack>
        </HStack>
      </LinearGradient>
    </Pressable>
  );
};

export { SearchRenderItem };
