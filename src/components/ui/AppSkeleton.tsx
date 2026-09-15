import React, { useEffect } from 'react';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Box, LinearGradient } from '@/components/ui';
import { useTheme } from '@/src/hooks';

const SHIMMER_WIDTH = 110;

const AppSkeleton: React.FC = () => {
  const { colors } = useTheme();

  const translateX = useSharedValue(-SHIMMER_WIDTH);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(450, {
        duration: 1300,
        easing: Easing.linear,
      }),
      -1,
      false,
    );

    return () => {
      cancelAnimation(translateX);
    };
  }, [translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Box style={{ backgroundColor: colors.background }} className="flex-1">
      <Animated.View
        pointerEvents="none"
        className="absolute top-0 left-0 w-full h-full"
        style={[{ width: SHIMMER_WIDTH }, animatedStyle]}
      >
        <LinearGradient
          colors={[
            'rgba(255,255,255,0)',
            'rgba(255,255,255,0.08)',
            'rgba(255,255,255,0.16)',
            'rgba(255,255,255,0.08)',
            'rgba(255,255,255,0)',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="flex-1"
        />
      </Animated.View>
    </Box>
  );
};

export { AppSkeleton };
