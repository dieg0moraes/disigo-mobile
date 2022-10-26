import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { SafeAreaView, TouchableHighlight } from 'react-native';
import Contacts from 'react-native-contacts';
import { List } from 'react-native-paper';
import FriendsService from '../../../services/FriendsService';
import Modal from '../../../components/modal';
import TextInput from '../../../wrappers/text-input';
import { useDispatch } from 'react-redux';
import { showModal } from '../../../stores/slices/errorsSlice';
import { fetchContactActionAsync } from '../../../stores/slices/contactsSlice';


const ContactsScreen = ({ navigation }) => {

  const contacts = useSelector(state => state.contacts.contacts);

  const dispatcher = useDispatch();

  React.useEffect(
    () => {
      dispatcher(fetchContactActionAsync());
    }

  ,[]);

  const sanitizeNumer = (number) => {
    let onlyNumbers = number.replace('/\D/g', '');
    onlyNumbers = onlyNumbers.replace(' ', '');
    onlyNumbers = onlyNumbers.replace('-', '');
    onlyNumbers = onlyNumbers.replace('(', '');
    onlyNumbers = onlyNumbers.replace(')', '');
    return onlyNumbers;
  }

  const onPressContact = async (contact) => {
    const number = contact.number
    const sanitized = sanitizeNumer(number);

    try {
      const resp = await FriendsService.findFriendByPhone(sanitized);
      const data = resp.data;

      if (data['message'] !== 'not found') {
        navigation.navigate('SendMoneyScreen', {accounts: resp.data['accounts'] } );
      } else {
        dispatcher(showModal({message: 'El usuario seleccionado no tiene una cuenta de disigo'}))
      }

    } catch (e) {
      dispatcher(showModal({message: 'Ups, paso algo inesperado'}))
    }
  }


  const renderContact = (c, k) => {
    return (
      <TouchableHighlight
        onPress={() => onPressContact(c)}
        activeOpacity={0.8}
        underlayColor='grey'
        style={{
          backgroundColor: 'white',
          borderRadius: 50,
          marginBottom: 2,
          marginHorizontal: 5
        }}
      >
        <List.Item
          key={k}
          title={c.name + " " + c.number}
        />
      </TouchableHighlight>
    )
  }


  return (
    <SafeAreaView style={{ paddingTop: 20}}>
      <TextInput placeholder='Busqueda'/>
      <List.Section>
        <List.Subheader>Contacts</List.Subheader>
        { contacts &&
          contacts.map((c, k) => renderContact(c, k))
        }
      </List.Section>
    </SafeAreaView>
  );
}

export default ContactsScreen;
