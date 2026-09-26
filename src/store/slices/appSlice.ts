import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  toStoryDetail: string;
  hasSeenOnboarding: boolean | null;
  hasSeenReward: boolean;
  refCode: string | null;
}

const initialState: AppState = {
  toStoryDetail: '',
  hasSeenOnboarding: null,
  hasSeenReward: false,
  refCode: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setToStoryDetail: (state, action: PayloadAction<string>) => {
      state.toStoryDetail = action.payload;
    },
    setHasSeenOnboarding(state, action: PayloadAction<boolean>) {
      state.hasSeenOnboarding = action.payload;
    },
    setHasSeenReward(state, action: PayloadAction<boolean>) {
      state.hasSeenReward = action.payload;
    },
    setRefCode(state, action: PayloadAction<string>) {
      state.refCode = action.payload;
    },
    clearRefCode(state) {
      state.refCode = null;
    },
  },
});

export const {
  setToStoryDetail,
  setHasSeenOnboarding,
  setHasSeenReward,
  setRefCode,
  clearRefCode,
} = appSlice.actions;
export const appReducer = appSlice.reducer;
