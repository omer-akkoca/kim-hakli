import React from 'react';
import { Image as RnImage } from 'react-native';
import { Box, Pressable, Text, VStack } from '@/components/ui';
import { width } from '@/src/constants';
import { IStory } from '@/src/types';
import { useRouter } from 'expo-router';

interface IStoryRenderItem {
  item: IStory;
}

const itemSize = (width - 48 - 16) / 2;

const StoryRenderItem: React.FC<IStoryRenderItem> = ({ item }) => {
  const router = useRouter();

  const price = item.creditCost === 0 ? 'Ücretsiz' : `${item.creditCost} kredi`;

  return (
    <Pressable
      onPress={() => router.push(`/story/${item.id}`)}
      className="bg-white rounded-lg overflow-hidden shadow-md"
      style={{ width: itemSize }}
    >
      <VStack>
        <RnImage
          source={{ uri: item.coverImageUrl }}
          style={{ width: itemSize, height: itemSize }}
          alt={item.title}
        />
        <VStack className="px-4 pb-4 pt-2">
          <Text className="text-lg text-headline font-bold mb-1" numberOfLines={1}>
            {item.title}
          </Text>
          <Text
            className="text-text text-sm font-semibold mb-2"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.description}
          </Text>
          <Box className="self-start rounded-full bg-primary px-3 py-1">
            <Text className="text-xs font-semibold text-white">{price}</Text>
          </Box>
        </VStack>
      </VStack>
    </Pressable>
  );
};

export { StoryRenderItem };
