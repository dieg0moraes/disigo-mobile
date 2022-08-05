import React, { useState, useEffect, useContext } from 'react';
//import { ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthenticationStack from './stacks/authentication-stack';
import AppTabs from './tabs/app-tabs';

const Routes = ({}) => {
  //const { user, login, doRefresh } = useContext(AuthContext);
  const user = {};
  /*
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkLogin() {
      try {
        const refresh_token = await CacheServer.getItem('refresh_token');
        setLoading(false);
        if( refresh_token != null){
            const credentials: RefreshCredentials = {
                refresh: refresh_token
            };
            doRefresh(credentials);
        }

        setLoading(false);
      } catch ( error ) {
            console.log('refresh_token error');
            console.log(error);
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
  */


  return (
    <NavigationContainer>
      { user ? <AppTabs/> : <AuthenticationStack/>}
    </NavigationContainer>
  );

}

export {
  Routes
}
