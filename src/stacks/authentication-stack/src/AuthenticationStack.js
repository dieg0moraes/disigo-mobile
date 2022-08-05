import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../../../screens/login';

import Register from '../../../screens/register';

const Stack = createNativeStackNavigator();

const AuthenticationStack = () => {

  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name="Login" component={Login}/ >
      <Stack.Screen
        options={{
          headerTitle: 'SignUp'
        }}
        name="Register"
        component={Register}
      / >
    </Stack.Navigator>
  )
}

export default AuthenticationStack;
