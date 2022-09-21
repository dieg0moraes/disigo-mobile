import { configureStore } from '@reduxjs/toolkit'
import accountsSlice from './slices/accountsSlice';

export const store = configureStore({
  reducer: { accounts: accountsSlice },
})
