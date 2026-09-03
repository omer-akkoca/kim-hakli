import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { Image } from 'expo-image';
import { width } from '@/src/constants';
import { AppCard } from '../ui/AppCard';
import { SLIDER1, SLIDER2, SLIDER3, SLIDER4 } from '@/assets';

const SLIDES = [
  {
    id: 'vote',
    image: SLIDER1,
  },
  {
    id: 'invite',
    image: SLIDER2,
  },
  {
    id: 'reward',
    image: SLIDER3,
  },
  {
    id: 'unlock',
    image: SLIDER4,
  },
];

const HORIZONTAL_PADDING = 24;
const VISIBLE_SIDE_WIDTH = 12;
const MIN_SCALE = 0.86;

const cardWidth = width - HORIZONTAL_PADDING * 2;
const cardHeight = cardWidth * (9 / 16);

const cardOverlap = ((1 - MIN_SCALE) * cardWidth) / 2 - VISIBLE_SIDE_WIDTH;

const snapInterval = cardWidth - cardOverlap;

type SlideCardProps = {
  index: number;
  image: any;
  isLast: boolean;
  scrollX: SharedValue<number>;
};

const SlideCard: React.FC<SlideCardProps> = ({ index, image, isLast, scrollX }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value,
      [(index - 1) * snapInterval, index * snapInterval, (index + 1) * snapInterval],
      [MIN_SCALE, 1, MIN_SCALE],
    );

    return {
      transform: [{ scale }],
    };
  });

  return (
    <Animated.View
      style={[
        styles.card,
        animatedStyle,
        {
          width: cardWidth,
          height: cardHeight,
          marginRight: isLast ? 0 : -cardOverlap,
        },
      ]}
    >
      <AppCard flex>
        <Image
          source={image}
          contentFit="cover"
          transition={200}
          style={{ width: '100%', height: '100%' }}
        />
      </AppCard>
    </Animated.View>
  );
};

export const HomeSlider: React.FC = () => {
  const scrollX = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  return (
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
      contentContainerStyle={styles.content}
      renderItem={({ item, index }) => (
        <SlideCard
          index={index}
          image={item.image}
          isLast={index === SLIDES.length - 1}
          scrollX={scrollX}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: HORIZONTAL_PADDING,
  },
  card: {
    overflow: 'hidden',
  },
});
