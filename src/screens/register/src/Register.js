import React, { useState} from 'react';
import { Text, Button } from 'react-native';
import Center from '../../../components/center';
import RegisterForm from './RegisterForm';
import InputText from '../../../wrappers/text-input';
import Modal from '../../../components/modal';


const Register = ({ navigation, route }) => {
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ error, setError ] = useState('');

  const close = (e) => {
    setModalVisible(false);
  }

  const onErrorCallback = (error) => {
    setModalVisible(true)
    setError(JSON.stringify(error.response.data))
  }

  return(
    <>
      <Modal error={error} visible={modalVisible} closeModal={close} />
      <Center>
        <Text>Register screen</Text>
        <RegisterForm onErrorCallback={onErrorCallback}/>
        <Button title="Go to back" onPress={() => {
            navigation.navigate('Login');
          }} />
      </Center>
    </>
  );
}

export default Register;

