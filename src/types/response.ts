import { IStory, IStoryScene } from './story';
import { IUser } from './user';

export interface UnlockStoryResponse {
  success: boolean;
  already_unlocked: boolean;
  credits_spent?: number;
  remaining_credit?: number;
}

export interface VoteStoryResponse {
  success: boolean;
  earned_credit: number;
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
  featured: IStory[];
  latest: IStory[];
  mostVoted: StoryWithVoteCount[];
}

export interface GetStoryAccessResponse {
  unlocked: boolean;
  voted: boolean;
}

export interface IAllTimeLeaderboardUser {
  id: string;
  full_name: string | null;
  avatar_path: string | null;
  avatar_url: string | null;
  total_earned_credit: number;
  order: number;
}

export interface GetLeaderBoardResponse {
  leaderboard: IAllTimeLeaderboardUserWithAvatarUrl[];
  current_user: IAllTimeLeaderboardUserWithAvatarUrl | null;
}

export interface IAllTimeLeaderboardUserWithAvatarUrl extends IAllTimeLeaderboardUser {
  avatar_path_url: string | null;
}

export interface UpdateProfileResponse {
  user: IUser;
  referral: {
    success: boolean;
    reason?: string;
  };
}

export interface GetMyTotalCreditsResponse {
  total_credits: number;
}

export interface GetStoryImagesResponse {
  path: string;
  signedUrl: string;
}

export interface ClaimAdRewardResponse {
  success: boolean;
  remaining_ads: number;
  earned_credit: number;
}
