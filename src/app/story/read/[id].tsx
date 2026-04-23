import { View, FlatList, Image, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { IStory } from '@/src/types';
import { getStoryById } from '@/src/services';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, ButtonText } from '@/components/ui/button';
import { Box, Pressable, Text } from '@/components/ui';
import { AntDesign } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function StoryReadPage() {
  const router = useRouter();
  const { bottom, top } = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const [story, setStory] = useState<IStory>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const boot = async () => {
      const data = await getStoryById(id);
      if (data) {
        setStory(data);
      }
    };
    boot();
  }, [id]);

  const getSceneImageUrl = (slug: string, order: string, lang: string) => {
    return `${process.env.EXPO_PUBLIC_STORAGE_BASE_URL}stories%2F${slug}%2F${order}-${lang}.png?alt=media`;
  };

  const sceneImages = useMemo(() => {
    if (!story) return [];
    const scenes = Array.from({ length: story.sceneLength }, (_, i) =>
      String(i + 1).padStart(2, '0'),
    );
    const images = scenes.map((e) => getSceneImageUrl(story.slug, e, 'tr'));
    return [story.coverImageUrl, ...images];
  }, [story]);

  if (!story) return <></>;

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === sceneImages.length - 1;

  const goNext = () => {
    flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
  };

  const goPrev = () => {
    flatListRef.current?.scrollToIndex({ index: currentIndex - 1, animated: true });
  };

  const handleVote = () => {
    router.push(`/story/vote/${id}`);
  };

  const renderItem = ({ item }: { item: string }) => {
    return <Image source={{ uri: item }} style={{ width, height }} resizeMode="contain" />;
  };

  return (
    <View className="flex-1 bg-black">
      <Pressable
        onPress={() => router.back()}
        className="absolute left-5 z-10 flex-row items-center gap-4"
        style={{ top: top + 12 }}
      >
        <Box
          className="items-center justify-center rounded-full"
          style={{ width: 36, height: 36, backgroundColor: 'rgba(255,255,255,0.15)' }}
        >
          <AntDesign name="arrow-left" size={18} color="white" />
        </Box>
        <Text className="text-white">{story.title}</Text>
      </Pressable>
      <FlatList
        ref={flatListRef}
        data={sceneImages}
        keyExtractor={(item) => item.toString()}
        renderItem={renderItem}
        pagingEnabled
        horizontal={false}
        showsVerticalScrollIndicator={false}
        snapToInterval={height}
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
      />

      <View className="absolute left-0 right-0 flex-row gap-3 px-5" style={{ bottom: bottom + 24 }}>
        {!isFirst && (
          <Button onPress={goPrev} className="flex-1">
            <ButtonText>Geri</ButtonText>
          </Button>
        )}

        {isLast ? (
          <Button onPress={handleVote} className="flex-1">
            <ButtonText>Oyla</ButtonText>
          </Button>
        ) : (
          <Button onPress={goNext} className="flex-1">
            <ButtonText>İleri</ButtonText>
          </Button>
        )}
      </View>
    </View>
  );
}
