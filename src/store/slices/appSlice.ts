import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface AppState {
    toStoryDetail: string;
}

const initialState: AppState = {
  toStoryDetail: "",
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setToStoryDetail: (state, action: PayloadAction<string>) => {
        state.toStoryDetail = action.payload;
    }
  },
});

export const { setToStoryDetail } = appSlice.actions;
export const appReducer = appSlice.reducer;
