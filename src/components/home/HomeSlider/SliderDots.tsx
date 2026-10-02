import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { HStack } from '@/components/ui';
import { width } from '@/src/constants';
import { SLIDES, snapInterval } from './dimensions';

interface SliderDotsProps {
  scrollX: SharedValue<number>;
}

const SliderDots: React.FC<SliderDotsProps> = ({ scrollX }) => {
  return (
    <HStack style={styles.dots} className="absolute">
      {SLIDES.map((slide, index) => (
        <SliderDot key={slide.id} index={index} scrollX={scrollX} />
      ))}
    </HStack>
  );
};

const SliderDot = ({ index, scrollX }: { index: number; scrollX: SharedValue<number> }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const distance = Math.abs(scrollX.value / snapInterval - index);
    return {
      opacity: interpolate(distance, [0, 1], [1, 0.35], Extrapolation.CLAMP),
      width: interpolate(distance, [0, 1], [18, 6], Extrapolation.CLAMP),
    };
  });

  return <Animated.View style={[animatedStyle, styles.dot]} />;
};

const styles = StyleSheet.create({
  dots: {
    left: width / 2 - 29,
    bottom: 36,
    gap: 4,
  },
  dot: {
    height: 6,
    borderRadius: 99,
    backgroundColor: '#F56B20',
  },
});

export { SliderDots };
