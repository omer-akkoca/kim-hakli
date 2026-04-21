import { onAuthStateChanged as firebaseOnAuthStateChanged } from 'firebase/auth';
import { auth } from '@/src/configs';

export const onAuthStateChanged = (callback: (user: any) => void) => {
  return firebaseOnAuthStateChanged(auth, callback);
};
