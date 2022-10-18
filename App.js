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

import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: "https://bb5d42b9f3aa45f788d02a23b367fbd5@o4503996327723008.ingest.sentry.io/4503996330737664",
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
});

const App = () => {

  return (
    <Provider/>
  )
};

export default App;
