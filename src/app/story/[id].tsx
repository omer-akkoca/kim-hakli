import { useLocalSearchParams, useRouter } from 'expo-router';
import { ImageBackground, ActivityIndicator } from 'react-native';
import { useAppSelector } from '@/src/store';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Box, Text, Pressable } from '@/components/ui/';
import { useGetStoryById, useHasVoted, useIsStoryUnlocked, useUnlockStory } from '@/src/actions';
import { useMemo } from 'react';

export default function StoryDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const { data: story, isLoading } = useGetStoryById(id);
  const { data: unlocked } = useIsStoryUnlocked(user?.id ?? '', id);
  const { data: voted } = useHasVoted(user?.id ?? '', id);

  const totalVotes = useMemo(
    () => (story ? Object.values(story.votes).reduce((sum, v) => sum + v, 0) : 0),
    [story],
  );

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

  if (isLoading) {
    return (
      <Box className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator color="white" />
      </Box>
    );
  }

  if (!story) return <></>;

  return (
    <Box className="flex-1">
      <ImageBackground source={{ uri: story.coverImageUrl }} className="flex-1" resizeMode="cover">
        <Box className="flex-1" style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}>
          <Pressable
            onPress={() => router.back()}
            className="absolute left-5 z-10"
            style={{ top: insets.top + 12 }}
          >
            <Box
              className="items-center justify-center rounded-full"
              style={{ width: 36, height: 36, backgroundColor: 'rgba(255,255,255,0.15)' }}
            >
              <AntDesign name="arrow-left" size={18} color="white" />
            </Box>
          </Pressable>

          <Box
            className="absolute bottom-0 left-0 right-0 p-5"
            style={{ paddingBottom: insets.bottom + 24 }}
          >
            <Box className="mb-3 self-start rounded-full bg-orange-500 px-3 py-1">
              <Text className="text-xs font-semibold text-white">
                {story.creditCost === 0 ? 'Ücretsiz' : `${story.creditCost} kredi`}{' '}
              </Text>
            </Box>

            <Text className="mb-2 text-2xl font-bold text-white" style={{ letterSpacing: -0.3 }}>
              {story.title}
            </Text>

            <Text className="mb-4 text-sm leading-5" style={{ color: 'rgba(255,255,255,0.65)' }}>
              {story.description}
            </Text>

            <Box className="mb-3 flex-row flex-wrap gap-2">
              {story.sides.map((side, index) => (
                <Box
                  key={index}
                  className="rounded-full px-3 py-1"
                  style={{
                    borderWidth: 1.5,
                    borderColor: 'rgba(255,255,255,0.3)',
                    backgroundColor: 'rgba(255,255,255,0.08)',
                  }}
                >
                  <Text className="text-xs font-medium text-white">{side.name}</Text>
                </Box>
              ))}
            </Box>

            <Box className="mb-5 flex-row items-center gap-4">
              <Text className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
                {totalVotes} oy
              </Text>
            </Box>

            <Box className="flex-row gap-4">
              {unlocked ? (
                <>
                  <Pressable
                    onPress={() => router.push(`/story/read/${id}`)}
                    className="flex-1 flex-row items-center justify-center gap-2 rounded-2xl bg-white py-4"
                  >
                    <Text className="text-base font-bold text-black">Hikayeyi Oku</Text>
                    <AntDesign name="read" size={16} color="black" />
                  </Pressable>
                  {voted ? (
                    <Pressable
                      onPress={() => router.push(`/story/voteResult/${id}`)}
                      className="flex-1 flex-row items-center justify-center gap-2 rounded-2xl bg-white py-4"
                    >
                      <Text className="text-base font-bold text-black">Oylamayı Gör</Text>
                      <MaterialCommunityIcons name="vote" size={24} color="black" />
                    </Pressable>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <Pressable
                  onPress={handleUnlockStory}
                  className="flex-1 flex-row items-center justify-center gap-2 rounded-2xl bg-white py-4"
                >
                  {status === 'pending' ? (
                    <ActivityIndicator color={'black'} size={'small'} />
                  ) : (
                    <>
                      <Text className="text-base font-bold text-black">Hikaye Kilidini Aç</Text>
                      <AntDesign name="lock" size={16} color="black" />
                    </>
                  )}
                </Pressable>
              )}
            </Box>
          </Box>
        </Box>
      </ImageBackground>
    </Box>
  );
}
