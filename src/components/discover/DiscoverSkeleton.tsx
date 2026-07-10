import React, { useCallback } from 'react';
import { AppFlatList } from '../ui/AppFlatList';
import { StorySkeletonItem } from './StoryRenderItem';
import { ListRenderItemInfo } from 'react-native';

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
      safeBottom
      safeBottomNav
      bottomPadding
      gap={8}
    />
  );
};

export { DiscoverSkeleton };
