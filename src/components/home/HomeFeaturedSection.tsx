import React, { useCallback, useMemo, useState } from 'react';
import { ListRenderItemInfo, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { Box } from '@/components/ui';
import { width } from '@/src/constants';
import { AppFlatList } from '../ui/AppFlatList';
import { IStory } from '@/src/types';
import { FeaturedStoryCard } from './FeaturedStoryCard';

const scale = (width - 64) / 9;
const containerWidth = width;
const containerHeight = scale * 13;

interface HomeFeaturedSectionProps {
  featured: IStory[];
}

const HomeFeaturedSection: React.FC<HomeFeaturedSectionProps> = ({ featured = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const featuredLength = useMemo(() => featured.length, [featured]);

  const renderItem = useCallback(
    ({ item: story }: ListRenderItemInfo<IStory>) => (
      <FeaturedStoryCard story={story} featuredLength={featuredLength} activeIndex={activeIndex} />
    ),
    [featuredLength, activeIndex],
  );

  const handleMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const scrollPosition = event.nativeEvent.contentOffset.x;
      const index = Math.round(scrollPosition / width);
      setActiveIndex(index);
    },
    [width],
  );

  return (
    <Box
      style={{
        width: containerWidth,
        height: containerHeight + 24,
      }}
    >
      <AppFlatList
        data={featured}
        keyExtractor={(e) => e.id}
        initialNumToRender={1}
        windowSize={2}
        maxToRenderPerBatch={1}
        snapToInterval={width}
        snapToAlignment="start"
        disableIntervalMomentum={true}
        horizontal
        decelerationRate="fast"
        bounces={false}
        renderItem={renderItem}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        className="z-10"
      />
    </Box>
  );
};

export { HomeFeaturedSection };
