import { User } from 'firebase/auth';
import { db } from '../configs';
import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import { IUser, providerType } from '../types';
import { IStory } from '../types/story';

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

export const getStories = async (): Promise<IStory[] | null> => {
  try {
    const storiesRef = collection(db, 'stories');
    const q = query(storiesRef, orderBy('createdAt'));
    const snapshot = await getDocs(q);
    const stories = snapshot.docs.map((doc) => doc.data() as IStory);
    return stories;
  } catch {
    return null;
  }
};

export const getStoryById = async (id: string): Promise<IStory | null> => {
  const storyRef = doc(db, 'stories', id);
  const storySnap = await getDoc(storyRef);
  if (storySnap.exists()) {
    return storySnap.data() as IStory;
  }

  return null;
};
