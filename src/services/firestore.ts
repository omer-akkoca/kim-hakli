import { User } from 'firebase/auth';
import { db } from '../configs';
import {
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import { IUser, providerType } from '../types';

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
