import React from 'react';
import { ImageBackground, Image as RnImage } from 'react-native';
import { Box, Pressable, Text, VStack } from '@/components/ui';
import { width } from '@/src/constants';
import { IStory } from '@/src/types';
import { useRouter } from 'expo-router';

interface IStoryRenderItem {
  item: IStory;
}

const itemWidth = (width - 48 - 16) / 2;
const itemHeight = (itemWidth / 9) * 16;

const StoryRenderItem: React.FC<IStoryRenderItem> = ({ item }) => {
  const router = useRouter();

  const price = item.creditCost === 0 ? 'Ücretsiz' : `${item.creditCost} Kredi`;

  return (
    <Pressable
      onPress={() => router.push(`/story/${item.id}`)}
      className="bg-backgroud-700 rounded-xl overflow-hidden"
      style={{ width: itemWidth, height: itemHeight }}
    >
      <ImageBackground
        source={{ uri: item.coverImageUrl }}
        className="flex-1 relative justify-end rounded-xl overflow-hidden"
        resizeMode="contain"
      >
        <Box className="absolute right-2 top-2 rounded-full px-3 py-1 bg-primary-500">
          <Text className="text-xs text-headline-500 font-semibold">{price}</Text>
        </Box>
      </ImageBackground>
    </Pressable>
  );
};

export { StoryRenderItem };
