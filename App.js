/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text
} from 'react-native';
import Center from './src/components/center';
import { Routes } from './src/Router';
import Provider from './src/providers';


const App = () => {

  return (
    <Provider/>
  )
};

export default App;
