import React from 'react';
import { Image } from 'expo-image';
import { usePathname, useRouter } from 'expo-router';
import { HStack, VStack } from '@/components/ui';
import { IStory } from '@/src/types';
import { setToStoryDetail, useAppDispatch, useAppSelector } from '@/src/store';
import { useBookmark } from '@/src/hooks';
import { getCoverImageUrl } from '@/src/utils';
import { AppIconButton, AppCard, CreditBadge, AppText } from '../ui';
interface SearchRenderItemProps {
  story: IStory;
}

const SearchRenderItem: React.FC<SearchRenderItemProps> = ({ story }) => {
  const { push } = useRouter();
  const pathName = usePathname();
  const dispatch = useAppDispatch();

  const { BookmarkIcon, toggleBookmark, loading } = useBookmark(story.id);

  const user = useAppSelector((state) => state.auth.user);

  const coverImage = getCoverImageUrl(story.id);

  const handleRoute = () => {
    dispatch(setToStoryDetail(pathName));
    push(`/story/${story.id}`);
  };

  return (
    <AppCard onPress={handleRoute}>
      <HStack space="md">
        <Image
          source={coverImage}
          contentFit="cover"
          cachePolicy="memory-disk"
          transition={200}
          recyclingKey={story.id}
          className="w-32 h-32"
          style={{ width: 128, height: 128 }}
          blurRadius={story.status !== 'published' ? 3 : undefined}
        />
        <VStack className="flex-1 p-3 pl-0 justify-between">
          <AppText
            size={16}
            lineHeight={20}
            weight={600}
            color="headline"
            className="-tracking-2"
            numberOfLines={1}
          >
            {story.title}
          </AppText>
          <AppText size={12} color="headline_82" numberOfLines={2}>
            {story.description}
          </AppText>
          <HStack className="items-center justify-between">
            <CreditBadge credit={story.credit_cost} color="reversed_headline" />
            {user ? (
              <AppIconButton
                icon={BookmarkIcon}
                onPress={toggleBookmark}
                color={'headline'}
                size={22}
                disabled={loading}
              />
            ) : null}
          </HStack>
        </VStack>
      </HStack>
    </AppCard>
  );
};

export { SearchRenderItem };
