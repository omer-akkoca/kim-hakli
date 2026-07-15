import { IStory, IStoryScene } from "./story";

export interface UnlockStoryResponse {
  success: boolean;
  already_unlocked: boolean;
  credits_spent?: number;
  remaining_credit?: number;
}

export interface VoteStoryResponse {
  success: boolean;
  story_id: string;
  side_id: string;
}

export interface UserStoryStats {
  unlocked_count: number;
  voted_count: number;
}

export interface StoryVoteResult {
  side_id: string;
  title: string;
  description: string;
  avatar_path: string;
  vote_count: number;
  percentage: number;
}

export interface DeleteAccountResponse {
  success: boolean;
}

export interface GetStoryScenesResponse extends IStoryScene {
  image_url: string;
}

export interface StoryWithVoteCount extends IStory {
  vote_count: number;
}

export interface GetHomeStoriesResponse {
  featured: IStory[],
  latest: IStory[],
  mostVoted: StoryWithVoteCount[],
}

export interface GetStoryAccessResponse {
  unlocked: boolean;
  voted: boolean;
}