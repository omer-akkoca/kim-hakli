import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices';
import { categoryReducer } from './slices/categorySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
