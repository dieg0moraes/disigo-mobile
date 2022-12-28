import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import { styles } from '../lib/styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContactActionAsync } from '../../../stores/slices/contactsSlice';

import Icon from 'react-native-vector-icons/MaterialIcons';

const Home = ({ navigation }) =>{

  const isFetchingContacts = useSelector(state => state.contacts.isFetchingContacts);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchContactActionAsync())
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.actions}>
        <TouchableOpacity
            onPress={() => {
              if (isFetchingContacts.status == 'completed') {
                navigation.navigate('Contacts')
              }
            }}>
            <Icon name="contacts" size={50}/>
        </TouchableOpacity>
          <TouchableOpacity
          onPress={() => {
              navigation.navigate('QRCode');
          }}>
          <Icon name="qr-code" size={50}/>
          </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
              navigation.navigate('ReadQRCode');
          }}>
          <Icon name="qr-code-scanner" size={50}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Home;
