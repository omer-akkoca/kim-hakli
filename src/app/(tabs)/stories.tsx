import { useEffect, useState } from 'react';
import { View, Pressable, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { IStory } from '@/src/types/story';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Box, Text } from '@/components/ui';
import { HStack } from '@gluestack-ui/nativewind';
import { getStories } from '@/src/services';

export default function StoriesPage() {
  const router = useRouter();
  const { top } = useSafeAreaInsets();

  const [data, setData] = useState<IStory[]>([]);

  useEffect(() => {
    const bootGetStories = async () => {
      const stories = await getStories();
      if (stories) {
        setData(stories);
      }
    };

    bootGetStories();
  }, []);

  const renderItem = ({ item }: { item: IStory }) => {
    return (
      <Pressable
        onPress={() => router.push(`/story/${item.id}`)}
        className="mb-4 overflow-hidden rounded-2xl bg-white"
        style={{
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 4 },
          elevation: 3,
        }}
      >
        <Image source={{ uri: item.coverImageUrl }} className="h-52 w-full" resizeMode="cover" />
        <Box className="p-4">
          <HStack className="flex-row mb-2 items-center justify-between">
            <Text className="flex-1 pr-3 text-xl font-bold text-black">{item.title}</Text>
          </HStack>
          <Text className="mb-3 text-sm leading-5 text-gray-600">{item.description}</Text>
        </Box>
      </Pressable>
    );
  };

  return (
    <Box className="flex-1 bg-[#F8F8F8] px-5" style={{ paddingTop: top }}>
      <Text className="mb-5 text-3xl font-bold text-black">Hikayeler</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.slug}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 24,
        }}
        ListEmptyComponent={
          <View className="mt-10 items-center">
            <Text className="text-base text-gray-500">Henüz hikaye bulunmuyor.</Text>
          </View>
        }
      />
    </Box>
  );
}
