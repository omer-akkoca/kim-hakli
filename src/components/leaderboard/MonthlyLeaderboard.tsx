import React from 'react';
import { LeaderBoardList } from './LeaderBoardList';
import { useGetMonthlyLeaderBoard } from '@/src/actions';

const MonthlyLeaderboard = () => {
  const {
    data = { leaderboard: [], current_user: null },
    isLoading,
    refetch,
    isRefetching,
  } = useGetMonthlyLeaderBoard();

  const monthTitle = new Intl.DateTimeFormat('tr-TR', {
    month: 'long',
  }).format(new Date());

  return (
    <LeaderBoardList
      data={data}
      isRefetching={isRefetching}
      loading={isLoading}
      refetch={refetch}
      title={`${monthTitle} Ayının Haklıları`}
      subTitle={`${monthTitle} ayında en çok haklı tarafı bulanlar`}
    />
  );
};

export { MonthlyLeaderboard };
