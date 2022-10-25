import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text } from 'react-native';
import Home from '../../../screens/home';
import { AuthContext } from '../../../providers/AuthProvider';
import ContactsScreen from '../../../screens/contacts';
import SendMoneyScreen from '../../../screens/send-money';

const Stack = createNativeStackNavigator();

export const HomeStack = () => {

  const { logout } = useContext(AuthContext);

  return(
    <Stack.Navigator
      initialRouteName='Home'
    >

      <Stack.Screen name="Home"
        options={{
          headerShown:true,
          title:'',
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  logout()
                }}
              >
                <Text>LOGOUT</Text>
              </TouchableOpacity>
            )
          }
        }}
      component={Home}/>
      <Stack.Screen
        name='Contacts'
        component={ContactsScreen}
        options={{ headerShown: true, title: 'Contactos' }}
      />
      <Stack.Screen
        options={{ headerShown: true, title: '' }}
        name='SendMoneyScreen' component={SendMoneyScreen}/>
    </Stack.Navigator>
  );
}

