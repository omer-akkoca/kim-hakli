import React, { useCallback } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { AppFlatList } from '../ui';
import { StorySkeletonItem } from './StoryRenderItem';

const DiscoverSkeleton: React.FC = () => {
  const renderItem = useCallback(
    ({ index }: ListRenderItemInfo<number>) => <StorySkeletonItem order={index} />,
    [],
  );

  return (
    <AppFlatList
      keyExtractor={(item) => item.toString()}
      data={[...Array(6).keys()]}
      renderItem={renderItem}
      numColumns={2}
      paddingHorizontal={24}
      topPadding
      bottomPadding
      gap={8}
    />
  );
};

export { DiscoverSkeleton };
