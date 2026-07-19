import React, { useCallback } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { Box } from '@/components/ui';
import {
  AppBackground,
  AppBannerAd,
  AppBar,
  AppFlatList,
  AppLoading,
  VoteHistoryCard,
} from '@/src/components';
import { useGeVoteHistory } from '@/src/actions';
import { VoteHistory } from '@/src/types';
import { ADS } from '../constants';

const VoteHistoryPage = () => {
  const { data, isLoading, refetch, isRefetching } = useGeVoteHistory();

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<VoteHistory>) => <VoteHistoryCard voteHistory={item} />,
    [],
  );

  const ItemSeparatorComponent = useCallback(() => <Box className="h-6" />, []);

  return (
    <AppBackground>
      <AppBar backIcon title="Oy Geçmişim">
        <AppBannerAd unitId={ADS.banner.vote_history} />
      </AppBar>
      <Box className="flex-1">
        {isLoading ? (
          <AppLoading fullScreen />
        ) : (
          <AppFlatList
            data={data}
            keyExtractor={(e) => e.story_id}
            renderItem={renderItem}
            ItemSeparatorComponent={ItemSeparatorComponent}
            noContentText="Henüz herhangi bir hikayeye oy vermediniz."
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

export default VoteHistoryPage;
