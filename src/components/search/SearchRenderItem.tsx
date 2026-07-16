import React from 'react';
import { HStack, VStack } from '@/components/ui';
import { IStory } from '@/src/types';
import { AppText } from '../ui/AppText';
import { CreditBadge } from '../ui/CreditBadge';
import { useRouter } from 'expo-router';
import { AppIconButton } from '../ui/AppIconButton';
import { colors } from '@/src/constants';
import { useAppSelector } from '@/src/store';
import { useBookmark } from '@/src/hooks/useBookmark';
import { getCoverImageUrl } from '@/src/utils';
import { AppCard } from '../ui/AppCard';
import { Image } from 'expo-image';
interface SearchRenderItemProps {
  story: IStory;
}

const SearchRenderItem: React.FC<SearchRenderItemProps> = ({ story }) => {
  const { navigate } = useRouter();

  const { BookmarkIcon, toggleBookmark, loading } = useBookmark(story.id);

  const user = useAppSelector((state) => state.auth.user);

  const coverImage = getCoverImageUrl(story.id);

  return (
    <AppCard flex onPress={() => navigate(`/story/${story.id}`)}>
      <HStack space="md" className="flex-1">
        <Image
          source={coverImage}
          contentFit="cover"
          cachePolicy="memory-disk"
          transition={200}
          recyclingKey={story.id}
          className="w-32 h-32"
          style={{ width: 128, height: 128 }}
        />
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
            {user ? (
              <AppIconButton
                icon={BookmarkIcon}
                onPress={toggleBookmark}
                color={colors.headline}
                width={22}
                height={22}
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
