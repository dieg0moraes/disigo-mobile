import React, { useContext, useState } from 'react';
import { View, Text, TextInput,Button } from 'react-native';
import Center from '../../../components/center';
import { AuthContext } from '../../../providers/AuthProvider';
import { styles } from '../lib/styles'


const Login = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  return(
    <Center>
          <Text style={styles.header}>Login</Text>
          <TextInput
            type="default"
            value={username}
            onChangeText={setUsername}
            placeholder='Username'
            style={{width: 250}}
            autoCapitalize='none'
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder='Password'
            style={{width: 250}}
            password
            autoCapitalize='none'
            secureTextEntry
            viewPass
          />
          <Button
            style={styles.button}
            title="Login"
            onPress={() => {
              login({username, password})
            }}
          />
          <Button
            onPress={() => {
              navigation.navigate('Register');
            }}
            title="Register"
          />
    </Center>
  );
}

export default Login;
