import { IUser } from '@/src/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Session } from '@supabase/supabase-js';

interface AuthState {
  session: Session | null;
  user: IUser | null;
  loading: boolean;
}

const initialState: AuthState = {
  session: null,
  user: null,
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
    resetAuth: (state) => {
      state.session = null;
      state.user = null;
      state.loading = false;
    },
  },
});

export const { setAuthLoading, setSession, setUser, resetAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
