import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface BookmarkState {
  bookmarks: string[];
  bookmarkLoading: boolean;
}

const initialState: BookmarkState = {
  bookmarks: [],
  bookmarkLoading: false,
};

const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    setBookmarkLoading: (state, action: PayloadAction<boolean>) => {
      state.bookmarkLoading = action.payload;
    },
    setBookmarks: (state, action: PayloadAction<string[]>) => {
      state.bookmarks = action.payload;
    },
    addBookmark: (state, action: PayloadAction<string>) => {
      state.bookmarks = [...state.bookmarks, action.payload];
    },
    removeBookmark: (state, action: PayloadAction<string>) => {
      state.bookmarks = state.bookmarks.filter((e) => e !== action.payload);
    },
    resetBookmark: (state) => {
      state.bookmarks = initialState.bookmarks;
      state.bookmarkLoading = initialState.bookmarkLoading;
    }
  },
});

export const { setBookmarkLoading, setBookmarks, addBookmark, removeBookmark, resetBookmark } =
  bookmarkSlice.actions;

export const bookmarkReducer = bookmarkSlice.reducer;

export const getIsBookmarked = (state: RootState, id: string) =>
  state.bookmark.bookmarks.includes(id);
