import React, { useState }from 'react';
import Cache from '../services/CacheService';
import AuthService from '../services/AuthService';
import { LoginCredentials } from '../models/Credential';
import { RefreshCredentials } from '../services/requests/RefreshCredentials';


export const AuthContext = React.createContext({
  user: null,
  login: (credentials) => {},
  logout: () => {},
  doRefresh: (credentials) => {}
});

const AuthProvider = ({children}) => {
  const [user, setUser] = useState();

  const setToken = (access, refresh) => {
    Cache.setItem('access_token', access);
    Cache.setItem('refresh_token', refresh);
  }

  const createContext = async () => {
    try{
      const response = await AuthService.getContext();
      const userContext = response.data.data;
      setUser(userContext);
      return true;
    } catch(error) {
  //    showErrorDialog('Error creating context');
      return false;
    }
  }


  const login = async (credentials) => {
    try {
      const response = await AuthService.userLogin(credentials);
      const data = response.data;
      console.log(data)
      setToken(data.access_token, data.refresh_token);
      await createContext();
      return true;
    } catch(error) {
    //  showErrorDialog('Login incorrecto');
      return false;
    }
  }


  const doRefresh = async () => {
    try {
      const refreshToken = await Cache.getItem('refresh_token');
      if(refreshToken) {
        const response = await AuthService.refreshLogin({refresh_token: refreshToken});
        const data = response.data;

        setToken(data.access_token, data.refresh_token);
        await createContext();
        return response.data;
      }
    } catch(error) {
      return;
    }
  }

  return (
    <AuthContext.Provider value={{
        user,
        login,
        logout: () => {
          Cache.getItem('user');
          setUser(null);
        },
        doRefresh
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export {
  AuthProvider
}
