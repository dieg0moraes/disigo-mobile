import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../../../screens/login';

import Register from '../../../screens/register';

const Stack = createNativeStackNavigator();

const AuthenticationStack = () => {

  return (
    <Stack.Navigator
      initialRouteName='Login'
      screenOptions={{
        contentStyle: {backgroundColor: '#F7F8FA'}
      }}
    >
      <Stack.Screen options={{ headerShown: false}} name="Login" component={Login}/ >
      <Stack.Screen
        options={{
          headerShown: false,
          headerTitle: 'SignUp'
        }}
        name="Register"
        component={Register}
      / >
    </Stack.Navigator>
  )
}

export default AuthenticationStack;
