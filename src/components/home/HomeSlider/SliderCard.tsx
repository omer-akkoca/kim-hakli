import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';
import Animated, { interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';

import { useTheme } from '@/src/hooks';
import { cardHeight, cardOverlap, cardWidth, MIN_SCALE, snapInterval } from './dimensions';

interface SlideCardProps extends PropsWithChildren {
  index: number;
  isLast: boolean;
  scrollX: SharedValue<number>;
}

const SlideCard: React.FC<SlideCardProps> = ({ children, index, isLast, scrollX }) => {
  const { colors } = useTheme();

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
        {
          width: cardWidth,
          height: cardHeight,
          marginRight: isLast ? 0 : -cardOverlap,
        },
        animatedStyle,
      ]}
    >
      <View
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          borderRadius: 24,
          borderWidth: 1,
          backgroundColor: colors.appCardBg,
          borderColor: colors.appCardBorder,
          boxShadow: colors.shadow,
        }}
      >
        {children}
      </View>
    </Animated.View>
  );
};

export { SlideCard };
