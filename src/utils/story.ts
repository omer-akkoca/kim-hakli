import { Platform, Share } from 'react-native';
import { IStory } from '@/src/types';

export const formatStoryVoteCount = (count: number): string => {
  if (count >= 1_000_000) return `${Math.floor((count / 1_000_000) * 10) / 10}M`;
  if (count >= 1_000) return `${Math.floor((count / 1_000) * 10) / 10}B`;
  return count.toString();
};

export const getCoverImageUrl = (id: string): string => {
  return `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/public/story-covers/${id}.webp`;
};

export const handleShareStory = async (story: IStory) => {
  if (!story) return;

  const storyUrl = `https://kimhakli.tr/story/${story.id}`;

  await Share.share(
    Platform.OS === 'ios'
      ? {
          url: storyUrl,
        }
      : {
          message: storyUrl,
        },
  );
};

export const preventWordBreak = (title: string) =>
  title.replace(/\S+/g, (word) => word.split('').join('\u2060'));
