import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text } from 'react-native';
import Home from '../../../screens/home';
import { AuthContext } from '../../../providers/AuthProvider';

const Stack = createNativeStackNavigator();

export const HomeStack = () => {

  const { logout } = useContext(AuthContext);

  return(
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name="HomeScreen"
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
    </Stack.Navigator>
  );
}

