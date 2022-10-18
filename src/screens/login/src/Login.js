import React, { useContext, useState } from 'react';
import { Text } from 'react-native';
import Center from '../../../components/center';
import Modal from '../../../components/modal';
import { AuthContext } from '../../../providers/AuthProvider';
import { styles } from '../lib/styles'
import Button from '../../../wrappers/button';
import InputText from '../../../wrappers/text-input';


const Login = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ error, setError ] = useState('');

  const onErrorCallback = (error) => {
    setModalVisible(true)
    setError('Revisa los datos ingresados')
  }

  const close = (e) => {
    setModalVisible(false);
  }

  const handleLogin = async () => {
    try {
      const result = await login({email, password})
      if (!result) {
        setError('Revisa tus credenciales')
        setModalVisible(true)
      }
    } catch(e) {
      console.log(e)
      setModalVisible(true)
    }
  }

  return(
    <>
      <Center>
        <Modal error={error} visible={modalVisible} closeModal={close} />
        <Text style={styles.header}>Bienvenido!</Text>
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
      </Center>
    </>
  );
}

export default Login;
