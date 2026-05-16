import { ICategory } from '@/src/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  categories: ICategory[];
}

const initialState: AuthState = {
  categories: [],
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload;
    },
  },
});

export const { setCategories } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
