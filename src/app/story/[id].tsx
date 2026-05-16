import React from 'react';
import { Box, HStack, Spinner, VStack } from '@/components/ui/';
import {
  AppText,
  CreditBadge,
  DetailIconButton,
  DetailPrimaryButton,
  DetailSecondaryButton,
  StoryDetailBg,
} from '@/src/components';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAppSelector } from '@/src/store';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  useGetStoryById,
  useGetStoryCategories,
  useGetStoryCoverImageUrl,
  useUnlockStory,
} from '@/src/actions';
import {
  Book6Vector,
  BookmarkOutlineVector,
  ChartVector,
  LeftChevronVector,
  LockCircleVector,
  LoopVector,
} from '@/assets';

export default function StoryDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { bottom, top } = useSafeAreaInsets();

  const { user } = useAppSelector((state) => state.auth);
  const { categories } = useAppSelector((state) => state.category);

  const { data: story, isLoading } = useGetStoryById(id);
  const { data: coverImage } = useGetStoryCoverImageUrl({ path: story?.cover_image_path ?? '' });
  const { data: storyCategories } = useGetStoryCategories(id);

  const unlocked = false;
  const voted = false;

  const { mutate } = useUnlockStory();

  const handleUnlockStory = async () => {
    if (!user) {
      router.push(`/auth/login?redirect=/story/read/${id}` as any);
      return;
    }
    mutate(
      { storyId: id },
      {
        onSuccess: ({ data }) => {
          if (data.success) {
            router.push(`/story/read/${id}`);
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
      <Box className="flex-1 items-center justify-center bg-black">
        <Spinner color="white" />
      </Box>
    );
  }

  if (!story) return <></>;

  return (
    <StoryDetailBg coverImage={coverImage ?? ''}>
      <Box className="flex-1">
        <HStack
          className="w-full items-center justify-between"
          style={{ marginTop: top, paddingHorizontal: 24 }}
        >
          <DetailIconButton icon={LeftChevronVector} onPress={router.back} />
          <DetailIconButton icon={BookmarkOutlineVector} onPress={() => null} />
        </HStack>
        <Box
          className="flex-1 justify-end"
          style={{ paddingHorizontal: 24, paddingBottom: bottom + 24 }}
        >
          <Box className="relative">
            {/* Title */}
            <AppText
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
            {unlocked ? (
              <>
                <DetailPrimaryButton
                  icon={voted ? LoopVector : Book6Vector}
                  label={voted ? 'Tekrar Oku' : 'Hikayeyi Oku'}
                  onPress={() => router.push(`/story/read/${id}`)}
                />
                {voted ? (
                  <DetailSecondaryButton
                    icon={ChartVector}
                    label={'Sonuçları Gör'}
                    onPress={() => router.push(`/story/voteResult/${id}`)}
                  />
                ) : null}
              </>
            ) : (
              <DetailPrimaryButton
                icon={LockCircleVector}
                label="Hikaye Kilidini Aç"
                onPress={handleUnlockStory}
              />
            )}
          </HStack>
        </Box>
      </Box>
    </StoryDetailBg>
  );
}
