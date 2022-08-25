import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { transactionsSlice } from '../features/transactions/transactionsSlice'
import { filtersSlice } from '../features/filters/filtersSlice'

export const store = configureStore({
  reducer: {
    transactions: transactionsSlice.reducer,
    filters: filtersSlice.reducer
  },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
  RootState,
  unknown,
  Action<string>>;
