import { StoryVoteResult } from './response';

export interface IStory {
  id: string;
  title: string;
  description: string;
  art_style: StoryArtStyle;
  credit_cost: number;
  status: StoryStatus;
  is_featured: boolean;
  cover_image_path: string;
  created_at: string;
  updated_at: string;
}

export const storyArtStyles = [
  'all',
  'comic',
  'paper-cut-out',
  'realistic',
  'pixel-art',
  'anime',
  'minimalist',
  '3d-render',
  'sketch',
] as const;

export type StoryArtStyle = (typeof storyArtStyles)[number];
export type StoryStatus = 'published' | 'draft' | 'deleted';

export interface IStoryScene {
  id: string;
  story_id: string;
  scene_order: number;
  image_path: string;
  created_at: string;
}

export interface IStorySide {
  id: string;
  story_id: string;
  side_order: number;
  title: string;
  description: string;
  avatar_path: string;
  created_at: string;
}

export interface IStorySideWithImage {
  id: string;
  story_id: string;
  side_order: number;
  title: string;
  description: string;
  avatar_path: string;
  created_at: string;
  avatar_url: string;
}

export interface StoryVoteCard extends StoryVoteResult {
  avatar_url: string;
}

export interface UnlockedStory {
  story_id: string;
  title: string;
  description: string;
  art_style: string;
  credit_cost: number;
  status: string;
  is_featured: boolean;
  cover_image_path: string;
  story_created_at: string;
  story_updated_at: string;
  credits_spent: number;
  unlocked_at: string;
}
