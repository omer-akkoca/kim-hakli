import { Timestamp } from 'firebase/firestore';

export interface IStory {
  id: string;
  title: string;
  sides: StorySide[];
  createdAt: Timestamp;
  coverImageUrl: string;
  votes: Record<string, number>;
  status: StoryStatus;
  creditCost: number;
  slug: string;
  description: string;
  sceneLength: number;
  category: StoryCategory;
}

export interface IUnlockedStory {
  unlockedAt: Timestamp;
  creditsSpent: number;
  votedSide: string | null;
}

export type StorySide = { name: string; photo: string };
export type StoryStatus = 'published' | 'draft' | 'deleted';

export type StoryCategory =
  | 'iliski'
  | 'aile'
  | 'is'
  | 'arkadaslik'
  | 'para'
  | 'komsuluk'
  | 'okul'
  | 'sosyal-medya'
  | 'evlilik'
  | 'boss-calisma'
  | 'diger';
