import {
  onAuthStateChanged as firebaseOnAuthStateChanged,
  GoogleAuthProvider,
  signInWithCredential,
  signOut,
} from 'firebase/auth';
import { auth } from '@/src/configs';
//import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { createUser, getUserRefIfNotExist } from './firestore';

export const onAuthStateChanged = (callback: (user: any) => void) => {
  return firebaseOnAuthStateChanged(auth, callback);
};

export const signInWithGoogle = async () => {
  /*try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const idToken = userInfo.data?.idToken;
    if (!idToken) throw new Error('Google Sign-In failed: No ID token');

    const googleCredential = GoogleAuthProvider.credential(idToken);
    const result = await signInWithCredential(auth, googleCredential);
    const user = result.user;

    const userRef = await getUserRefIfNotExist(user);
    if (userRef) {
      createUser(userRef, user);
    }
  } catch (error) {
    throw error;
  }*/
};

export const logout = async () => {
  await signOut(auth);
};
