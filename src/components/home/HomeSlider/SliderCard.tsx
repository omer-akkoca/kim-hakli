import React, { PropsWithChildren } from 'react';
import Animated, { interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { useTheme } from '@/src/hooks';
import { cardHeight, cardOverlap, cardWidth, MIN_SCALE, snapInterval } from './dimensions';

interface SlideCardProps extends PropsWithChildren {
  index: number;
  isLast: boolean;
  scrollX: SharedValue<number>;
}

const SlideCard: React.FC<SlideCardProps> = ({ children, ...rest }) => {
  const { colors } = useTheme();
  const { index, isLast, scrollX } = rest;
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
        animatedStyle,
        {
          overflow: 'hidden',
          width: cardWidth,
          height: cardHeight,
          marginRight: isLast ? 0 : -cardOverlap,
          borderRadius: 24,
          borderWidth: 1,
          backgroundColor: colors.appCardBg,
          boxShadow: colors.shadow,
          borderColor: colors.appCardBorder,
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

export { SlideCard };
