import React from 'react';
import { Text, View } from 'react-native';
import ActionButton from '../../../components/action-button';
import { styles } from '../lib/styles';

const Home = ({ navigation }) =>{

  return (
    <View style={styles.container}>
      <View style={styles.actions}>
        <ActionButton action={{ text: 'Contactos' }} onPress={() => {
          navigation.navigate('Contacts')
        }}/>
        <ActionButton action={{ text: 'Crear grupo' }}/>
      </View>
    </View>
  )
}

export default Home;
