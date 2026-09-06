import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  toStoryDetail: string;
  hasSeenOnboarding: boolean | null;
  hasSeenReward: boolean;
}

const initialState: AppState = {
  toStoryDetail: '',
  hasSeenOnboarding: null,
  hasSeenReward: false,
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
  },
});

export const { setToStoryDetail, setHasSeenOnboarding, setHasSeenReward } = appSlice.actions;
export const appReducer = appSlice.reducer;
