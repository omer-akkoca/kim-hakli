import React, { memo } from 'react';
import { Box, LinearGradient } from '@/components/ui';
import { BlurView } from 'expo-blur';
import { AppText } from '../ui/AppText';

interface StoryReadCounterProps {
  activeIndex: number;
  length: number;
}

const StoryReadCounterComponent: React.FC<StoryReadCounterProps> = ({ activeIndex, length }) => {
  return (
    <Box
      className="bg-background-500/75 rounded-full border border-white/10 overflow-hidden disabled:opacity-50"
      style={{
        height: 48,
        width: 48,
        boxShadow: '0 10px 24px rgba(0,0,0,0.24)',
      }}
    >
      <BlurView intensity={18} tint="dark" className="flex-1">
        <LinearGradient
          colors={['rgba(124,144,164,0.05)', 'rgba(124,144,164,0)']}
          locations={[0, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="flex-1 items-center justify-center"
        >
          <AppText size={14} weight={600} className="text-headline">
            {activeIndex + 1}/{length}
          </AppText>
        </LinearGradient>
      </BlurView>
    </Box>
  );
};

const StoryReadCounter = memo(StoryReadCounterComponent);

export { StoryReadCounter };
