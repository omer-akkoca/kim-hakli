import React from 'react';
import { Box, HStack, VStack } from '@/components/ui/';
import {
  AppBackground,
  AppLoading,
  AppText,
  CreditBadge,
  DetailIconButton,
  DetailPrimaryButton,
  DetailSecondaryButton,
  StoryDetailBg,
} from '@/src/components';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { decreaseCredit, useAppSelector } from '@/src/store';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  useGetStoryById,
  useGetStoryCategories,
  useGetStoryCoverImageUrl,
  useHasUnlockedStory,
  useHasVoted,
  useUnlockStory,
} from '@/src/actions';
import {
  Book6Vector,
  ChartVector,
  LeftChevronVector,
  LockCircleVector,
  LoopVector,
} from '@/assets';
import { useBookmark, useModal } from '@/src/hooks';
import { useDispatch } from 'react-redux';

export default function StoryDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { push, back } = useRouter();
  const { bottom, top } = useSafeAreaInsets();
  const { show } = useModal();
  const { BookmarkIcon, toggleBookmark, loading } = useBookmark(id);
  const dispatch = useDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const { categories } = useAppSelector((state) => state.category);

  const { data: story, isLoading } = useGetStoryById(id);
  const { data: coverImage } = useGetStoryCoverImageUrl({ path: story?.cover_image_path ?? '' });
  const { data: storyCategories } = useGetStoryCategories(id);

  const { data: unlocked, isLoading: unclockedLoading } = useHasUnlockedStory({
    storyId: id,
    userId: user?.id,
  });
  const { data: voted, isLoading: votedLoading } = useHasVoted({
    userId: user?.id ?? '',
    storyId: id,
  });

  const { mutate } = useUnlockStory();

  const handleUnlockStory = async () => {
    if (!user) {
      show({
        title: 'Bu hikayenin devamı seni bekliyor',
        subtitle:
          'Hikayeyi okumaya devam etmek ve kimin tarafında olduğunu seçmek için giriş yapman gerekiyor.',
        buttons: [
          {
            label: 'Giriş Yap',
            onPress: () => push('/auth/login'),
          },
          {
            label: 'Daha Sonra',
          },
        ],
      });
      return;
    }
    mutate(
      { storyId: id },
      {
        onSuccess: ({ success }) => {
          if (success) {
            dispatch(decreaseCredit(story!.credit_cost));
            push(`/story/read/${id}`);
          }
        },
      },
    );
  };

  const getCategoryName = (key: string) => {
    const category = categories?.find((e) => e.code === key);
    return category?.name ?? '';
  };

  if (isLoading) {
    return (
      <AppBackground>
        <AppLoading fullScreen />
      </AppBackground>
    );
  }

  if (!story) return <></>;

  return (
    <StoryDetailBg coverImage={coverImage}>
      <Box className="flex-1">
        <HStack
          className="w-full items-center justify-between"
          style={{ marginTop: top, paddingHorizontal: 24 }}
        >
          <DetailIconButton icon={LeftChevronVector} onPress={back} />
          {user ? (
            <DetailIconButton icon={BookmarkIcon} onPress={toggleBookmark} disabled={loading} />
          ) : null}
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
              className="w-3/4 -tracking-4 text-headline"
              style={{
                textShadowColor: 'rgba(0,0,0,0.34)',
                textShadowOffset: { width: 0, height: 4 },
                textShadowRadius: 18,
              }}
            >
              {story.title}
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
            className="w-5/6 text-text -tracking-widest mt-5"
          >
            {story.description}
          </AppText>
          {/* Categories */}
          <VStack space="lg" className="mt-9">
            <AppText weight={600} className="text-text tracking-8">
              Kategoriler
            </AppText>
            <HStack space="md" className="flex-wrap">
              {storyCategories
                ? storyCategories.map((e, i) => (
                    <Box
                      key={i.toString()}
                      className="bg-background-500/50 border border-primary-500/90 px-4 py-2 rounded-full"
                    >
                      <AppText
                        size={12}
                        lineHeight={16}
                        weight={500}
                        className="text-loginText capitalize"
                      >
                        {getCategoryName(e.code)}
                      </AppText>
                    </Box>
                  ))
                : null}
            </HStack>
          </VStack>
          <HStack space="lg" className="mt-10">
            {!unclockedLoading && !votedLoading ? (
              unlocked ? (
                <>
                  <DetailPrimaryButton
                    icon={voted ? LoopVector : Book6Vector}
                    label={voted ? 'Tekrar Oku' : 'Hikayeyi Oku'}
                    onPress={() => push(`/story/read/${id}`)}
                  />
                  {voted ? (
                    <DetailSecondaryButton
                      icon={ChartVector}
                      label={'Sonuçları Gör'}
                      onPress={() => push(`/story/voteResult/${id}`)}
                    />
                  ) : null}
                </>
              ) : (
                <DetailPrimaryButton
                  icon={LockCircleVector}
                  label="Hikaye Kilidini Aç"
                  onPress={handleUnlockStory}
                />
              )
            ) : (
              <Box className="h-button" />
            )}
          </HStack>
        </Box>
      </Box>
    </StoryDetailBg>
  );
}
