import React from 'react';
import { Text, Button } from 'react-native';
import Center from '../../../components/center';
import RegisterForm from './RegisterForm';


const Register = ({ navigation, route }) => {

  return(
    <Center>
      <Text>Register screen</Text>
      <RegisterForm/>
      <Button title="Go to back" onPress={() => {
          navigation.navigate('Login');
        }} />
    </Center>
  );
}

export default Register;

