import React, { useMemo } from 'react';
import { Image as RnImage } from 'react-native';
import { Box } from '@/components/ui';
import {
  height,
  storyReadActionBarHeight,
  storyReadProgressBarHeight,
  width,
} from '@/src/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface StoryReadRenderItemProps {
  item: string;
}

const StoryReadRenderItem: React.FC<StoryReadRenderItemProps> = ({ item }) => {
  const { top, bottom } = useSafeAreaInsets();

  const boxHeight = useMemo(
    () => height - bottom - top - storyReadActionBarHeight - storyReadProgressBarHeight - 64,
    [bottom, top],
  );

  const boxWidth = width;

  const imageWidth = Math.min(boxWidth, boxHeight * (9 / 16));
  const imageHeight = Math.min(boxHeight, boxWidth * (16 / 9));

  return (
    <Box className="items-center justify-center" style={{ width: boxWidth, height: boxHeight }}>
      <RnImage
        source={{ uri: item }}
        style={{ width: imageWidth, height: imageHeight }}
        resizeMode="contain"
      />
    </Box>
  );
};

export { StoryReadRenderItem };
