import React from 'react';
import { useGetAllTimeLeaderBoard } from '@/src/actions';
import { LeaderBoardList } from './LeaderBoardList';

const AllTimeLeaderboard = () => {
  const {
    data = { leaderboard: [], current_user: null },
    isLoading,
    refetch,
    isRefetching,
  } = useGetAllTimeLeaderBoard();

  return (
    <LeaderBoardList
      data={data}
      isRefetching={isRefetching}
      loading={isLoading}
      refetch={refetch}
      title="Haklılar Tablosu"
      subTitle="En çok haklı tarafı bulanlar"
    />
  );
};

export { AllTimeLeaderboard };
