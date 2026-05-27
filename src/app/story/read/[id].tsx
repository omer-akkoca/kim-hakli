import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { Box } from '@/components/ui';
import { useGetStoryCoverImageUrl, useGetStoryImageUrls, useGetStoryScenes } from '@/src/actions';
import {
  AppBackground,
  AppFlatList,
  AppLoading,
  StoryReadActionButtons,
  StoryReadBg,
  StoryReadProgressBar,
  StoryReadRenderItem,
} from '@/src/components';
import { width } from '@/src/constants';
import { useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as NavigationBar from 'expo-navigation-bar';

export default function StoryReadPage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { top, bottom } = useSafeAreaInsets();

  const { data: scenes = [], isPending: scenesLoading } = useGetStoryScenes(id);
  const { data: coverImage, isLoading: coverLoading } = useGetStoryCoverImageUrl({
    path: `${id}/cover.webp`,
  });

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

  useEffect(() => {
    NavigationBar.setVisibilityAsync('hidden');
    return () => {
      NavigationBar.setVisibilityAsync('visible');
    };
  }, []);

  if (scenesLoading || coverLoading)
    return (
      <AppBackground>
        <AppLoading fullScreen />
      </AppBackground>
    );

  return (
    <StoryReadBg>
      <StatusBar hidden />
      <Box className="flex-1" style={{ paddingTop: top + 16, paddingBottom: bottom + 16, gap: 16 }}>
        <StoryReadProgressBar current={activeIndex + 1} total={scenes.length + 1} />
        <Box className="flex-1">
          <AppFlatList
            flatListRef={flatListRef}
            data={[coverImage, ...signedImages]}
            keyExtractor={(e) => e}
            initialNumToRender={3}
            windowSize={5}
            maxToRenderPerBatch={2}
            removeClippedSubviews={false}
            snapToInterval={width}
            snapToAlignment="start"
            disableIntervalMomentum={true}
            horizontal
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
          length={scenes.length + 1}
          setActiveIndex={setActiveIndex}
        />
      </Box>
    </StoryReadBg>
  );
}
