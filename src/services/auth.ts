import { supabase } from '@/src/configs';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { Session, User } from '@supabase/supabase-js';
import * as AppleAuthentication from 'expo-apple-authentication';

export const getSession = async () => await supabase.auth.getSession();

export const onAuthStateChanged = (callback: (session: Session | null) => void | Promise<void>) => {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(async (_event, session) => {
    await callback(session);
  });

  return subscription;
};

export async function signInWithGoogle() {
  try {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    const userInfo = await GoogleSignin.signIn();
    const idToken = userInfo.data?.idToken;

    if (!idToken) {
      throw new Error('Google idToken not found. Check your webClientId.');
    }

    const { error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: idToken,
      //nonce: decoded.nonce,
    });

    if (error) throw error;

  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      return null;
    }
    throw error;
  }
}

export async function signInWithApple() {
  try {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });

    if (!credential.identityToken) {
      throw new Error('Apple identityToken not found.');
    }

    const { error } = await supabase.auth.signInWithIdToken({
      provider: 'apple',
      token: credential.identityToken,
    });

    if (error) throw error;
  } catch (error: any) {
    // Kullanıcı Apple login ekranını kapatırsa
    if (error.code === 'ERR_REQUEST_CANCELED') {
      return null;
    }

    throw error;
  }
}

export async function signOut() {
  try {
    await supabase.auth.signOut();
    await GoogleSignin.signOut();
    return true;
  } catch (error) {
    throw error;
  }
}

export const createUser = async (user: User) => {
  const { error, data } = await supabase
    .from('users')
    .upsert(
      {
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name || user.user_metadata?.name || null,
        avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
        provider: 'google',
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: 'id',
        ignoreDuplicates: true,
      },
    )
    .select()
    .single();

  if (error) throw error;

  return data;
};
