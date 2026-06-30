import { supabase } from '@/src/configs';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { AuthChangeEvent, Session, User } from '@supabase/supabase-js';
import * as AppleAuthentication from 'expo-apple-authentication';

export const getSession = async () => await supabase.auth.getSession();

export const onAuthStateChanged = (
  callback: (event: AuthChangeEvent, session: Session | null) => void | Promise<void>,
) => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => callback(event, session));

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
      throw new Error('Google girişi için hesap seçilmedi, lütfen bir hesap seçiniz.');
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
      throw new Error('Apple girişi için hesap seçilmedi, lütfen bir hesap seçiniz.');
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
  const provider =
    user.app_metadata?.provider ??
    user.app_metadata?.providers?.[0] ??
    null;

  const { error, data } = await supabase
    .from('users')
    .upsert(
      {
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name || user.user_metadata?.name || null,
        avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
        provider,
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
