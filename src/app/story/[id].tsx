import { useLocalSearchParams, useRouter } from 'expo-router';
import { ImageBackground, ActivityIndicator, View } from 'react-native';
import { useAppSelector } from '@/src/store';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Box,
  Text,
  Pressable,
  HStack,
  Spinner,
  Divider,
  VStack,
  Avatar,
  AvatarImage,
} from '@/components/ui/';
import {
  useCategories,
  useGetStoryById,
  useHasVoted,
  useIsStoryUnlocked,
  useUnlockStory,
} from '@/src/actions';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/src/constants';
import { Book6Vector, LeftChevronVector, LockCircleVector, VoteVector } from '@/assets';

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
        <ActivityIndicator color="white" />
      </Box>
    );
  }

  if (!story) return <></>;

  return (
    <View className="flex-1">
      <ImageBackground source={{ uri: story.coverImageUrl }} className="flex-1" resizeMode="cover">
        <View className="flex-1 bg-black/50 justify-end">
          <HStack
            className="w-full h-16 px-6 absolute items-center justify-between"
            style={{ left: 0, top: top }}
          >
            <Pressable className="w-12 h-12 justify-center items-center" onPress={router.back}>
              <LeftChevronVector width={36} height={36} color={colors.white} />
            </Pressable>
            <Box className="px-3 py-2 bg-primary rounded-full shadow-md">
              <Text className="text-white font-semibold tracking-wider">
                {story.creditCost === 0 ? 'Ücretsiz' : `${story.creditCost} Kredi`}
              </Text>
            </Box>
          </HStack>
          <LinearGradient colors={[colors.tranparent, colors.black]}>
            <VStack style={{ paddingBottom: bottom + 24 }} className="px-6">
              {/* Title */}
              <Text className="text-left text-3xl font-bold text-white mb-4">{story.title}</Text>
              {/* Category */}
              <Text className="uppercase text-white font-medium text-sm mb-2">
                {story.category.map((e) => getCategoryName(e)).join('  -  ')}
              </Text>
              {/* Description */}
              <Text className="text-white/75 pb-2 mb-2">{story.description}</Text>
              {/* Characters */}
              <HStack space="lg" className="mb-6">
                {story.sides.map((e, i) => (
                  <HStack key={i.toString()} space="sm" className="items-center">
                    <Avatar size="sm" className="border border-white">
                      <AvatarImage source={{ uri: e.photo }} />
                    </Avatar>
                    <Text className="text-white">{e.name}</Text>
                  </HStack>
                ))}
              </HStack>
              <Divider />
              {/* Action Buttons */}
              <View className="mt-6">
                {unlocked ? (
                  <HStack space="2xl">
                    <Pressable onPress={() => router.push(`/story/read/${id}`)} className="flex-1">
                      <Box className="h-14 bg-white justify-center rounded-lg">
                        <HStack space="sm" className="items-center justify-center">
                          <Book6Vector width={20} height={20} color={colors.headline} />
                          <Text className="text-headline text-lg font-semibold">Hikayeyi Oku</Text>
                        </HStack>
                      </Box>
                    </Pressable>
                    {voted ? (
                      <Pressable
                        onPress={() => router.push(`/story/voteResult/${id}`)}
                        className="flex-1"
                      >
                        <Box className="h-14 bg-white justify-center rounded-lg">
                          <HStack space="sm" className="items-center justify-center">
                            <Text className="text-headline text-lg font-semibold">
                              Oylamayı Gör
                            </Text>
                            <VoteVector width={20} height={20} color={colors.headline} />
                          </HStack>
                        </Box>
                      </Pressable>
                    ) : (
                      <></>
                    )}
                  </HStack>
                ) : (
                  <Pressable onPress={handleUnlockStory}>
                    <Box className="h-14 bg-white justify-center rounded-lg">
                      {status === 'pending' ? (
                        <Spinner size="small" color={colors.primary} />
                      ) : (
                        <HStack space="sm" className="items-center justify-center">
                          <LockCircleVector width={24} height={24} color={colors.headline} />
                          <Text className="text-headline text-lg font-semibold">
                            Hikaye Kilidini Aç
                          </Text>
                        </HStack>
                      )}
                    </Box>
                  </Pressable>
                )}
              </View>
            </VStack>
          </LinearGradient>
        </View>
      </ImageBackground>
    </View>
  );
}
