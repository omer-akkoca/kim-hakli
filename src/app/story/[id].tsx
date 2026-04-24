import { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ImageBackground, ActivityIndicator } from 'react-native';
import { useAppSelector } from '@/src/store';
import { AntDesign } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getStoryById } from '@/src/services/firestore';
import { IStory } from '@/src/types';
import { Box, Text, Pressable } from '@/components/ui/';
import { unlockStoryFunction } from '@/src/services';

export default function StoryDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [story, setStory] = useState<IStory>();

  useEffect(() => {
    const bootGetStoryById = async () => {
      const data = await getStoryById(id);
      if (data) {
        setStory(data);
      }
    };
    bootGetStoryById();
  }, [id]);

  if (!story) {
    return (
      <Box className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator color="white" />
      </Box>
    );
  }

  const totalVotes = Object.values(story.votes).reduce((sum, v) => sum + v, 0);

  const handleReadStory = async () => {
    if (!isAuthenticated) {
      router.push(`/auth/login?redirect=/story/read/${id}` as any);
      return;
    }

    const result = await unlockStoryFunction({ storyId: id });
    if (result.data.success) {
      router.push(`/story/read/${id}` as any);
    }

  };

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
              <Text className="text-xs font-semibold text-white">{story.creditCost} kredi</Text>
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

            <Pressable
              onPress={handleReadStory}
              className="flex-row items-center justify-center gap-2 rounded-2xl bg-white py-4"
            >
              <Text className="text-base font-bold text-black">Hikayeyi oku</Text>
              <Box
                className="items-center justify-center rounded-full bg-black"
                style={{ width: 18, height: 18 }}
              >
                <AntDesign name="arrow-right" size={10} color="white" />
              </Box>
            </Pressable>
          </Box>
        </Box>
      </ImageBackground>
    </Box>
  );
}
