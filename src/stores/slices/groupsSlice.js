import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import FriendsService from '../../services/FriendsService';


const fetchUserGroups = async (thunk) => {
  try {
    const response = await FriendsService.getUserGroups();
    return response.data;
  } catch(error) {
    console.error(error);
  }
  return
}


export const fetchGroups = createAsyncThunk(
  'groups/fetch',
  fetchUserGroups
)

const createNewGroup = async (data, thunk) => {
  try {
    const response = await FriendsService.postCreateGroup(data);
    return response.data;
  } catch(error) {
    console.error(error);
  }
  return
}


export const createGroup = createAsyncThunk(
  'groups/create',
  createNewGroup
)

const fetchGroupExpenses = async (id, thunk) => {
  try {
    const response = await FriendsService.getGroupExpenses(id);
    return response.data;
  } catch(error) {
    console.error(error);
  }
  return
}


export const getGroupExpenses = createAsyncThunk(
  'groups/expenses',
  fetchGroupExpenses
)

const fetchGroupBalances = async (id, thunk) => {
  try {
    const response = await FriendsService.getGroupBalances(id);
    return response.data;
  } catch(error) {
    console.error(error);
  }
  return
}


export const getGroupBalances = createAsyncThunk(
  'groups/balances',
  fetchGroupBalances
)


export const groupsSlice = createSlice({
  name: 'groups',
  initialState: {
    groups: [],
    expenses: [],
    balances: [],
    isFetchingGroups: false,
    isFetchingExpenses: false,
    isFetchingBalances: false,
    isCreatingNewGroup: false
  },
  reducers:{
    getGroups: (state, action) => {

    }
  },
  extraReducers: (builder) => {
    // fetch groups
    builder.addCase(fetchGroups.pending, (state, action) => {
      state.isFetchingGroups = true;
    });

    builder.addCase(fetchGroups.fulfilled, (state, action) => {
      const fetchedGroups = action.payload.groups;

      state.groups = fetchedGroups;
      state.isFetchingGroups = false;
    });

    // create group
    builder.addCase(createGroup.pending, (state, action) => {
      state.isCreatingNewGroup = true
    });

    builder.addCase(createGroup.fulfilled, (state, action) => {
      state.isCreatingNewGroup = false
    });

    // expenses
    builder.addCase(getGroupExpenses.pending, (state, action) => {
      state.isFetchingExpenses = true
    });

    builder.addCase(getGroupExpenses.fulfilled, (state, action) => {
      state.isFetchingExpenses = false
      state.expenses = action.payload.expenses
    });

    // balances
    builder.addCase(getGroupBalances.pending, (state, action) => {
      state.isFetchingBalances = true
    });

    builder.addCase(getGroupBalances.fulfilled, (state, action) => {
      state.isFetchingBalances = false
      state.balances = action.payload.balances
    });
  }
})

export default groupsSlice.reducer;
