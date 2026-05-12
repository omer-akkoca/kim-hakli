import { useEffect } from 'react';
import { Box, HStack } from '@/components/ui';
import { colors } from '@/src/constants';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface StoryProgressBarProps {
  total: number;
  current: number;
}

const ProgressSegment = ({ filled }: { filled: boolean }) => {
  const progress = useSharedValue(filled ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(filled ? 1 : 0, { duration: 250 });
  }, [filled]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <Box className="flex-1 h-full rounded-full bg-secondary-500 overflow-hidden">
      <Animated.View style={[{ height: '100%', backgroundColor: colors.primary }, animatedStyle]} />
    </Box>
  );
};

const StoryReadProgressBar: React.FC<StoryProgressBarProps> = ({ total, current }) => {
  return (
    <HStack space="sm" className="px-4" style={{ height: 2 }}>
      {Array.from({ length: total }, (_, index) => (
        <ProgressSegment key={index} filled={index < current} />
      ))}
    </HStack>
  );
};

export { StoryReadProgressBar };
