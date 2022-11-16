import React from 'react';
import { Text, SafeAreaView, View } from 'react-native';
import ActionButton from '../../../components/action-button';
import { styles } from '../lib/styles';
import CacheService from '../../../services/CacheService';
import { showModal } from '../../../stores/slices/errorsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContactActionAsync } from '../../../stores/slices/contactsSlice';


const Home = ({ navigation }) =>{

  const isFetchingContacts = useSelector(state => state.contacts.isFetchingContacts);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchContactActionAsync())
  }, []);


  const handleShowModal = () =>{
   // CacheService.setSecureItem('accounts', [])
    dispatch(showModal({message: 'Hola'}))
  };

  return (
    <View style={styles.container}>
      <View style={styles.actions}>
        <ActionButton action={{ text: 'Contactos' }} onPress={() => {
          if (isFetchingContacts.status == 'completed') {
            navigation.navigate('Contacts')
          }
        }}/>
        <ActionButton action={{ text: 'Ver mi QR' }} onPress={ () => {
            navigation.navigate('QRCode');
        }
        }/>

        <ActionButton action={{ text: 'Escanear QR' }} onPress={ () => {
            navigation.navigate('ReadQRCode');
        }
        }/>
      </View>
    </View>
  )
}

export default Home;
