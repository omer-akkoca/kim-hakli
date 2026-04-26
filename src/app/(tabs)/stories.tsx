import { View, FlatList, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Badge,
  BadgeText,
  Box,
  Center,
  Image,
  Pressable,
  Text,
  HStack,
  VStack,
} from '@/components/ui';
import { ICategory, IStory } from '@/src/types';
import { useCategories, useStories } from '@/src/actions';
import { useState } from 'react';

export default function StoriesPage() {
  const { top } = useSafeAreaInsets();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const { data: stories, isLoading } = useStories(selectedCategories);
  const { data: categories } = useCategories();

  const handleOnClickCategory = (category: ICategory) => {
    if (selectedCategories.includes(category.key)) {
      setSelectedCategories((last) => last.filter((key) => key !== category.key));
    } else {
      setSelectedCategories((last) => [...last, category.key]);
    }
  };

  return (
    <View className="flex-1">
      {/* App Bar */}
      <Box style={{ height: top }} />
      <View className="">
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="px-6 gap-6"
          renderItem={({ item }) => {
            const selected = selectedCategories.includes(item.key);
            return (
              <Pressable onPress={() => handleOnClickCategory(item)}>
                <Badge
                  size="lg"
                  variant={'outline'}
                  action="muted"
                  className={
                    'rounded-md' + ` ${selected ? 'bg-primary-500 border-primary-700' : 'bg-white'}`
                  }
                >
                  <BadgeText className={`${selected ? 'text-white' : 'text-black'}`}>
                    {item.name}
                  </BadgeText>
                </Badge>
              </Pressable>
            );
          }}
        />
      </View>
      <View className="flex-1">
        {isLoading ? (
          <Center className="flex-1">
            <ActivityIndicator size={'large'} />
          </Center>
        ) : (
          <FlatList
            data={stories}
            keyExtractor={(item) => item.id}
            renderItem={RenderItem}
            showsVerticalScrollIndicator={false}
            contentContainerClassName="py-6 gap-6 mx-6"
            ListEmptyComponent={
              <View className="mt-10 items-center">
                <Text className="text-base text-gray-500">Henüz hikaye bulunmuyor.</Text>
              </View>
            }
          />
        )}
      </View>
    </View>
  );
}

const RenderItem = ({ item }: { item: IStory }) => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(`/story/${item.id}`)}
      className="overflow-hidden rounded-xl p-4 shadow-md bg-white"
    >
      <HStack className="gap-4">
        <Image
          source={{ uri: item.coverImageUrl }}
          className="w-36 h-24 rounded-xl"
          alt={item.title}
        />
        <VStack className="flex-1 h-24">
          <Text bold numberOfLines={1}>
            {item.title}
          </Text>
          <Text numberOfLines={3} ellipsizeMode="tail">
            {item.description}
          </Text>
        </VStack>
      </HStack>
    </Pressable>
  );
};
