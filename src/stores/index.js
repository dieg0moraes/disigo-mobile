import { configureStore, useDi } from '@reduxjs/toolkit'
import accountsSlice from './slices/accountsSlice';
import contactsSlice from './slices/contactsSlice';


export const store = configureStore({
  reducer: {
    accounts: accountsSlice,
    contacts: contactsSlice
  },
    // do not forget this
  devTools: process.env.NODE_ENV !== 'production',
})
