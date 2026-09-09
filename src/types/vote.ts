export interface VoteHistory {
  story_id: string;
  story_title: string;
  story_description: string;
  cover_image_path: string;
  side_id: string;
  side_title: string;
  voted_at: string;
  same_vote_count: number;
  total_vote_count: number;
  same_vote_percentage: number;
}

export interface IVotedSide {
  avatar_path: string;
  avatar_url: string;
  side_id: string;
  title: string;
}
