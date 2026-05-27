import React from 'react';
import { Image as RnImage } from 'react-native';
import { Box } from '@/components/ui';
import {
  height,
  storyReadActionBarHeight,
  storyReadProgressBarHeight,
  width,
} from '@/src/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ref = width > height ? height : width;

interface StoryReadRenderItemProps {
  item: string;
}

const StoryReadRenderItem: React.FC<StoryReadRenderItemProps> = ({ item }) => {
  const { top, bottom } = useSafeAreaInsets();

  const imageScale = ref / 9;
  const imageWidth = imageScale * 9;
  const imageHeight = imageScale * 16;
  const boxHeight =
    height - bottom - top - storyReadActionBarHeight - storyReadProgressBarHeight - 16 - 16;

  const paddingVertical = (boxHeight - imageHeight) / 4;

  return (
    <Box style={{ width: width, height: boxHeight, paddingVertical }}>
      <RnImage
        source={{ uri: item }}
        height={imageHeight}
        width={imageWidth}
        resizeMode="contain"
      />
    </Box>
  );
};

export { StoryReadRenderItem };
