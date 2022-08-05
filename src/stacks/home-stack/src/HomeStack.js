import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { TouchableOpacity } from 'react-native-gesture-handler';
//import { HomeParamList } from '../models/HomeParamList';
import Home from '../../../screens/home';
//import { AuthContext } from '../../providers/AuthProvider';

const Stack = createNativeStackNavigator();
/*
        options={{
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  logout();
                }}
              >
                <Text>Log out</Text>
              </TouchableOpacity>
            )
          }
        }}
        */

export const HomeStack = () => {

  return(
    <Stack.Navigator
        initialRouteName='Home'
        options={{ headerShown: false }}
    >
      <Stack.Screen name="HomeScreen" component={Home}/>
    </Stack.Navigator>
  );
}

