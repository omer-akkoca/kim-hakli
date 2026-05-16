import { User } from 'firebase/auth';
import { db } from '@/src/configs';
import { doc, DocumentData, DocumentReference, getDoc } from 'firebase/firestore';
import { IUser } from '@/src/types';

export const getUserRefIfNotExist = async (
  user: User,
): Promise<DocumentReference<DocumentData, DocumentData> | null> => {
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) return userRef;
  return null;
};

export const getUser = async (userId: string): Promise<IUser | null> => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data() as IUser;
  }

  return null;
};

export const isStoryUnlocked = async (userId: string, storyId: string): Promise<boolean> => {
  const unlockedRef = doc(db, 'users', userId, 'unlockedStories', storyId);
  const unlockedSnap = await getDoc(unlockedRef);
  return unlockedSnap.exists();
};

export const hasVoted = async (userId: string, storyId: string): Promise<boolean> => {
  const unlockedRef = doc(db, 'users', userId, 'unlockedStories', storyId);
  const unlockedSnap = await getDoc(unlockedRef);
  if (!unlockedSnap.exists()) return false;
  return !!unlockedSnap.data()?.votedSide;
};
