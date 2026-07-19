import React, { useCallback } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { Box } from '@/components/ui';
import {
  AppBackground,
  AppBannerAd,
  AppBar,
  AppFlatList,
  AppLoading,
  UnlockedStoryItem,
} from '@/src/components';
import { useGetUserUnlockedStories } from '@/src/actions';
import { UnlockedStory } from '@/src/types';
import { ADS } from '../constants';

const UnlockedStories: React.FC = () => {
  const { data: unlockedStories, isLoading, refetch, isRefetching } = useGetUserUnlockedStories();

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<UnlockedStory>) => <UnlockedStoryItem item={item} />,
    [],
  );

  const ItemSeparatorComponent = useCallback(() => <Box className="h-6" />, []);

  return (
    <AppBackground>
      <AppBar backIcon title="Kilidi Açılan Hikayeler">
        <AppBannerAd unitId={ADS.banner.unlock_stories} />
      </AppBar>
      <Box className="flex-1">
        {isLoading ? (
          <AppLoading fullScreen />
        ) : (
          <AppFlatList
            data={unlockedStories}
            keyExtractor={(item) => item.story_id}
            renderItem={renderItem}
            ItemSeparatorComponent={ItemSeparatorComponent}
            noContentText="Henüz kilidi açılan bir hikayeniz bulunmamaktadır."
            refreshing={isRefetching}
            onRefresh={refetch}
            paddingHorizontal={24}
            topPadding
            safeBottom
            bottomPadding
          />
        )}
      </Box>
    </AppBackground>
  );
};

export default UnlockedStories;
