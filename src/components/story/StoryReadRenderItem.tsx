import React from 'react';
import { Image as RnImage } from 'react-native';
import { Box } from '@/components/ui';
import { height, readActionBarHeight, width } from '@/src/constants';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface StoryReadRenderItemProps {
  item: string;
}

const StoryReadRenderItem: React.FC<StoryReadRenderItemProps> = ({ item }) => {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <Box style={{ width: width, height: height - readActionBarHeight - bottom - top - 2 }}>
      <RnImage source={{ uri: item }} className="flex-1" resizeMode="contain" alt={item} />
    </Box>
  );
};

export { StoryReadRenderItem };
