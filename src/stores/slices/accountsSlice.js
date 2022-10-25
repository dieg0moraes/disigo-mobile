import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import BankingService from '../../services/BankingService';
import CacheService from '../../services/CacheService';


const getRegisteredAccounts = async (thunk) => {
  try {
    const response = await BankingService.getUserAccounts();
    return response.data;
  } catch (e) {
    console.error(e);
    console.error('error getting registered accounts');
  }
}

export const fetchUserAccounts = createAsyncThunk(
  'accounts/fetchsRegisteredAccounts',
  getRegisteredAccounts
)


const addAccount = async (data, thunk) => {
    try {
      await BankingService.addAccount(data);
    } catch(error) {
      console.error(error);
    }
}


export const postAddAccountAsync = createAsyncThunk(
  'accounts/postAddAccount',
  addAccount
)

const deleteAccountAsync = async (action, thunk) => {
  try {

    const data = {
      'provider': action.provider,
      'number': action.number,
    }

    await BankingService.deleteAccount(data);

    const accounts = await CacheService.getSecureItem('accounts');

    accounts.filter(acc => acc.number != data.number && acc.provider != data.provider)
    CacheService.setSecureItem('accounts', accounts);

  } catch (e) {
    console.error(e);
    console.error('ERROR account deleted');
  }

}

export const deleteAccount = createAsyncThunk('accounts/deleteAccount', deleteAccountAsync)

const initialState = {
  session: false,
  addAccountLoading: false,
  userAccounts: []
}


export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(postAddAccountAsync.pending, (state, action) => {
      state.addAccountLoading = true;
    })

    builder.addCase(postAddAccountAsync.fulfilled, (state, action) => {
      state.addAccountLoading = false;
    })

    builder.addCase(fetchUserAccounts.fulfilled, (state, action) => {
      const fetchedAccounts = action.payload.accounts;

      const accounts = fetchedAccounts.map(
        (acc) => {
          return {
            label: `${acc.name} - ${acc.number}`,
            value: `${acc.internalId}`
          }
        }
      );
      state.userAccounts = accounts;
    })

  }
})

// Action creators are generated for each case reducer function


export default accountsSlice.reducer;

