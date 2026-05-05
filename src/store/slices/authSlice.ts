import { IUser } from '@/src/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  authLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  authLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.authLoading = action.payload;
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    resetAuth: (state) => {
      state.authLoading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setAuthLoading, setUser, resetAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
