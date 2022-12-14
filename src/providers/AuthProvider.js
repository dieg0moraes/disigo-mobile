import React, { useState }from 'react';
import Cache from '../services/CacheService';
import AuthService from '../services/AuthService';


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
      console.error(error.response)
      console.log(error.response)
      return false;
    }
  }


  const doRefresh = async () => {
    try {
      const refreshToken = await Cache.getItem('refresh_token');
      if (refreshToken) {
        const response = await AuthService.refreshLogin({refresh: refreshToken});
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
          Cache.setItem('access_token', null);
          Cache.setItem('refresh_token', null);
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
