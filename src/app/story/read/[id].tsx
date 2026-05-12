import React, { useMemo, useRef, useState } from 'react';
import { FlatList, Image as RnImage } from 'react-native';
import { Box } from '@/components/ui';
import { useGetStoryById } from '@/src/actions';
import { StoryReadActionButtons, StoryReadBg, StoryReadProgressBar } from '@/src/components';
import { height, readActionBarHeight, width } from '@/src/constants';
import { getSceneImageUrl } from '@/src/utils';
import { useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function StoryReadPage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { top, bottom } = useSafeAreaInsets();

  const { data: story } = useGetStoryById(id);

  const [activeIndex, setActiveIndex] = useState(0);

  const flatListRef = useRef<FlatList>(null);
  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 });
  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  });

  const images: string[] = useMemo(() => {
    if (!story) return [];
    const scenes = Array.from({ length: story.sceneLength }, (_, i) =>
      String(i + 1).padStart(2, '0'),
    );
    const photos = scenes.map((e) => getSceneImageUrl(story.slug, e, 'tr'));
    return [story.coverImageUrl, ...photos];
  }, [story]);

  const renderItem = ({ item }: { item: string }) => {
    return (
      <Box style={{ width: width, height: height - readActionBarHeight - bottom - top - 2 }}>
        <RnImage source={{ uri: item }} className="flex-1" resizeMode="contain" alt={item} />
      </Box>
    );
  };

  return (
    <StoryReadBg>
      <Box className="flex-1" style={{ gap: 10 }}>
        <Box style={{ marginTop: top }}>
          <StoryReadProgressBar current={activeIndex + 1} total={images.length} />
        </Box>
        <Box className="flex-1">
          <FlatList
            ref={flatListRef}
            data={images}
            keyExtractor={(e) => e}
            snapToInterval={width}
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            decelerationRate="fast"
            onViewableItemsChanged={onViewableItemsChanged.current}
            viewabilityConfig={viewabilityConfig.current}
            renderItem={renderItem}
            className="z-10"
          />
        </Box>
        <StoryReadActionButtons
          storyId={id}
          activeIndex={activeIndex}
          images={images}
          setActiveIndex={setActiveIndex}
        />
      </Box>
    </StoryReadBg>
  );
}
