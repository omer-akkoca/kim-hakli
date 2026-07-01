import { ImagePickerAsset } from 'expo-image-picker';
import { CreditFilter } from './common';
import { StoryArtStyle } from './story';
import { genderType } from './user';

// profile actions
export interface GetProfileParams {
  userId: string;
}

// story
export interface GetStoryImageUrlParams {
  path: string;
}

export interface UnlockStoryParams {
  storyId: string;
}

export interface HasUnlockedStoryParams {
  userId?: string;
  storyId?: string;
}

export interface HasVotedStoryParams {
  userId?: string;
  storyId: string;
}

export interface SubmitVoteParams {
  storyId: string;
  side: string;
}

export interface BookmarkParams {
  userId: string;
  storyId: string;
}

export interface GetStoriesParams {
  artStyle?: StoryArtStyle | null;
  categoryCode?: string | null;
  creditFilter?: CreditFilter;
  page?: number;
  limit?: number;
}

export interface SearchStoriesParams {
  query: string;
}

export interface UpdateReferralSourceParams {
  userId: string;
  referralSource: string;
}

export interface UpdateProfileParams {
  userId: string;
  fullName: string;
  photo?: ImagePickerAsset;
    gender: genderType;
}

export interface GetAvatarUrlParams {
  userId?: string;
  avatarPath?: string | null;
}