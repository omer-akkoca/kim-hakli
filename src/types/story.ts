import { Timestamp } from 'firebase/firestore';

export interface IStory {
  id: string;
  title: string;
  sides: string[];
  createdAt: Timestamp;
  coverImageUrl: string;
  votes: Record<string, number>;
  status: storyStatus;
  creditCost: number;
  slug: string;
  description: string;
  sceneLength: number;
}

export interface IUnlockedStory {
  unlockedAt: Timestamp;
  creditsSpent: number;
  votedSide: string | null;
}

export type storyStatus = 'published' | 'draft' | 'deleted';

export interface IScene {
  order: number;
  slug: string;
}
