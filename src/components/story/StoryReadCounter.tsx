import React, { memo } from 'react';
import { Box } from '@/components/ui';
import { useTheme } from '@/src/hooks';
import { AppText } from '../ui';

interface StoryReadCounterProps {
  activeIndex: number;
  length: number;
}

const StoryReadCounterComponent: React.FC<StoryReadCounterProps> = ({ activeIndex, length }) => {
  const { colors } = useTheme();
  return (
    <Box
      className="items-center justify-center rounded-full border overflow-hidden"
      style={{
        height: 48,
        width: 48,
        boxShadow: colors.shadow,
        backgroundColor: colors.appIconButtonBg,
        borderColor: colors.white_10,
      }}
    >
      <AppText size={14} weight={600} color="title">
        {activeIndex + 1}/{length}
      </AppText>
    </Box>
  );
};

const StoryReadCounter = memo(StoryReadCounterComponent);

export { StoryReadCounter };
