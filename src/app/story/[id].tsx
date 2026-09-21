import React from 'react';
import { Box, HStack, VStack } from '@/components/ui/';
import {
  AppBackground,
  AppIconButton,
  AppLoading,
  AppText,
  CreditBadge,
  DetailActionButton,
  StoryDetailBg,
} from '@/src/components';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAppSelector } from '@/src/store';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGetStoryById, useGetStoryCategories, useStoryAccess } from '@/src/actions';
import { LeftChevronVector, ShareVector } from '@/assets';
import { useAuth, useBookmark, useTheme } from '@/src/hooks';
import { getCoverImageUrl, handleShareStory, preventWordBreak } from '@/src/utils';

export default function StoryDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { back, canGoBack, replace } = useRouter();
  const { colors } = useTheme();
  const { bottom, top } = useSafeAreaInsets();
  const { BookmarkIcon, toggleBookmark, loading } = useBookmark(id);
  const { user } = useAuth();
  const { categories } = useAppSelector((state) => state.category);

  const { data: story, isLoading } = useGetStoryById(id);
  const { data: storyCategories } = useGetStoryCategories(id);
  const { data: storyAccess, isLoading: isStoryAccessLoading } = useStoryAccess({
    storyId: id,
    userId: user?.id,
  });

  const getCategoryName = (key: string) => {
    const category = categories?.find((e) => e.code === key);
    return category?.name ?? '';
  };

  const handleBack = () => {
    if (canGoBack()) {
      back();
    } else {
      replace('/');
    }
  };

  if (isLoading || isStoryAccessLoading) {
    return (
      <AppBackground>
        <AppLoading fullScreen />
      </AppBackground>
    );
  }

  if (!story) return <></>;

  const coverImage = getCoverImageUrl(story.id);
  const storyTitle = preventWordBreak(story.title);

  return (
    <StoryDetailBg coverImage={coverImage}>
      <Box className="flex-1">
        <HStack
          className="w-full items-center justify-between"
          style={{ marginTop: top + 24, paddingHorizontal: 24 }}
        >
          <AppIconButton icon={LeftChevronVector} onPress={handleBack} color="title" withBg />
          <HStack space="md">
            {user ? (
              <AppIconButton
                icon={BookmarkIcon}
                onPress={toggleBookmark}
                disabled={loading}
                color="title"
                withBg
              />
            ) : null}
            <AppIconButton
              icon={ShareVector}
              onPress={() => handleShareStory(story)}
              color="title"
              withBg
            />
          </HStack>
        </HStack>
        <Box
          className="flex-1 justify-end"
          style={{ paddingHorizontal: 24, paddingBottom: bottom + 24 }}
        >
          <Box className="relative">
            {/* Title */}
            <AppText
              family="PlayfairDisplay"
              size={46}
              lineHeight={56}
              weight={700}
              color="title"
              className="w-3/4 -tracking-4"
              style={{
                textShadowColor: 'rgba(0,0,0,0.34)',
                textShadowOffset: { width: 0, height: 4 },
                textShadowRadius: 18,
              }}
              numberOfLines={3}
              adjustsFontSizeToFit
              minimumFontScale={0.9}
            >
              {storyTitle}
            </AppText>
            <Box className="absolute right-0 bottom-0 h-14 justify-center">
              <CreditBadge credit={story.credit_cost} withBg />
            </Box>
          </Box>
          {/* Description */}
          <AppText
            size={14}
            lineHeight={24}
            weight={400}
            color="title_82"
            className="w-5/6 -tracking-widest mt-5"
          >
            {story.description}
          </AppText>
          {/* Categories */}
          <VStack space="lg" className="mt-9">
            <AppText weight={600} color="title" className="tracking-8">
              Kategoriler
            </AppText>
            <HStack space="md" className="flex-wrap">
              {storyCategories
                ? storyCategories.map((e, i) => (
                    <Box
                      key={i.toString()}
                      className="px-4 py-2 border rounded-full"
                      style={{
                        backgroundColor: colors.categoryBadgeBg,
                        borderColor: colors.primary,
                      }}
                    >
                      <AppText
                        size={12}
                        lineHeight={16}
                        weight={500}
                        color="title"
                        className="capitalize"
                      >
                        {getCategoryName(e.code)}
                      </AppText>
                    </Box>
                  ))
                : null}
            </HStack>
          </VStack>
          <HStack space="lg" className="mt-10">
            <DetailActionButton story={story} storyAccess={storyAccess} />
          </HStack>
        </Box>
      </Box>
    </StoryDetailBg>
  );
}
