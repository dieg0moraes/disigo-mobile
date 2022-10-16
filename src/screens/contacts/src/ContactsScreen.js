import React from 'react';
import { View, Text, TouchableHighlight, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../../../stores/slices/contactsSlice';
import Contacts from 'react-native-contacts';
import { List } from 'react-native-paper';
import Center from '../../../components/center';
import FriendsService from '../../../services/FriendsService';


const ContactsScreen = ({ navigation }) => {

  const [contacts, setContacts] = React.useState([]);

  React.useEffect(() => {
    Contacts.getAll()
      .then(c => c)
      .then(c => setContacts(c))
      .catch(e => console.log(e))

  }, [contacts])

  const sanitizeNumer = (number) => {
    let onlyNumbers = number.replace('/\D/g', '');
    onlyNumbers = onlyNumbers.replace(' ', '');
    onlyNumbers = onlyNumbers.replace('-', '');
    onlyNumbers = onlyNumbers.replace('(', '');
    onlyNumbers = onlyNumbers.replace(')', '');
    return onlyNumbers;
  }

  const onPressContact = async (contact) => {
    const number = contact.phoneNumbers[0].number
    const sanitized = sanitizeNumer(number);

    try {
      const resp = await FriendsService.findFriendByPhone(sanitized);
      const data = resp.data;
      if (data['message'] !== 'not found')
        navigation.navigate('SendMoneyScreen', {accounts: resp.data['accounts'] } );

    } catch (e) {
      console.log(e)
    }

  }


  const renderContact = (c) => {

    return (
      <TouchableHighlight
        onPress={() => onPressContact(c)}
        style={{backgroundColor: 'rgb(210, 230, 255)'}}
      >
        <List.Item
          title={c.familyName + " " + c.phoneNumbers[0].number}
          style={{borderColor: 'grey', borderWidth: 0.2}}
        />
      </TouchableHighlight>
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
