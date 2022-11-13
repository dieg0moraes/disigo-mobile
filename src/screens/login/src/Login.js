import React, { useContext, useState } from 'react';
import { Text } from 'react-native';
import Center from '../../../components/center';
import { AuthContext } from '../../../providers/AuthProvider';
import { styles } from '../lib/styles'
import Button from '../../../wrappers/button';
import InputText from '../../../wrappers/text-input';
import { useDispatch } from 'react-redux';
import { showModal } from '../../../stores/slices/errorsSlice';

const Login = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const dispatcher = useDispatch();


  const handleLogin = async () => {
    try {
      const result = await login({email, password})
      if (!result) {
        dispatcher(showModal({ message: 'Revisa tus credenciales'}));
      }
    } catch(e) {
      dispatcher(showModal({ message: 'Ups!'}));
    }
  }

  return(
    <>
      <Center>
        <Text style={styles.header}>Bienvenidssdao!</Text>
        <InputText
          type="default"
          value={email}
          onChangeText={setEmail}
          placeholder='Email'
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
        <Button
          onPress={() => {
            console.log('daaaaad');
          }}
          text='Olvide mi contrasena'
        />
      </Center>
    </>
  );
}

export default Login;
