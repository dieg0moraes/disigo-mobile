import React, { useContext, useState } from 'react';
import { Text } from 'react-native';
import Center from '../../../components/center';
import { AuthContext } from '../../../providers/AuthProvider';
import { styles } from '../lib/styles'
import Button from '../../../wrappers/button';
import InputText from '../../../wrappers/text-input';


const Login = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');


  const handleLogin = () => {
    try {
      login({username, password})
    } catch(e) {
      console.log(e)
    }
  }

  return(
    <>
      <Center>
            <Text style={styles.header}>Bienvenido!</Text>
            <InputText
              type="default"
              value={username}
              onChangeText={setUsername}
              placeholder='Username'
              placeholderTextColor='#93A2B8'
              autoCapitalize='none'
              style={{width: 200}}
            />
            <InputText
              style={{width: 200}}
              value={password}
              onChangeText={setPassword}
              placeholder='Password'
              password
              autoCapitalize='none'
              secureTextEntry
              placeholderTextColor='#93A2B8'
              viewPass
            />
            <Button
              text='Login'
              onPress={handleLogin}
            />
            <Button
              onPress={() => {
                navigation.navigate('Register');
              }}
              text='Register'
            />
      </Center>
    </>
  );
}

export default Login;
