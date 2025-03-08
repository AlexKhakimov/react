import { configureStore } from '@reduxjs/toolkit';
import { syncApi } from './api/syncApi';

export const store = configureStore({
  reducer: {
    [syncApi.reducerPath]: syncApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(syncApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
