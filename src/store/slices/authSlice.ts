import { IUser } from '@/src/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Session } from '@supabase/supabase-js';

interface AuthState {
  session: Session | null;
  user: IUser | null;
  profile_photo: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  session: null,
  user: null,
  profile_photo: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSession: (state, action: PayloadAction<Session | null>) => {
      state.session = action.payload;
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setProfilePhoto: (state, action: PayloadAction<string>) => {
      state.profile_photo = action.payload;
    },
    setReferralSource: (state, action: PayloadAction<string>) => {
      if (state.user) {
        const newUser = { ...state.user, referral_source: action.payload };
        state.user = newUser;
      }
    },
    decreaseCredit: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.user.credit_count = state.user!.credit_count - action.payload;
      }
    },
    increaseCredit: (state, action: PayloadAction<number>) => {
      state.user!.credit_count = state.user!.credit_count + action.payload;
    },
    resetAuth: (state) => {
      state.session = null;
      state.user = null;
      state.profile_photo = null;
      state.loading = false;
    },
  },
});

export const {
  setAuthLoading,
  setSession,
  setUser,
  resetAuth,
  decreaseCredit,
  setProfilePhoto,
  setReferralSource,
  increaseCredit,
} = authSlice.actions;
export const authReducer = authSlice.reducer;
