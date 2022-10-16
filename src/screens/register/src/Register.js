import React, { useState} from 'react';
import { Text } from 'react-native';
import Center from '../../../components/center';
import RegisterForm from './RegisterForm';
import InputText from '../../../wrappers/text-input';
import Modal from '../../../components/modal';
import Button from '../../../wrappers/button';


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
        <RegisterForm navigation={navigation} onErrorCallback={onErrorCallback}/>
      </Center>
    </>
  );
}

export default Register;

