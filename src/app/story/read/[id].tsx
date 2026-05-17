import React, { useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { Box } from '@/components/ui';
import { useGetStoryImageUrls, useGetStoryScenes } from '@/src/actions';
import {
  StoryReadActionButtons,
  StoryReadBg,
  StoryReadProgressBar,
  StoryReadRenderItem,
} from '@/src/components';
import { width } from '@/src/constants';
import { useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function StoryReadPage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { top } = useSafeAreaInsets();

  const { data: scenes } = useGetStoryScenes(id);

  const imagePaths = scenes?.map((scene) => scene.image_path) ?? [];

  const { data: signedImages = [] } = useGetStoryImageUrls({ paths: imagePaths });

  const [activeIndex, setActiveIndex] = useState(0);

  const flatListRef = useRef<FlatList>(null);
  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 });
  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  });

  if (!scenes) return null;

  return (
    <StoryReadBg>
      <Box className="flex-1" style={{ gap: 10 }}>
        <Box style={{ marginTop: top }}>
          <StoryReadProgressBar current={activeIndex + 1} total={scenes.length} />
        </Box>
        <Box className="flex-1">
          <FlatList<string>
            ref={flatListRef}
            data={signedImages}
            keyExtractor={(e) => e}
            snapToInterval={width}
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            decelerationRate="fast"
            onViewableItemsChanged={onViewableItemsChanged.current}
            viewabilityConfig={viewabilityConfig.current}
            renderItem={({ item }) => <StoryReadRenderItem item={item} />}
            className="z-10"
          />
        </Box>
        <StoryReadActionButtons
          storyId={id}
          activeIndex={activeIndex}
          length={scenes.length}
          setActiveIndex={setActiveIndex}
        />
      </Box>
    </StoryReadBg>
  );
}
