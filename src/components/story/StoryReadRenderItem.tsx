import React, { memo, useMemo } from 'react';
import { Image } from 'expo-image';
import { Box } from '@/components/ui';
import { width } from '@/src/constants';
import { IStoryReadItem } from '@/src/types';

interface StoryReadRenderItemProps {
  item: IStoryReadItem;
  boxHeight: number;
}

const StoryReadRenderItem = memo<StoryReadRenderItemProps>(({ item, boxHeight }) => {
  const { id, url } = item;

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
      <Image
        source={{ uri: url, cacheKey: id }}
        contentFit="contain"
        cachePolicy="memory-disk"
        transition={200}
        recyclingKey={id}
        style={{ width: imageWidth, height: imageHeight }}
      />
    </Box>
  );
});

StoryReadRenderItem.displayName = 'StoryReadRenderItem';

export { StoryReadRenderItem };
