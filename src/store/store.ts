import { configureStore } from '@reduxjs/toolkit';
import { authReducer, bookmarkReducer, appReducer } from './slices';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bookmark: bookmarkReducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
