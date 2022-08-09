import React from 'react';
import { AuthProvider } from './AuthProvider';
import { Routes } from '../Router';

const Provider = ({}) => {

  return(
      <AuthProvider>
          <Routes/>
      </AuthProvider>
  );
}


export default Provider;
