import { StoryArtStyle } from './story';

// profile actions
export interface GetProfileParams {
  userId: string;
}

// story
export interface GetStoryImageUrlParams {
  path: string;
}

export interface UnlockStoryParams {
  storyId: string;
}

export interface HasUnlockedStoryParams {
  userId?: string;
  storyId?: string;
}

export interface HasVotedStoryParams {
  userId: string;
  storyId: string;
}

export interface SubmitVoteParams {
  storyId: string;
  side: string;
}

export interface GetStoriesParams {
  categoryIds: string[];
  artStyle: StoryArtStyle | '';
}
