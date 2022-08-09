import React from 'react';
import { Text, View } from 'react-native';
import ActionButton from '../../../components/action-button';
import { styles } from '../lib/styles';

const Home = () =>{

  return (
    <View style={styles.container}>
      <View style={styles.image}/>
      <View style={styles.data}>
          <Text>Mi nombre</Text>
      </View>
      <View style={styles.actions}>
        <ActionButton action={{ text: 'Transferir' }}/>
        <ActionButton action={{ text: 'Transferir' }}/>
      </View>
    </View>
  )
}

export default Home;
