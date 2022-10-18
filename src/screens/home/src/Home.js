import React from 'react';
import { Text, SafeAreaView, View } from 'react-native';
import ActionButton from '../../../components/action-button';
import { styles } from '../lib/styles';

import { showModal } from '../../../stores/slices/errorsSlice';
import { useDispatch } from 'react-redux';

const Home = ({ navigation }) =>{

  const dispatch = useDispatch();

  const handleShowModal = () => dispatch(showModal({message: 'Hola'}));

  return (
    <View style={styles.container}>
      <View style={styles.actions}>
        <ActionButton action={{ text: 'Contactos' }} onPress={() => {
          navigation.navigate('Contacts')
        }}/>
        <ActionButton action={{ text: 'Crear grupo' }} onPress={handleShowModal}/>
      </View>
    </View>
  )
}

export default Home;
