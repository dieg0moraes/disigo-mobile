import React, { useContext } from 'react';
//import { BankingContext } from '../../providers/BankingSessionProvider';
import { Button, TouchableOpacity, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AccountsList from '../../../screens/accounts-list';
import AddAccountScreen from '../../../screens/add-bank-account';
//import AddAccountScreen from '../banking/AddAccountScreen';


const Stack = createNativeStackNavigator();
/*
      <Stack.Screen
        name='ListProviders'
        component={ListProviderScreen} />
      <Stack.Screen name='AccountMovementsList' component={ AccountMovementListScreen } />
      <Stack.Screen name='AddAccount' component={ AddAccountScreen } />
*/

export const AccountStack = ({}) => {
  //const { provider, logout } = useContext(BankingContext);
  return(
    <Stack.Navigator
      initialRouteName='ListProviders'>
      <Stack.Screen
        name='ListProviders'
        component={AddAccountScreen}
        options={ ({navigation}) => ({
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                    navigation.navigate('AddAccount')
                }}
              >
                <Text>add</Text>
              </TouchableOpacity>
            )},
        })}
      />
    </Stack.Navigator>
  );
}

export default AccountStack;
