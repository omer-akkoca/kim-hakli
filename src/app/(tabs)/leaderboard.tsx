import React, { useCallback } from 'react';
import { ListRenderItemInfo } from 'react-native';
import {
  AppBackground,
  AppFlatList,
  AppLoading,
  LeaderCard,
  LeaderListItem,
  LeaderSelfCard,
  LeaderTitle,
} from '@/src/components';
import { useGetLeaderBoard } from '@/src/actions';
import { getUniqueLeader, isCurrentUserInTopTen } from '@/src/utils';
import { ILeaderBoardProfile } from '@/src/types';
import { Box, Divider, HStack } from '@/components/ui';

const LeaderBoardPage = () => {
  const {
    data = { leaderboard: [], current_user_rank: 0 },
    isLoading,
    refetch,
    isRefetching,
  } = useGetLeaderBoard();

  const uniqueLeader = getUniqueLeader(data.leaderboard);
  const isInTopTen = isCurrentUserInTopTen(data.current_user_rank);

  const filteredLeaderboard = uniqueLeader
    ? data.leaderboard.filter((profile) => profile.id !== uniqueLeader.id)
    : data.leaderboard;

  const ListHeaderComponent = useCallback(
    () => (
      <Box className="mb-6">
        <LeaderTitle />
        <LeaderCard leader={uniqueLeader} />
      </Box>
    ),
    [uniqueLeader],
  );

  const ListFooterComponent = useCallback(
    () =>
      !isInTopTen ? (
        <Box className="mt-6">
          <HStack space="sm" className="mb-6 items-center justify-center">
            <Box className="w-1 h-1 rounded-full bg-secondary-500" />
            <Box className="w-1 h-1 rounded-full bg-secondary-500" />
            <Box className="w-1 h-1 rounded-full bg-secondary-500" />
          </HStack>
          <LeaderSelfCard rank={data.current_user_rank} />
        </Box>
      ) : null,
    [isInTopTen],
  );

  const ItemSeparatorComponent = useCallback(
    () => (
      <Box className="py-4">
        <Divider className="bg-white/5" />
      </Box>
    ),
    [],
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<ILeaderBoardProfile>) => (
      <LeaderListItem order={item.order} profile={item} />
    ),
    [],
  );

  return (
    <AppBackground>
      {isLoading ? (
        <AppLoading fullScreen />
      ) : (
        <AppFlatList
          data={filteredLeaderboard}
          keyExtractor={(e) => e.id}
          renderItem={renderItem}
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={ListFooterComponent}
          ItemSeparatorComponent={ItemSeparatorComponent}
          refreshing={isRefetching}
          onRefresh={refetch}
          safeTop
          safeBottom
          bottomPadding
          safeBottomNav
          topPadding
          paddingHorizontal={24}
        />
      )}
    </AppBackground>
  );
};

export default LeaderBoardPage;
