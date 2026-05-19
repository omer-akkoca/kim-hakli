import { configureStore } from '@reduxjs/toolkit';
import { authReducer, categoryReducer, bookmarkReducer } from './slices';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    bookmark: bookmarkReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
