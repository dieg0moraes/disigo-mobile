import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { PermissionsAndroid } from 'react-native';
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
/*
    if (Platform.OS == 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
          title: 'Contacts',
          message: 'This app would like to view your contacts.',
          buttonPositive: 'Please accept bare mortal',
      }).then( () => {
        Contacts.getAll()
          .then(c => c)
          .then(c => setContacts(c))
          .catch(e => console.error(e))
      }
      ).catch((error) => {
          console.error('Permission error: ', error);
      });

    } else {
      Contacts.getAll()
        .then(c => c)
        .then(c => setContacts(c))
        .catch(e => console.error(e))
    }
    console.log(contacts)

  }, [])

*/

export const fetchContactActionAsync = createAsyncThunk(
  'contacts/fetch',
  getContacts
)


export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: []
  },
  reducers:{
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

export default contactsSlice.reducer;

