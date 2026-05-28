import React, { memo, useMemo } from 'react';
import { Image as RnImage } from 'react-native';
import { Box } from '@/components/ui';
import { width } from '@/src/constants';

interface StoryReadRenderItemProps {
  item: string;
  boxHeight: number;
}

const StoryReadRenderItem = memo<StoryReadRenderItemProps>(({ item, boxHeight }) => {
  const { boxWidth, imageWidth, imageHeight } = useMemo(() => {
    const bh = boxHeight;
    const bw = width;
    return {
      boxWidth: bw,
      imageWidth: Math.min(bw, bh * (9 / 16)),
      imageHeight: Math.min(bh, bw * (16 / 9)),
    };
  }, [boxHeight]);

  return (
    <Box className="items-center justify-center" style={{ width: boxWidth, height: boxHeight }}>
      <RnImage
        source={{ uri: item }}
        style={{ width: imageWidth, height: imageHeight }}
        resizeMode="contain"
      />
    </Box>
  );
});

StoryReadRenderItem.displayName = 'StoryReadRenderItem';

export { StoryReadRenderItem };
