import { db } from '@/src/configs';
import { doc, getDoc } from 'firebase/firestore';

export const hasVoted = async (userId: string, storyId: string): Promise<boolean> => {
  const unlockedRef = doc(db, 'users', userId, 'unlockedStories', storyId);
  const unlockedSnap = await getDoc(unlockedRef);
  if (!unlockedSnap.exists()) return false;
  return !!unlockedSnap.data()?.votedSide;
};
