import { configureStore, useDi } from '@reduxjs/toolkit'
import accountsSlice from './slices/accountsSlice';
import contactsSlice from './slices/contactsSlice';
import errorsSlice from './slices/errorsSlice';


export const store = configureStore({
  reducer: {
    accounts: accountsSlice,
    contacts: contactsSlice,
    errors: errorsSlice
  },
    // do not forget this
  devTools: process.env.NODE_ENV !== 'production',
})
