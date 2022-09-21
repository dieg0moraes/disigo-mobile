import React from 'react';
import { Provider } from 'react-redux'
import { AuthProvider } from './AuthProvider';
import { Routes } from '../Router';
import { store } from '../stores';

const ContextProvider = ({}) => {

  return(
    <Provider store={store}>
      <AuthProvider>
          <Routes/>
      </AuthProvider>
    </Provider>
  );
}


export default ContextProvider;
