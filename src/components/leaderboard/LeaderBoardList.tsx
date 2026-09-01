import React, { useCallback } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { Box, Divider, HStack, VStack } from '@/components/ui';
import { GetLeaderBoardResponse, IAllTimeLeaderboardUserWithAvatarUrl } from '@/src/types';
import { AppFlatList } from '../ui/AppFlatList';
import { LeaderTitle } from './LeaderTitle';
import { LeaderCard } from './LeaderCard';
import { LeaderSelfCard } from './LeaderSelfCard';
import { LeaderListItem } from './LeaderListItem';
import { AppLoading } from '../ui/AppLoading';
import { WatchAdBadge } from '../ui/WatchAdBadge';

interface LeaderBoardListProps {
  loading: boolean;
  data: GetLeaderBoardResponse;
  isRefetching: boolean;
  refetch: () => void;
  title: string;
  subTitle: string;
}

const LeaderBoardList: React.FC<LeaderBoardListProps> = ({
  data,
  loading,
  isRefetching,
  refetch,
  title,
  subTitle,
}) => {
  const first = data ? data.leaderboard.find((e) => e.order === 1) : null;

  const filteredLeaderboard = first
    ? data.leaderboard.filter((profile) => profile.id !== first.id)
    : data.leaderboard;

  const ListHeaderComponent = useCallback(
    () => (
      <Box className="mb-6">
        <LeaderTitle title={title} subTitle={subTitle} />
        <LeaderCard leader={first} />
      </Box>
    ),
    [first, title, subTitle],
  );

  const ListFooterComponent = useCallback(
    () =>
      data.current_user ? (
        <VStack space="lg" className="mt-6">
          <HStack space="sm" className="items-center justify-center">
            <Box className="w-1 h-1 rounded-full bg-secondary-500" />
            <Box className="w-1 h-1 rounded-full bg-secondary-500" />
            <Box className="w-1 h-1 rounded-full bg-secondary-500" />
          </HStack>
          <LeaderSelfCard profile={data.current_user} />
          <WatchAdBadge />
        </VStack>
      ) : null,
    [data],
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
    [filteredLeaderboard],
  );

  if (loading) return <AppLoading fullScreen />;

  return (
    <AppFlatList
      data={filteredLeaderboard}
      keyExtractor={(e) => e.id}
      renderItem={renderItem}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      ItemSeparatorComponent={ItemSeparatorComponent}
      refreshing={isRefetching}
      onRefresh={refetch}
      safeBottom
      bottomPadding
      safeBottomNav
      topPadding
      paddingHorizontal={24}
    />
  );
};

export { LeaderBoardList };
