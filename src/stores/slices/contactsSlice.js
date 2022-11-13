import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';


const sanitizeNumer = (number) => {
  if (!number) {
    return number;
  }
  let onlyNumbers = number.replace('/\D/g', '');
  onlyNumbers = onlyNumbers.replace(' ', '');
  onlyNumbers = onlyNumbers.replace('-', '');
  onlyNumbers = onlyNumbers.replace('(', '');
  onlyNumbers = onlyNumbers.replace(')', '');
  onlyNumbers = onlyNumbers.replace('tel:');

  return onlyNumbers;
}

const mapAndroidContacts = (contacts) => {
  const list = contacts.map(c => {
    return {
        name: c.displayName,
        number: sanitizeNumer(c.phoneNumbers[0]?.number)
    }
  });
  return list;

}

const mapIosContacts = (contacts) => {
  const list = contacts.map(c => {
    if(c.phoneNumbers[0] != undefined) {
      return {
          name: c.familyName,
          number: sanitizeNumer(c.phoneNumbers[0]?.number)
      }
    }
  });

  return list.filter(a => a != undefined);
}

const condition = item => item.number;

function uniqBy(a, key) {
    var seen = {};
    return a.filter(function(item) {
        var k = key(item);
        if(k)
          return seen.hasOwnProperty(k) ? false : (seen[k] = true);
        return false
    })
}


const getContacts = async (thunk) => {

  let contacts = [];

  if (Platform.OS == 'android') {
    const res = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Please accept bare mortal',
    });

    if(res) {
      const allContacts = await Contacts.getAll();
      contacts = mapAndroidContacts(allContacts);
    }

  } else {
    const res = await Contacts.getAll()
    contacts = mapIosContacts(res);
  }

  return uniqBy(contacts, condition);

};

export const fetchContactActionAsync = createAsyncThunk(
  'contacts/fetch',
  getContacts
)


export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    filteredContacts: [],
    isFetchingContacts: {
      'status': 'started',
      'error': false,
    }
  },
  reducers:{
    filterContacts: (state, action) => {
      const search = action.payload.search;

      if(search) {
        state.filteredContacts = state.contacts.filter( c => c.name.includes(search) || `${c.number}`.includes(search))
      } else {
        state.filteredContacts = state.contacts
      }
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchContactActionAsync.fulfilled, (state, action) => {
      // Add user to the state array
      state.contacts = action.payload
      state.filteredContacts = action.payload
      state.isFetchingContacts = {
        'status': 'completed',
        'error': false,
      }
    }),

    builder.addCase(fetchContactActionAsync.rejected, (state, action) => {
      state.isFetchingContacts = {
        'status': 'completed',
        'error': true,
      }
      console.log(action)
    })
  },

})

// Action creators are generated for each case reducer function
export const { filterContacts } = contactsSlice.actions;

export default contactsSlice.reducer;

