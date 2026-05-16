interface IResponse {
  success: boolean;
  message: string;
}

export interface UnlockStoryResponse {
  success: boolean;
  already_unlocked: boolean;
  credits_spent?: number;
  remaining_credit?: number;
}

export type SubmitVoteResponse = IResponse;
