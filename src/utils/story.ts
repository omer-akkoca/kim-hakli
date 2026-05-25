export const formatStoryVoteCount = (count: number): string => {
  if (count >= 1_000_000) return `${Math.floor((count / 1_000_000) * 10) / 10}M`;
  if (count >= 1_000) return `${Math.floor((count / 1_000) * 10) / 10}B`;
  return count.toString();
};