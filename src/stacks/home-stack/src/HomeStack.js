import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text } from 'react-native';
import Home from '../../../screens/home';
import { AuthContext } from '../../../providers/AuthProvider';
import ContactsScreen from '../../../screens/contacts';

const Stack = createNativeStackNavigator();

export const HomeStack = () => {

  const { logout } = useContext(AuthContext);

  return(
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name="Home"
        options={{
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  logout()
                }}
              >
                <Text>Log out</Text>
              </TouchableOpacity>
            )
          }
        }}
      component={Home}/>
    <Stack.Screen name='Contacts' component={ContactsScreen}/>
    </Stack.Navigator>
  );
}

