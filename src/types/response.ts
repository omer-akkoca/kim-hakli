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
