import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { SafeAreaView, TouchableHighlight, ActivityIndicator, FlatList, Text } from 'react-native';
import { List } from 'react-native-paper';
import FriendsService from '../../../services/FriendsService';
import TextInput from '../../../wrappers/text-input';
import { useDispatch } from 'react-redux';
import { showModal } from '../../../stores/slices/errorsSlice';
import { filterContacts } from '../../../stores/slices/contactsSlice';


const ContactsScreen = ({ navigation }) => {

  const contacts = useSelector(state => state.contacts.filteredContacts);

  const [search, setSearch] = useState(null);

  const [isPending, startTransition] = React.useTransition();

  const dispatcher = useDispatch()

  React.useEffect(() => {
    startTransition(() => {
      dispatcher(filterContacts({ search }))
    });
  }, [search]);


  const searchContacts = (val) => {
    setSearch(val);
  }

  const sanitizeNumber = (number) => {
    let onlyNumbers = number.replace('/\D/g', '');
    if(number) {
      onlyNumbers = onlyNumbers.replace(' ', '');
      onlyNumbers = onlyNumbers.replace(' ', '');
      onlyNumbers = onlyNumbers.replace('-', '');
      onlyNumbers = onlyNumbers.replace('(', '');
      onlyNumbers = onlyNumbers.replace(')', '');
      onlyNumbers = onlyNumbers.replace('+', '');
      onlyNumbers = onlyNumbers.replace('tel:');
    }

    return onlyNumbers;
  }

  const onPressContact = async ({item: contact}) => {
    const number = contact.number
    const sanitized = sanitizeNumber(number);

    try {
      const resp = await FriendsService.findFriendByPhone(sanitized);
      const data = resp.data;
      if (data['accounts'].length == 0) {
        dispatcher(showModal({message: 'El usuario seleccionado no tiene una cuenta destino'}))
        return;
      }

      if (data['message'] !== 'not found') {
        navigation.navigate('SendMoneyScreen', {accounts: resp.data['accounts'] } );
      } else {
        dispatcher(showModal({message: 'El usuario seleccionado no tiene una cuenta de disigo'}))
      }

    } catch (e) {
      dispatcher(showModal({message: 'Ups, paso algo inesperado'}))
    }
  }


  const renderContact = ({item}) => {
    return (
      <TouchableHighlight
        onPress={() => onPressContact({item})}
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
          title={item.name + " " + item?.number}
        />
      </TouchableHighlight>
    )
  }


  return (
    <SafeAreaView style={{ paddingTop: 20}}>
      <TextInput placeholder='Busqueda'
        value={search}
        onChangeText={searchContacts}
      />
      <List.Section>
        <List.Subheader>Contacts</List.Subheader>
        { !isPending
          ? <FlatList
              data={contacts}
              renderItem={renderContact}
              estimatedSize={20}
              keyExtractor={item => item.number}
            />
          : <ActivityIndicator/>}
      </List.Section>
    </SafeAreaView>
  );
}

export default ContactsScreen;
