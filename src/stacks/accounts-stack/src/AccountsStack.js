import React, { useContext } from 'react';
//import { BankingContext } from '../../providers/BankingSessionProvider';
import { Button, TouchableOpacity, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AccountsList from '../../../screens/accounts-list';
//import AddAccountScreen from '../banking/AddAccountScreen';


const Stack = createNativeStackNavigator();
/*
      <Stack.Screen
        name='ListProviders'
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
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={ () => logout() }
              >
                { provider ? <Text>Logout: {provider}</Text> : <Text></Text>}
              </TouchableOpacity>
            )
          }
        })}
        component={ListProviderScreen} />
      <Stack.Screen name='AccountMovementsList' component={ AccountMovementListScreen } />
      <Stack.Screen name='AddAccount' component={ AddAccountScreen } />
*/

export const AccountStack = ({}) => {
  //const { provider, logout } = useContext(BankingContext);
  return(
    <Stack.Navigator initialRouteName='ListProviders'>
      <Stack.Screen
        name='ListProviders'
        component={AccountsList} />
    {/*<Stack.Screen name='AddAccount' component={ AddAccountScreen } />*/}
    </Stack.Navigator>
  );
}

export default AccountStack;
