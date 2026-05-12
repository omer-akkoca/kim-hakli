import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAppSelector } from '@/src/store';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Box, HStack, Spinner, VStack } from '@/components/ui/';
import {
  useCategories,
  useGetStoryById,
  useHasVoted,
  useIsStoryUnlocked,
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
import {
  AppText,
  CreditBadge,
  DetailIconButton,
  DetailPrimaryButton,
  DetailSecondaryButton,
  StoryDetailBg,
} from '@/src/components';

export default function StoryDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { bottom, top } = useSafeAreaInsets();

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const { data: categories } = useCategories();
  const { data: story, isLoading } = useGetStoryById(id);
  const { data: unlocked } = useIsStoryUnlocked(user?.id ?? '', id);
  const { data: voted } = useHasVoted(user?.id ?? '', id);

  const { mutate, status } = useUnlockStory();

  const handleUnlockStory = async () => {
    if (!isAuthenticated) {
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
    const category = categories?.find((e) => e.key === key);
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
    <StoryDetailBg coverImage={story.coverImageUrl}>
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
              <CreditBadge credit={story.creditCost} withBg />
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
              {story.category.map((e, i) => (
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
                    {getCategoryName(e)}
                  </AppText>
                </Box>
              ))}
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
