import { ILeaderBoardProfile } from '../types';

export const getUniqueLeader = (leaderboard: ILeaderBoardProfile[]): ILeaderBoardProfile | null => {
  if (leaderboard.length === 0) return null;

  const highestCredit = Math.max(...leaderboard.map((profile) => profile.credit_count));

  const leaders = leaderboard.filter((profile) => profile.credit_count === highestCredit);

  return leaders.length === 1 ? leaders[0] : null;
};

export const isCurrentUserInTopTen = (currentUserRank: number | null | undefined): boolean => {
  return currentUserRank !== null && currentUserRank !== undefined && currentUserRank <= 10;
};
