import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  toStoryDetail: string;
  hasSeenOnboarding: boolean | null;
}

const initialState: AppState = {
  toStoryDetail: '',
  hasSeenOnboarding: null,
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
  },
});

export const { setToStoryDetail, setHasSeenOnboarding } = appSlice.actions;
export const appReducer = appSlice.reducer;
