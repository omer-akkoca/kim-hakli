import { StoryArtStyle } from './story';

// profile actions
export interface GetProfileParams {
  userId: string;
}

export interface UnlockStoryParams {
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
