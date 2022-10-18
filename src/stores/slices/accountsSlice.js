import { createSlice } from '@reduxjs/toolkit'
import BankingService from '../../services/BankingService';
import CacheService from '../../services/CacheService';

const initialState = {
  session: false,
}

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    loginProvider: (state, action) => {
      try {
        const data = {
          'provider': action.provider,
          'username': action.username,
          'password': action.password
        }

        const response =  BankingService.postLoginBank(data);
        state.session = true
      } catch (e) {
        console.log(e)
      }
    },

    deleteAccount:(state, action) => {
      try {
        const data = {
          'provider': action.payload.provider,
          'number': action.payload.number,
        }
        console.log(data)

        BankingService.deleteAccount(data);

        const getSecureItem = async () => {
          return await CacheService.getSecureItem('accounts');
        }

        const accounts = getSecureItem();

        accounts.filter(acc => acc.number != data.number && acc.provider != data.provider)
        CacheService.setSecureItem('accounts', accounts);


      } catch (e) {
        console.log(e)
        console.log('ERROR account deleted')
      }

    }
  },
})

// Action creators are generated for each case reducer function
export const { deleteAccount } = accountsSlice.actions

export default accountsSlice.reducer;

