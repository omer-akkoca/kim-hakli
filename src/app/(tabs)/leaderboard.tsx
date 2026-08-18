import React, { useCallback, useState } from 'react';
import { Box } from '@/components/ui';
import { leaderBoardPeriod } from '@/src/types';
import {
  AllTimeLeaderboard,
  AppBackground,
  AppBar,
  MonthlyLeaderboard,
  TimeTabs,
} from '@/src/components';

const LeaderBoardPage = () => {
  const [time, setTime] = useState<leaderBoardPeriod>('all');

  const renderBoard = useCallback(() => {
    if (time === 'all') return <AllTimeLeaderboard />;
    if (time === 'month') return <MonthlyLeaderboard />;
  }, [time]);

  return (
    <AppBackground>
      <AppBar>
        <TimeTabs setTime={setTime} time={time} />
      </AppBar>
      <Box className="flex-1">{renderBoard()}</Box>
    </AppBackground>
  );
};

export default LeaderBoardPage;
