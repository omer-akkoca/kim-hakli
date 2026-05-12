export const formatStoryVoteCount = (count: number): string => {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}B`;
  return count.toString();
};

export const formatStoryLikeCount = (count: number): string => {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}B`;
  return count.toString();
};

export const getSceneImageUrl = (slug: string, order: string, lang: string) => {
  return `${process.env.EXPO_PUBLIC_STORAGE_BASE_URL}stories%2F${slug}%2F${order}-tr.png?alt=media`;
};
