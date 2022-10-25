import React, { useState } from 'react';
import { SafeAreaView, TouchableHighlight } from 'react-native';
import Contacts from 'react-native-contacts';
import { List } from 'react-native-paper';
import FriendsService from '../../../services/FriendsService';
import Modal from '../../../components/modal';
import TextInput from '../../../wrappers/text-input';
import { PermissionsAndroid } from 'react-native';
import { useDispatch } from 'react-redux';
import { showModal } from '../../../stores/slices/errorsSlice';



const ContactsScreen = ({ navigation }) => {

  const [ modalVisible, setModalVisible ] = useState(false);
  const [ error, setError ] = useState('');
  const [contacts, setContacts] = React.useState([]);
  const dispatcher = useDispatch();


  React.useEffect(() => {

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
      console.log(data)
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
          title={c.familyName + " " + c.phoneNumbers[0].number}
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
