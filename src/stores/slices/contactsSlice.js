import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Contacts from 'react-native-contacts';


const getContacts = async (thunk) => {
  const contacts = await Contacts.getAll();

  const list = contacts.map(c => {
    return {
        name: c.familyName,
        number: c.phoneNumbers[0]?.number
    }
  });
  return list;

};


const fetchContactActionAsync = createAsyncThunk(
  'contacts/fetch',
  getContacts
)


export const contactsSlice = createSlice({
  name: 'contact',
  initialState: {
    contacts: []
  },
  reducers:{
    fetchItems (state) {
      if(state.contacts.length == 0) {
        Contacts.getAll()
          .then(c => {
            state.contacts = c
          })
          .catch(c => console.log(c))
      }
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchContactActionAsync.fulfilled, (state, action) => {
      // Add user to the state array
      state.contacts = action.payload
    })
  },

})

// Action creators are generated for each case reducer function
export const { fetchItems } = contactsSlice.actions

export default contactsSlice.reducer;

