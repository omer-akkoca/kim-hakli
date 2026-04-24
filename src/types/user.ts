import { Timestamp } from 'firebase/firestore';

export interface IUser {
  id: string;
  displayName: string;
  email: string;
  photoURL: string | null;
  credits: number;
  provider: providerType;
  createdAt: Timestamp;
  subscription: any;
}

export type providerType = 'google' | 'apple';
