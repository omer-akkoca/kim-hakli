import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, StatusBar, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';
import * as NavigationBar from 'expo-navigation-bar';
import { Box } from '@/components/ui';
import { useGetStoryScenes } from '@/src/actions';
import {
  AppBackground,
  AppFlatList,
  AppLoading,
  StoryReadActionButtons,
  StoryReadBg,
  StoryReadProgressBar,
  StoryReadRenderItem,
} from '@/src/components';
import {
  height,
  storyReadActionBarHeight as srabh,
  storyReadProgressBarHeight as srpbh,
  width,
} from '@/src/constants';
import { getCoverImageUrl } from '@/src/utils';
import { StoryStatus } from '@/src/types';

const StoryReadPage = () => {
  const { id, status } = useLocalSearchParams<{ id: string; status: StoryStatus }>();

  const { top, bottom } = useSafeAreaInsets();

  const { data: scenes = [], isPending: scenesLoading } = useGetStoryScenes(id);

  const coverImage = getCoverImageUrl(id);

  const [activeIndex, setActiveIndex] = useState(0);

  const flatListRef = useRef<FlatList>(null);
  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 });
  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  });

  const listData = useMemo(() => {
    const images = [];
    if (coverImage) images.push(coverImage);
    if (scenes.length !== 0) images.push(...scenes.map((e) => e.image_url));
    return images;
  }, [coverImage, scenes]);

  const boxHeight = useMemo(() => height - bottom - top - srabh - srpbh - 64, [top, bottom]);

  useFocusEffect(
    useCallback(() => {
      if (Platform.OS === 'android') {
        NavigationBar.setVisibilityAsync('hidden');
      }
      StatusBar.setHidden(true, 'fade');
      return () => {
        if (Platform.OS === 'android') {
          NavigationBar.setVisibilityAsync('visible');
        }
        StatusBar.setHidden(false, 'fade');
      };
    }, []),
  );

  const renderItem = useCallback(
    ({ item }: { item: string }) => <StoryReadRenderItem item={item} boxHeight={boxHeight} />,
    [boxHeight],
  );

  if (scenesLoading)
    return (
      <AppBackground>
        <AppLoading fullScreen />
      </AppBackground>
    );

  return (
    <StoryReadBg>
      <Box className="flex-1" style={{ paddingTop: top + 16, paddingBottom: bottom + 16, gap: 16 }}>
        <StoryReadProgressBar current={activeIndex + 1} total={listData.length} />
        <Box className="flex-1">
          <AppFlatList
            flatListRef={flatListRef}
            data={listData}
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
            renderItem={renderItem}
            className="z-10"
          />
        </Box>
        <StoryReadActionButtons
          storyId={id}
          storyStatus={status}
          activeIndex={activeIndex}
          length={listData.length}
          setActiveIndex={setActiveIndex}
        />
      </Box>
    </StoryReadBg>
  );
};

export default StoryReadPage;
