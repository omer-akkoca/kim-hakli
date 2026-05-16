import { Timestamp } from 'firebase/firestore';

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

export interface IUnlockedStory {
  unlockedAt: Timestamp;
  creditsSpent: number;
  votedSide: string | null;
}

export type StorySide = { name: string; photo: string };
export type StoryStatus = 'published' | 'draft' | 'deleted';

export const storyArtStyles = [
  'all',
  'realistic',
  'anime',
  'sketch',
  'pixel-art',
  '3d-render',
  'minimalist',
  'comic',
] as const;

export type StoryArtStyle = (typeof storyArtStyles)[number];
