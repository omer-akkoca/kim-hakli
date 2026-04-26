import { User } from 'firebase/auth';
import { db } from '../configs';
import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  where,
} from 'firebase/firestore';
import { IUser, providerType, IStory, ICategory } from '../types';

export const getUserRefIfNotExist = async (
  user: User,
): Promise<DocumentReference<DocumentData, DocumentData> | null> => {
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) return userRef;
  return null;
};

export const createUser = async (
  userRef: DocumentReference<DocumentData, DocumentData>,
  user: User,
) => {
  const provider: providerType =
    user.providerData[0]?.providerId === 'google.com' ? 'google' : 'apple';
  const createdUser: IUser = {
    id: user.uid,
    displayName: user.displayName ?? '',
    email: user.email ?? '',
    photoURL: user.photoURL,
    createdAt: Timestamp.now(),
    credits: 0,
    provider: provider,
    subscription: null,
  };
  await setDoc(userRef, createdUser);
};

export const getUser = async (userId: string): Promise<IUser | null> => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data() as IUser;
  }

  return null;
};

export const getCategories = async (): Promise<ICategory[]> => {
  const snapshot = await getDocs(collection(db, 'categories'));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as ICategory);
};

export const getStories = async (categoryIds?: string[]): Promise<IStory[]> => {
  const storiesRef = collection(db, 'stories');
  const q =
    categoryIds && categoryIds.length > 0
      ? query(
          storiesRef,
          where('status', '==', 'published'),
          where('category', 'array-contains-any', categoryIds),
        )
      : query(storiesRef, where('status', '==', 'published'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as IStory);
};

export const getStoryById = async (id: string): Promise<IStory | null> => {
  const storyRef = doc(db, 'stories', id);
  const storySnap = await getDoc(storyRef);
  if (storySnap.exists()) {
    return storySnap.data() as IStory;
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
