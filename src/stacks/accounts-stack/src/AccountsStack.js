import React, { useContext } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AccountsList from '../../../screens/accounts-list';
import AddAccountScreen from '../../../screens/add-bank-account';


const Stack = createNativeStackNavigator();

export const AccountStack = ({}) => {

  return(
    <Stack.Navigator
      initialRouteName='ListProviders'>
      <Stack.Screen
        name='ListProviders'
        component={AccountsList}
        options={ ({ navigation }) => ({
          title:'',
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                    navigation.navigate('AddAccount')
                }}
              >
                <Text>Agregar Cuenta</Text>
              </TouchableOpacity>
            )},
        })}
      />
      <Stack.Screen
        options= {({}) => ({
          title: ''
        })}
        name='AddAccount'
        component={AddAccountScreen}
      />
    </Stack.Navigator>
  );
}

export default AccountStack;
