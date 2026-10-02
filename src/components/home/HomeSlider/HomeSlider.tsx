import React from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { cardHeight, HORIZONTAL_PADDING, SLIDES, snapInterval } from './dimensions';
import { SlideCard } from './SliderCard';
import { SliderDots } from './SliderDots';

export const HomeSlider: React.FC = () => {
  const scrollX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  return (
    <View>
      <Animated.FlatList
        data={SLIDES}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        decelerationRate="fast"
        disableIntervalMomentum
        snapToInterval={snapInterval}
        snapToAlignment="start"
        scrollEventThrottle={16}
        onScroll={onScroll}
        contentContainerStyle={{ paddingHorizontal: HORIZONTAL_PADDING }}
        style={{ height: cardHeight + 48, paddingTop: 24 }}
        renderItem={({ item, index }) => {
          const Component = item.component;
          return (
            <SlideCard index={index} isLast={index === SLIDES.length - 1} scrollX={scrollX}>
              <Component />
            </SlideCard>
          );
        }}
      />
      <SliderDots scrollX={scrollX} />
    </View>
  );
};
