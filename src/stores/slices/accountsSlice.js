import { createSlice } from '@reduxjs/toolkit'
import BankingService from '../../services/BankingService';

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

  },
})

// Action creators are generated for each case reducer function
export const { addAccount, getMovements, getDetails } = accountsSlice.actions

export default accountsSlice.reducer;

