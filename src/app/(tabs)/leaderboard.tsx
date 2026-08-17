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
import { useGetAllTimeLeaderBoard } from '@/src/actions';
import { IAllTimeLeaderboardUserWithAvatarUrl } from '@/src/types';
import { Box, Divider, HStack } from '@/components/ui';

const LeaderBoardPage = () => {
  const {
    data: allTimeLeaderBoard = { leaderboard: [], current_user: null },
    isLoading,
    refetch,
    isRefetching,
  } = useGetAllTimeLeaderBoard();

  const first = allTimeLeaderBoard
    ? allTimeLeaderBoard.leaderboard.find((e) => e.order === 1)
    : null;

  const filteredLeaderboard = first
    ? allTimeLeaderBoard.leaderboard.filter((profile) => profile.id !== first.id)
    : allTimeLeaderBoard.leaderboard;

  const ListHeaderComponent = useCallback(
    () => (
      <Box className="mb-6">
        <LeaderTitle />
        <LeaderCard leader={first} />
      </Box>
    ),
    [first],
  );

  const ListFooterComponent = useCallback(
    () =>
      allTimeLeaderBoard.current_user ? (
        <Box className="mt-6">
          <HStack space="sm" className="mb-6 items-center justify-center">
            <Box className="w-1 h-1 rounded-full bg-secondary-500" />
            <Box className="w-1 h-1 rounded-full bg-secondary-500" />
            <Box className="w-1 h-1 rounded-full bg-secondary-500" />
          </HStack>
          <LeaderSelfCard profile={allTimeLeaderBoard.current_user} />
        </Box>
      ) : null,
    [allTimeLeaderBoard],
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
    ({ item }: ListRenderItemInfo<IAllTimeLeaderboardUserWithAvatarUrl>) => (
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
