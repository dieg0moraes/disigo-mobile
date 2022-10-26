import React, { useState, useEffect, useContext } from 'react';

import { useDispatch } from 'react-redux';
import { fetchContactActionAsync } from './stores/slices/contactsSlice';
import { ActivityIndicator } from 'react-native';
import Center from '../src/components/center';
import { NavigationContainer } from '@react-navigation/native';
import AuthenticationStack from './stacks/authentication-stack';
import AppTabs from './tabs/app-tabs';
import { AuthContext } from '../src/providers/AuthProvider';
import Modal from './components/modal';
import { useDispatch } from 'react-redux';
import { fetchContactActionAsync } from './stores/slices/contactsSlice';


const Routes = ({}) => {
  const { user, doRefresh } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchContactActionAsync())
  }, []);

<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
  useEffect(() => {
    async function checkLogin() {
      try {
        doRefresh()
        setLoading(false);
      } catch ( error ) {
        // TODO: Remove, added for development
        console.log(error);
        setLoading(false)
      }
    }

    checkLogin();
  }, []);

  if (loading){
    return(
      <Center>
        <ActivityIndicator size='large'/>
      </Center>
    );
  }


  return (
    <NavigationContainer>
      <Modal error='asdsa' visible={true} />
      { user ? <AppTabs/> : <AuthenticationStack/>}
    </NavigationContainer>
  );

}

export {
  Routes
}
