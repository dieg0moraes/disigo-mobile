import React from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../../../stores/slices/contactsSlice';
import Contacts from 'react-native-contacts';
import { List } from 'react-native-paper';
import Center from '../../../components/center';


const ContactsScreen = () => {


  // const contacts = useSelector(state => state.contacts?.contacts)
  // const dispatch = useDispatch();
  const [contacts, setContacts] = React.useState([]);

  React.useEffect(() => {
    Contacts.getAll()
      .then(c => c)
      .then(c => setContacts(c))
      .catch(e => console.log(e))

  }, [contacts])

  const renderContact = (c) => {

    return (
      <Pressable style={{backgroundColor: 'rgb(210, 230, 255)'}}>
        <List.Item
          title={c.familyName + " " + c.phoneNumbers[0].number}
          style={{borderColor: 'grey', borderWidth: 0.2}}
        />
      </Pressable>
    )
  }


  return (

      <List.Section>
        <List.Subheader>Contacts</List.Subheader>
        { contacts &&
          contacts.map(c => renderContact(c))
        }
      </List.Section>
  );
}

export default ContactsScreen;
