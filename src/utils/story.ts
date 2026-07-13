export const formatStoryVoteCount = (count: number): string => {
  if (count >= 1_000_000) return `${Math.floor((count / 1_000_000) * 10) / 10}M`;
  if (count >= 1_000) return `${Math.floor((count / 1_000) * 10) / 10}B`;
  return count.toString();
};

export const getCoverImageUrl = (id: string): string => {
  return `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/public/story-covers/${id}.webp`;
}