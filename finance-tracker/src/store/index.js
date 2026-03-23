import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from './slices/transactionsSlice';

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: { ignoredActions: ['transactions/fetchAll/fulfilled'] } }),
});
